// Vercel serverless API route for WakaTime summaries (Option B)
// Keep WAKATIME_API secret on the server; client calls this endpoint.

function toHuman(seconds) {
  const s = Math.floor(Number(seconds || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function aggregateEntities(days, key) {
  const map = new Map();
  for (const d of days || []) {
    for (const item of d[key] || []) {
      const name = item.name || 'Unknown';
      const prev = map.get(name) || 0;
      map.set(name, prev + (item.total_seconds || 0));
    }
  }
  const entries = Array.from(map.entries()).map(([name, total_seconds]) => ({ name, total_seconds }));
  const grand = entries.reduce((acc, e) => acc + e.total_seconds, 0) || 0;
  return entries
    .map((e) => ({ ...e, percent: grand ? (e.total_seconds * 100) / grand : 0, digital: toHuman(e.total_seconds) }))
    .sort((a, b) => b.total_seconds - a.total_seconds);
}

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

  const range = req.query?.range || 'last_7_days';
  try {
    const json = await fetchSummaries(range, API_KEY);
    const days = json?.data || [];
    const totalSeconds = days.reduce((acc, d) => acc + (d.grand_total?.total_seconds || 0), 0);
    const out = {
      human_readable_total: toHuman(totalSeconds),
      total_seconds: totalSeconds,
      languages: aggregateEntities(days, 'languages'),
      editors: aggregateEntities(days, 'editors'),
      projects: aggregateEntities(days, 'projects'),
      range: { start: days[0]?.range?.start, end: days[days.length - 1]?.range?.end },
      cachedAt: new Date().toISOString(),
    };
    res.status(200).json(out);
  } catch (err) {
    res.status(502).json({ error: 'Bad Gateway', message: String(err?.message || err) });
  }
}
