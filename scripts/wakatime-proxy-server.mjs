#!/usr/bin/env node
// Minimal WakaTime proxy server (Option B)
// - Keeps your WAKATIME_API key on the server
// - Aggregates the official summaries endpoint into a simple shape the UI expects
// - CORS enabled for local dev
// Usage:
//   1) Put your secret in .env or OS env: WAKATIME_API=your_api_key
//   2) npm run start:waka-proxy (optional PORT, default 5000)
//   3) Set VITE_WAKATIME_SHARE_URL="http://localhost:5000/wakatime" in your Vite env

import 'dotenv/config';
import http from 'node:http';
import { URL } from 'node:url';

const API_KEY = process.env.WAKATIME_API;
const PORT = Number(process.env.PORT || 5000);
const HOST = process.env.HOST || '0.0.0.0';

if (!API_KEY) {
  console.error('[wakatime-proxy] Missing WAKATIME_API in environment');
  process.exit(1);
}

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

async function fetchSummaries(rangeParam) {
  const url = new URL('https://wakatime.com/api/v1/users/current/summaries');
  if (rangeParam) url.searchParams.set('range', rangeParam);
  else url.searchParams.set('range', 'last_7_days');

  const auth = Buffer.from(`${API_KEY}:`).toString('base64');
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

function handler(req, res) {
  const origin = req.headers.origin || '*';
  // CORS for dev
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname !== '/wakatime') {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Not Found' }));
  }

  const range = url.searchParams.get('range') || 'last_7_days';
  fetchSummaries(range)
    .then((json) => {
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
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(out));
    })
    .catch((err) => {
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Bad Gateway', message: String(err?.message || err) }));
    });
}

http.createServer(handler).listen(PORT, HOST, () => {
  console.log(`[wakatime-proxy] Listening on http://${HOST}:${PORT}/wakatime`);
});
