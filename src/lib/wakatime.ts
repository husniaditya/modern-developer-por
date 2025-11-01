export interface WakaEntity {
  name: string;
  total_seconds: number;
  percent?: number;
  digital?: string; // e.g., "3 hrs 10 mins"
}

export interface WakaSummary {
  human_readable_total?: string;
  total_seconds?: number;
  languages?: WakaEntity[];
  editors?: WakaEntity[];
  projects?: WakaEntity[];
  weekdays?: Array<{ date?: string; weekday?: string; total_seconds: number }>;
  range?: { start?: string; end?: string; timezone?: string };
  cachedAt?: string;
  period?: string; // e.g., 'all_time', 'last_7_days'
}

// Accepts a share JSON URL. Never pass a secret API key to the client.
function normalizeShareUrl(url: string): string {
  // Only normalize WakaTime public share links. For custom proxies, return as-is.
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    const isWakaShare = host.endsWith('wakatime.com');
    if (isWakaShare && !/\.json($|\?)/i.test(u.pathname)) {
      u.pathname = u.pathname.replace(/\/$/, '') + '.json';
      return u.toString();
    }
    return url; // custom API or already .json
  } catch {
    // Not a full URL. If it looks like a WakaTime share path, append .json, else return original.
    if (/wakatime\.com\//i.test(url) && !/\.json($|\?)/i.test(url)) {
      return `${url.replace(/\/$/, '')}.json`;
    }
    return url;
  }
}

export async function fetchWakaSummary(shareUrl: string, signal?: AbortSignal): Promise<WakaSummary> {
  const normalized = normalizeShareUrl(shareUrl);
  let res = await fetch(normalized, { signal, headers: { 'Accept': 'application/json' } });
  if (!res.ok) {
    // As a fallback, try the original URL once in case it already had parameters
    if (normalized !== shareUrl) {
      res = await fetch(shareUrl, { signal, headers: { 'Accept': 'application/json' } });
    }
  }
  if (!res.ok) throw new Error(`WakaTime: ${res.status}`);
  const json = await res.json();
  // Share JSON formats vary: sometimes the payload is the summary itself,
  // other times it's nested under "data".
  const data = json?.data ?? json;

  // Derive weekdays either from serverless (already aggregated) or from raw days arrays in share JSON.
  let weekdays: Array<{ date?: string; weekday?: string; total_seconds: number }> | undefined = undefined;
  let period: string | undefined = (data as any)?.period;
  if (Array.isArray(json?.data)) {
    // WakaTime official response: data is an array of days
    weekdays = (json.data as any[]).map((d: any) => {
      const dateStr = d?.range?.date || d?.range?.start || d?.range?.end;
      const total = d?.grand_total?.total_seconds ?? 0;
      return { date: dateStr, total_seconds: total };
    });
    // heuristics: most public shares default to last 7 days
    if (!period && (json.data as any[]).length === 7) period = 'last_7_days';
  } else if (Array.isArray((data as any)?.weekdays)) {
    weekdays = (data as any).weekdays as any[];
  } else if (Array.isArray((data as any)?.days)) {
    // Some share URLs nest daily entries under data.days
    const days = (data as any).days as any[];
    weekdays = days.map((d: any) => {
      const dateStr = d?.range?.date || d?.range?.start || d?.range?.end || d?.date;
      const total = d?.grand_total?.total_seconds ?? d?.total_seconds ?? 0;
      return { date: dateStr, total_seconds: total };
    });
    if (!period && days.length === 7) period = 'last_7_days';
  }
  return {
    human_readable_total: data?.human_readable_total ?? data?.grand_total?.human_readable_total,
    total_seconds: data?.total_seconds ?? data?.grand_total?.total_seconds,
    languages: data?.languages ?? [],
    editors: data?.editors ?? [],
    projects: data?.projects ?? [],
    weekdays,
    range: data?.range ?? undefined,
    cachedAt: new Date().toISOString(),
    period,
  } as WakaSummary;
}

export function getWakaShareUrl(): string | undefined {
  // Prefer VITE_WAKATIME_SHARE_URL, fall back to VITE_WAKATIME_API if user set it to a share JSON URL.
  const env = (import.meta as any).env || {};
  return env.VITE_WAKATIME_SHARE_URL || env.VITE_WAKATIME_API || undefined;
}
