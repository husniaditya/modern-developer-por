// Vercel serverless API route for WakaTime summaries (Option B)
// Keep WAKATIME_API secret on the server; client calls this endpoint.

function toHuman(seconds) {
  const s = Math.floor(Number(seconds || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

// aggregateEntities was used for summaries; replaced by all-time stats. Keeping a similar
// helper for stats lists (normalizeStatsEntities) below.

async function fetchSummaries(rangeParam, apiKey) {
  const url = new URL('https://wakatime.com/api/v1/users/current/summaries');
  if (rangeParam) url.searchParams.set('range', rangeParam);
  else url.searchParams.set('range', 'last_7_days');

  const auth = Buffer.from(`${apiKey}:`).toString('base64');
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Upstream ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function fetchStatsAllTime(apiKey) {
  const url = new URL('https://wakatime.com/api/v1/users/current/stats/all_time');
  const auth = Buffer.from(`${apiKey}:`).toString('base64');
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Upstream ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

// Poll all_time stats briefly because for free plans WakaTime calculates
// ranges >= 1 year on first request in the background. During that time
// totals and arrays can be empty even though data exists.
async function fetchStatsAllTimeWithRetry(apiKey, { tries = 3, delayMs = 1500 } = {}) {
  let out = await fetchStatsAllTime(apiKey);
  for (let i = 1; i < tries; i++) {
    const d = out?.data || {};
    if (d.is_up_to_date || (typeof d.percent_calculated === 'number' && d.percent_calculated >= 100)) {
      break;
    }
    await new Promise((r) => setTimeout(r, delayMs));
    out = await fetchStatsAllTime(apiKey);
  }
  return out;
}

async function fetchAllTimeSinceToday(apiKey) {
  const url = new URL('https://wakatime.com/api/v1/users/current/all_time_since_today');
  const auth = Buffer.from(`${apiKey}:`).toString('base64');
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Upstream ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function fetchStatsRange(range, apiKey) {
  const url = new URL(`https://wakatime.com/api/v1/users/current/stats/${range}`);
  const auth = Buffer.from(`${apiKey}:`).toString('base64');
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Upstream ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

function normalizeStatsEntities(list) {
  const entries = (list || []).map((it) => ({ name: it.name, total_seconds: it.total_seconds || 0 }));
  const grand = entries.reduce((a, e) => a + e.total_seconds, 0) || 0;
  return entries
    .map((e) => ({ ...e, percent: grand ? (e.total_seconds * 100) / grand : 0, digital: toHuman(e.total_seconds) }))
    .sort((a, b) => b.total_seconds - a.total_seconds);
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const API_KEY = process.env.WAKATIME_API;
  if (!API_KEY) {
    res.status(500).json({ error: 'Missing WAKATIME_API env' });
    return;
  }

  // We currently always return all-time aggregates + last_7_days weekdays
  try {
    // Fetch all-time stats for aggregates (retry a couple times so cache can warm)
    const stats = await fetchStatsAllTimeWithRetry(API_KEY, { tries: 3, delayMs: 1200 });
    const sdata = stats?.data || {};
    // Fallback to all_time_since_today for total when all_time not ready yet
    let allTimeFallback = null;
    if (!sdata?.total_seconds && !sdata?.human_readable_total) {
      try {
        const all = await fetchAllTimeSinceToday(API_KEY);
        allTimeFallback = all?.data || null;
      } catch {
        // ignore fallback errors; we still return the weekly data
      }
    }
    // Fetch last 7 days for weekly bars
    const json = await fetchSummaries('last_7_days', API_KEY);
    const days = json?.data || [];
    const weekdayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const weekdays = days.map((d) => {
      const dateStr = d?.range?.date || d?.range?.start || d?.range?.end;
      const date = dateStr ? new Date(dateStr) : null;
      const w = date ? weekdayNames[date.getUTCDay()] : undefined;
      return {
        date: dateStr,
        weekday: w,
        total_seconds: d?.grand_total?.total_seconds || 0,
      };
    });
    // Fallback aggregates from a shorter range if all_time arrays are empty
    let fallbackAgg = null;
    if (!Array.isArray(sdata?.languages) || sdata.languages.length === 0) {
      try {
        const shortStats = await fetchStatsRange('last_30_days', API_KEY).catch(() => null) ||
                            await fetchStatsRange('last_7_days', API_KEY).catch(() => null);
        fallbackAgg = shortStats?.data || null;
      } catch {
        // ignore; we'll just keep arrays empty
      }
    }

    const out = {
      human_readable_total:
        sdata?.human_readable_total || sdata?.human_readable_total_including_other_language || allTimeFallback?.digital || toHuman(sdata?.total_seconds || 0),
      total_seconds:
        sdata?.total_seconds || sdata?.total_seconds_including_other_language || allTimeFallback?.total_seconds || 0,
      languages: normalizeStatsEntities((sdata?.languages && sdata.languages.length ? sdata.languages : fallbackAgg?.languages) || []),
      editors: normalizeStatsEntities((sdata?.editors && sdata.editors.length ? sdata.editors : fallbackAgg?.editors) || []),
      projects: normalizeStatsEntities((sdata?.projects && sdata.projects.length ? sdata.projects : fallbackAgg?.projects) || []),
      weekdays,
      period: 'all_time',
      range: { start: days[0]?.range?.start, end: days[days.length - 1]?.range?.end },
      cachedAt: new Date().toISOString(),
    };
    res.status(200).json(out);
  } catch (err) {
    res.status(502).json({ error: 'Bad Gateway', message: String(err?.message || err) });
  }
}
