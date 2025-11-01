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

  // Per WakaTime docs, Basic auth should be base64(apiKey) without trailing colon
  const auth = Buffer.from(`${apiKey}`).toString('base64');
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

// Generic stats fetcher for ranges like 'all_time', 'last_6_months', 'last_year', etc.
async function fetchStats(range, apiKey) {
  const url = new URL(`https://wakatime.com/api/v1/users/current/stats/${encodeURIComponent(range)}`);
  const auth = Buffer.from(`${apiKey}`).toString('base64');
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

// Poll all_time stats briefly; WakaTime sometimes needs time to compute long ranges.
async function fetchStatsAllTimeWithRetry(apiKey, { tries = 3, delayMs = 1500 } = {}) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const json = await fetchStats('all_time', apiKey);
      const data = json?.data || json;
      const langs = Array.isArray(data?.languages) ? data.languages : [];
      const editors = Array.isArray(data?.editors) ? data.editors : [];
      const projects = Array.isArray(data?.projects) ? data.projects : [];
      const ready = data?.is_up_to_date !== false && (langs.length + editors.length + projects.length) > 0;
      if (ready) return data;
      // not ready yet → fall through to sleep/retry
    } catch (e) {
      lastErr = e;
    }
    if (i < tries - 1) await new Promise((r) => setTimeout(r, delayMs));
  }
  if (lastErr) throw lastErr;
  throw new Error('All-time stats not ready');
}

// Fallback for totals when all_time stats aren't ready
async function fetchAllTimeSinceToday(apiKey) {
  const url = new URL('https://wakatime.com/api/v1/users/current/all_time_since_today');
  const auth = Buffer.from(`${apiKey}`).toString('base64');
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${auth}`, Accept: 'application/json' },
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

  // Support period selection via ?period=... or ?range=...
  const periodParam = (req.query?.period || req.query?.range || 'last_7_days') + '';

  try {
    if (periodParam === 'all_time' || periodParam === 'all') {
      // Try official all_time first, with a short retry loop
      let data;
      try {
        data = await fetchStatsAllTimeWithRetry(API_KEY, { tries: 3, delayMs: 1500 });
      } catch {
        // Fallback: totals from all_time_since_today, breakdowns from last_6_months
        const [fallbackTotalsJson, fallbackBreakdownJson] = await Promise.all([
          fetchAllTimeSinceToday(API_KEY).catch(() => null),
          fetchStats('last_6_months', API_KEY).catch(() => null),
        ]);
        const totals = fallbackTotalsJson?.data || {};
        const breakdown = fallbackBreakdownJson?.data || {};
        data = {
          total_seconds: Number(totals?.total_seconds || 0),
          human_readable_total: totals?.text || (totals?.human_readable_total) || toHuman(totals?.total_seconds || 0),
          languages: breakdown?.languages || [],
          editors: breakdown?.editors || [],
          projects: breakdown?.projects || [],
          is_up_to_date: false,
        };
      }

      // Last-resort fallback: if user is brand new and all_time + since_today + last_6_months are empty,
      // use stats/last_7_days so the response isn't blank on day 1.
      try {
        const total = Number(data?.total_seconds || data?.grand_total?.total_seconds || 0);
        const emptyBreakdowns = (!Array.isArray(data?.languages) || data.languages.length === 0)
          && (!Array.isArray(data?.editors) || data.editors.length === 0)
          && (!Array.isArray(data?.projects) || data.projects.length === 0);
        if (total === 0 && emptyBreakdowns) {
          const s7 = await fetchStats('last_7_days', API_KEY).catch(() => null);
          const d7 = s7?.data || s7 || null;
          if (d7) {
            data = {
              total_seconds: Number(d7?.total_seconds || d7?.grand_total?.total_seconds || 0),
              human_readable_total: d7?.human_readable_total || d7?.grand_total?.human_readable_total || toHuman(d7?.grand_total?.total_seconds || 0),
              languages: d7?.languages || [],
              editors: d7?.editors || [],
              projects: d7?.projects || [],
              is_up_to_date: false,
            };
          }
        }
      } catch { /* ignore */ }

      // Also fetch last_7_days to provide weekday bars even in all_time mode
      const last7 = await fetchSummaries('last_7_days', API_KEY).catch(() => ({ data: [] }));
      const days = last7?.data || [];
      const weekdayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const weekdays = days.map((d) => {
        const dateStr = d?.range?.date || d?.range?.start || d?.range?.end;
        const date = dateStr ? new Date(dateStr) : null;
        const w = date ? weekdayNames[date.getUTCDay()] : undefined;
        return { date: dateStr, weekday: w, total_seconds: d?.grand_total?.total_seconds || 0 };
      });

      const out = {
        human_readable_total: data?.human_readable_total || toHuman(data?.total_seconds || 0),
        total_seconds: Number(data?.total_seconds || data?.grand_total?.total_seconds || 0),
        languages: normalizeStatsEntities(data?.languages || []),
        editors: normalizeStatsEntities(data?.editors || []),
        projects: normalizeStatsEntities(data?.projects || []),
        weekdays,
        period: 'all_time',
        range: undefined,
        cachedAt: new Date().toISOString(),
      };
      res.status(200).json(out);
      return;
    }

    // Default: last_7_days aggregates + weekday bars
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
    // Aggregate entities across the 7 daily summaries
    const sumEntities = (key) => {
      const map = new Map();
      for (const d of days) {
        for (const e of d?.[key] || []) {
          if (!e?.name) continue;
          map.set(e.name, (map.get(e.name) || 0) + (e.total_seconds || 0));
        }
      }
      return Array.from(map, ([name, total_seconds]) => ({ name, total_seconds }));
    };

    const totalSeconds = days.reduce((acc, d) => acc + (d?.grand_total?.total_seconds || 0), 0);

    const out = {
      human_readable_total: toHuman(totalSeconds),
      total_seconds: totalSeconds,
      languages: normalizeStatsEntities(sumEntities('languages')),
      editors: normalizeStatsEntities(sumEntities('editors')),
      projects: normalizeStatsEntities(sumEntities('projects')),
      weekdays,
      period: 'last_7_days',
      range: { start: days[0]?.range?.start, end: days[days.length - 1]?.range?.end },
      cachedAt: new Date().toISOString(),
    };
    res.status(200).json(out);
  } catch (err) {
    res.status(502).json({ error: 'Bad Gateway', message: String(err?.message || err) });
  }
}
