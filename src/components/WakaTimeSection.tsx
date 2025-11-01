import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { getWakaShareUrl, fetchWakaSummary, type WakaSummary } from '@/lib/wakatime';

function formatHhMm(totalSeconds?: number, fallback?: string) {
  if (!totalSeconds) return fallback ?? '-';
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function WakaTimeSection({ embed = false }: { embed?: boolean }) {
  const [summary, setSummary] = useState<WakaSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const shareUrl = getWakaShareUrl();

  useEffect(() => {
    if (!shareUrl) return;
    const ctrl = new AbortController();
    (async () => {
      try {
        setError(null);
        const s = await fetchWakaSummary(shareUrl, ctrl.signal);
        setSummary(s);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load');
      }
    })();
    return () => ctrl.abort();
  }, [shareUrl]);

  const topLangs = useMemo(() => {
    const langs = summary?.languages ?? [];
    return [...langs].sort((a, b) => (b.total_seconds ?? 0) - (a.total_seconds ?? 0)).slice(0, 5);
  }, [summary]);

  const header = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={embed ? 'mb-6' : 'mb-8 text-center'}
    >
      <h2 className={embed ? 'text-2xl font-semibold text-foreground' : 'text-4xl font-bold text-foreground mb-2'}>
        Coding Activity
      </h2>
      <p className="text-muted-foreground">
        Last 7 days • Total {summary?.human_readable_total ?? formatHhMm(summary?.total_seconds, '-')}
      </p>
    </motion.div>
  );

  const inner = (
    <>
      {header}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Languages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="space-y-1">
                <p className="text-sm text-red-600">{error}</p>
                {String(error).includes('404') && (
                  <p className="text-xs text-muted-foreground">
                    Tip: Use a WakaTime public share JSON link ending with <code>.json</code>, for example
                    {' '}<code>https://wakatime.com/share/@you/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.json</code>
                  </p>
                )}
              </div>
            )}
            {!error && topLangs.length === 0 && (
              <p className="text-sm text-muted-foreground">No data.</p>
            )}
            {topLangs.map((l) => {
              const pct = typeof l.percent === 'number' ? l.percent : undefined;
              return (
                <div key={l.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{l.name}</span>
                    <span className="text-xs text-muted-foreground">{l.digital ?? formatHhMm(l.total_seconds)}</span>
                  </div>
                  <Progress value={pct ?? 0} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {(summary?.editors ?? []).slice(0, 4).map((e) => (
                <Badge key={e.name} variant="secondary" className="border border-border/60 bg-muted/60">
                  {e.name} · {e.digital ?? formatHhMm(e.total_seconds)}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {(summary?.projects ?? []).slice(0, 4).map((p) => (
                <Badge key={p.name} variant="outline">
                  {p.name} · {p.digital ?? formatHhMm(p.total_seconds)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  if (embed) {
    // Embedded inside SkillsSection container
    if (!shareUrl) return null; // hide if not configured when embedded
    return inner;
  }

  if (!shareUrl) {
    return (
      <section id="wakatime" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>WakaTime</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                WakaTime is not configured. Set VITE_WAKATIME_SHARE_URL (or VITE_WAKATIME_API) to a public share JSON URL.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="wakatime" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {inner}
      </div>
    </section>
  );
}
