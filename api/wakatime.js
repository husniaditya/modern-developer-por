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

// async function fetchStatsAllTime(apiKey) { /* unused */ }

// Note: all_time helpers kept for reference in case we switch back.

// async function fetchStatsAllTimeWithRetry(apiKey, { tries = 3, delayMs = 1500 } = {}) { /* unused */ }
// async function fetchAllTimeSinceToday(apiKey) { /* unused */ }

// async function fetchStatsRange(range, apiKey) { /* unused */ }

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

  // Return last_7_days aggregates + weekday bars
  try {
    // Fetch last 7 days summaries (single source of truth)
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
