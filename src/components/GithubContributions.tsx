import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/contexts/ThemeContext';

type DayCell = {
  date: string; // YYYY-MM-DD
  count: number;
  level: number; // 0..4
  color?: string; // hex from GitHub when available
};

type Week = DayCell[]; // length 7

interface GithubContributionsProps {
  username: string;
  title?: string;
  className?: string;
}

// GitHub classic light palette (higher contrast, more familiar look)
const GITHUB_LIGHT_GREEN_SCALE = [
  '#ebedf0', // 0
  '#9be9a8', // 1
  '#40c463', // 2
  '#30a14e', // 3
  '#216e39', // 4
];

// GitHub dark theme palette
const GITHUB_DARK_GREEN_SCALE = [
  '#161b22', // 0
  '#0e4429', // 1
  '#006d32', // 2
  '#26a641', // 3
  '#39d353', // 4
];

function levelFromCount(count: number): number {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

function asDateOnly(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Build a 53-week (about a year) calendar matrix starting on a Sunday, ending at today
function buildCalendar(daysByDate: Record<string, Partial<DayCell>>): Week[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Start 52 weeks back, aligned to Sunday
  const start = new Date(today);
  start.setDate(start.getDate() - 7 * 52);
  start.setDate(start.getDate() - start.getDay()); // align to Sunday (0)

  const weeks: Week[] = [];
  const d = new Date(start);
  for (let w = 0; w < 53; w++) {
    const week: Week = [];
    for (let i = 0; i < 7; i++) {
      const key = asDateOnly(d);
      const base = daysByDate[key] || { count: 0, level: 0 };
      const count = base.count ?? 0;
      const level = base.level ?? levelFromCount(count);
      week.push({
        date: key,
        count,
        level,
        color: base.color,
      });
      d.setDate(d.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

// Attempt to fetch the public contribution SVG via a CORS proxy (if provided),
// then parse it to a map of date -> { count, level, color }
async function fetchContributionsViaSvg(username: string, corsProxy?: string) {
  if (!corsProxy) return null; // avoid CORS errors if no proxy configured
  try {
    const to = asDateOnly(new Date());
    const target = `https://github.com/users/${username}/contributions?to=${to}`;
    const url = corsProxy.endsWith('/') ? `${corsProxy}${target}` : `${corsProxy}/${target}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rects = Array.from(doc.querySelectorAll<SVGRectElement>('rect[data-date]'));
    const map: Record<string, Partial<DayCell>> = {};
    for (const rect of rects) {
      const date = rect.getAttribute('data-date') || '';
      const count = Number(rect.getAttribute('data-count') || '0');
      const levelAttr = rect.getAttribute('data-level');
      const level = levelAttr != null ? Number(levelAttr) : levelFromCount(count);
      const color = rect.getAttribute('fill') || undefined;
      if (date) map[date] = { count, level, color };
    }
    return map;
  } catch (err) {
    console.warn('fetchContributionsViaSvg failed:', err);
    return null;
  }
}

// Optional: provide your own JSON endpoint in production (recommended) to avoid using a public proxy
async function fetchContributionsFromCustomEndpoint(username: string) {
  const endpoint = import.meta.env.VITE_GH_CONTRIB_ENDPOINT as string | undefined;
  if (!endpoint) return null;
  try {
    const url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}user=${encodeURIComponent(username)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Array<{ date: string; count: number; color?: string; level?: number }>;
    const map: Record<string, Partial<DayCell>> = {};
    for (const d of data) {
      map[d.date] = { count: d.count, color: d.color, level: d.level ?? levelFromCount(d.count) };
    }
    return map;
  } catch (err) {
    console.warn('fetchContributionsFromCustomEndpoint failed:', err);
    return null;
  }
}

export default function GithubContributions({ username, title = 'GitHub Contributions', className = '' }: GithubContributionsProps) {
  const [weeks, setWeeks] = useState<Week[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const corsProxy = (import.meta.env.VITE_GH_CORS_PROXY as string | undefined) || undefined;
  // Default the endpoint to our local/hosted API route if not provided
  const endpoint = (import.meta.env.VITE_GH_CONTRIB_ENDPOINT as string | undefined) ?? '/api/contributions';

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      // Preferred: your own backend endpoint (serverless) that queries GitHub GraphQL with a token.
      // Try serverless endpoint first
      let map: Record<string, Partial<DayCell>> | null = null;
      try {
        const res = await fetch(`${endpoint}${endpoint.includes('?') ? '&' : '?'}user=${encodeURIComponent(username)}`);
        if (res.ok) {
          const data = (await res.json()) as Array<{ date: string; count: number; color?: string; level?: number }>;
          const m: Record<string, Partial<DayCell>> = {};
          for (const d of data) m[d.date] = { count: d.count, color: d.color, level: d.level ?? levelFromCount(d.count) };
          map = m;
        } else {
          console.warn('Contributions endpoint returned', res.status, res.statusText);
        }
      } catch (err) {
        console.warn('Error calling contributions endpoint:', err);
      }
      if (!map) {
        // Fallback: scrape the public contributions SVG via a CORS proxy (if configured)
        map = await fetchContributionsViaSvg(username, corsProxy || undefined);
      }
      if (!mounted) return;
      if (!map) {
        setError('Unable to load contributions. For local dev, restart `npm run dev` after adding GITHUB_TOKEN in .env so the /api/contributions route is available. Or set VITE_GH_CONTRIB_ENDPOINT or VITE_GH_CORS_PROXY.');
        setWeeks(null);
      } else {
        setWeeks(buildCalendar(map));
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [username, corsProxy]);

  const palette = theme === 'dark' ? GITHUB_DARK_GREEN_SCALE : GITHUB_LIGHT_GREEN_SCALE;

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary hover:underline"
        >
          @{username}
        </a>
      </div>

      {loading && (
        <div className="animate-pulse h-28 bg-muted/50 rounded" />
      )}

      {!loading && error && (
        <div className="text-sm text-muted-foreground">
          {error}
          <div className="mt-2 text-xs">
            Tip: For best reliability, expose a small serverless endpoint in Vercel/Netlify that queries GitHub GraphQL v4
            with your token, then set VITE_GH_CONTRIB_ENDPOINT to that URL. As a quick test-only option, you can also set
            VITE_GH_CORS_PROXY to a CORS proxy capable of fetching https://github.com/users/{'{username}'}/contributions.
          </div>
        </div>
      )}

      {!loading && weeks && (
        <TooltipProvider>
          <div className="w-full overflow-x-auto">
            <motion.div
              className="flex gap-1 w-max mx-auto justify-center"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((day, dIdx) => {
                    const idx = wIdx * 7 + dIdx; // chronological index for stagger
                    const targetColor = palette[day.level];
                    const hasContrib = day.level > 0 && day.count > 0;
                    return (
                      <Tooltip key={day.date}>
                        <TooltipTrigger asChild>
                          <div
                            className="relative h-3 w-3 rounded-[2px] overflow-hidden border border-border"
                            style={{ backgroundColor: palette[0] }}
                          >
                            {/* Fill bar grows left->right to simulate filling */}
                            {hasContrib && (
                              <motion.div
                                className="absolute left-0 top-0 h-full rounded-[2px]"
                                style={{ backgroundColor: targetColor }}
                                initial={{ width: '0%' }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.45, delay: 0.012 * idx, ease: [0.22, 1, 0.36, 1] }}
                              />
                            )}
                            {/* For empty/level 0 days, show a subtle base */}
                            {!hasContrib && (
                              <div className="absolute inset-0 rounded-[2px] opacity-80" />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <div className="font-medium">{day.count} contribution{day.count === 1 ? '' : 's'}</div>
                            <div className="text-muted-foreground">{day.date}</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          </div>
        </TooltipProvider>
      )}

      {!loading && weeks && (
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: palette[0] }} />
          <div className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: palette[1] }} />
          <div className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: palette[2] }} />
          <div className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: palette[3] }} />
          <div className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: palette[4] }} />
          <span>More</span>
        </div>
      )}
    </Card>
  );
}
