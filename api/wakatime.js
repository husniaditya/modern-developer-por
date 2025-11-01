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
    // Fetch all-time stats for aggregates
    const stats = await fetchStatsAllTime(API_KEY);
    const sdata = stats?.data || {};
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
    const out = {
      human_readable_total: sdata?.human_readable_total || toHuman(sdata?.total_seconds || 0),
      total_seconds: sdata?.total_seconds || 0,
      languages: normalizeStatsEntities(sdata?.languages),
      editors: normalizeStatsEntities(sdata?.editors),
      projects: normalizeStatsEntities(sdata?.projects),
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
