import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { getWakaShareUrl, fetchWakaSummary, type WakaSummary } from '@/lib/wakatime';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

function formatHhMm(totalSeconds?: number, fallback?: string) {
  if (!totalSeconds) return fallback ?? '-';
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function WakaTimeSection({ embed = false }: { embed?: boolean }) {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [summary, setSummary] = useState<WakaSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const shareUrl = getWakaShareUrl();

  // Resolve a CSS variable (e.g. --primary) to a concrete rgb(...) for SVG attributes.
  // Handles OKLCH/HSL tokens by letting the browser compute the final sRGB color.
  const useCssColor = (cssVarName: string, fallback: string) => {
    const [color, setColor] = useState<string>(fallback);
    useEffect(() => {
      try {
        const raw = getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
        if (!raw) {
          setColor(fallback);
          return;
        }
        // Wrap triplet form (e.g. "210 40% 50%") with hsl(...); pass through oklch()/hsl()/rgb()/hex.
        const candidate = /%/.test(raw) && !/^hsl\(/i.test(raw) && !/^oklch\(/i.test(raw)
          ? `hsl(${raw})`
          : raw;
        // Use a probe element so the browser converts any supported color space to rgb(...)
        const probe = document.createElement('span');
        probe.style.color = candidate as any;
        probe.style.display = 'none';
        document.body.appendChild(probe);
        const resolved = getComputedStyle(probe).color; // typically rgb(r, g, b)
        probe.remove();
        setColor(resolved || candidate || fallback);
      } catch {
        setColor(fallback);
      }
      // tie to theme so color recomputes on theme switch
      void theme;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cssVarName, fallback, theme]);
    return color;
  };

  const primaryColor = useCssColor('--primary', '#4f46e5');
  const accentColor = useCssColor('--accent', '#22d3ee');
  const axisColor = useCssColor('--muted-foreground', '#6b7280');

  // Color palette for pie chart
  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#14b8a6'];


  // Animation helpers
  const listVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  }), []);
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 },
  }), []);
  // Re-trigger bar animation when data changes
  const barAnimKey = useMemo(() => (summary?.weekdays ?? []).map(d => d?.total_seconds || 0).join(','), [summary]);
  const gradientId = useMemo(() => `wk-grad-${Math.random().toString(36).slice(2)}` , []);
  const listAnimKey = useMemo(() => (summary?.languages ?? []).map(l => l?.name).join('|'), [summary]);
  const editorsKey = useMemo(() => (summary?.editors ?? []).map(e => e?.name).join('|'), [summary]);
  const projectsKey = useMemo(() => (summary?.projects ?? []).map(p => p?.name).join('|'), [summary]);

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

  // Aggregate last-7-days into weekday buckets (Mon..Sun) like WakaTime dashboard
  const weeklyData = useMemo(() => {
    const buckets = Array.from({ length: 7 }, (_, i) => ({ idx: i, seconds: 0 })); // 0=Sun .. 6=Sat
    for (const d of summary?.weekdays ?? []) {
      if (!d) continue;
      const date = d.date ? new Date(d.date) : undefined;
      const dow = date ? date.getUTCDay() : undefined;
      if (typeof dow === 'number') buckets[dow].seconds += d.total_seconds || 0;
    }
    // Order to Monday..Sunday like WakaTime UI
    const order = [1, 2, 3, 4, 5, 6, 0];
    const labelFor = (dow: number) => {
      // build a stable date that corresponds to the desired weekday index
      const base = new Date(Date.UTC(2023, 0, 1)); // 2023-01-01 is Sunday
      const delta = (dow - base.getUTCDay() + 7) % 7;
      const d = new Date(base);
      d.setUTCDate(base.getUTCDate() + delta);
      return d.toLocaleDateString(i18n.language, { weekday: 'short' });
    };
    return order.map((i) => ({ name: labelFor(i), seconds: buckets[i].seconds }));
  }, [summary, i18n.language]);

  const header = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={embed ? 'mb-6' : 'mb-8 text-center'}
    >
      <h2 className={embed ? 'text-2xl font-semibold text-foreground' : 'text-4xl font-bold text-foreground mb-2'}>
        {t('wakatime.title')}
      </h2>
      <p className="text-muted-foreground">
        {t(summary?.period === 'all_time' ? 'wakatime.allTime' : 'wakatime.last7Days')} • {t('wakatime.totalLabel')} {' '}
        {summary?.human_readable_total ?? formatHhMm(summary?.total_seconds, '-')}
      </p>
    </motion.div>
  );

  const inner = (
    <>
      {header}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-9">
          <CardHeader>
            <CardTitle>{t('wakatime.topLanguages')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="space-y-1">
                <p className="text-sm text-red-600">{error}</p>
                {String(error).includes('404') && (
                  <p className="text-xs text-muted-foreground">
                    {t('wakatime.tip404')} <code>.json</code>, {t('common.example', { defaultValue: 'for example' })}
                    {' '}<code>https://wakatime.com/share/@you/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.json</code>
                  </p>
                )}
              </div>
            )}
            {!error && topLangs.length === 0 && (
              <p className="text-sm text-muted-foreground">{t('wakatime.noData')}</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie chart */}
              {topLangs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={topLangs}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent || 0).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="total_seconds"
                        animationBegin={0}
                        animationDuration={800}
                      >
                        {topLangs.map((entry, index) => (
                          <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }: any) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="rounded-md bg-popover px-3 py-2 text-sm shadow-lg border border-border">
                                <p className="font-medium">{data.name}</p>
                                <p className="text-muted-foreground">
                                  {data.digital ?? formatHhMm(data.total_seconds)} 
                                  {typeof data.percent === 'number' && ` (${data.percent.toFixed(1)}%)`}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              )}

              {/* Progress bars */}
              <motion.div key={listAnimKey} initial="hidden" animate="visible" variants={listVariants} className="space-y-4">
                {topLangs.map((l) => {
                  const pct = typeof l.percent === 'number' ? l.percent : undefined;
                  return (
                    <motion.div key={l.name} className="space-y-1" variants={itemVariants} transition={{ duration: 0.35 }}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{l.name}</span>
                        <span className="text-xs text-muted-foreground">{l.digital ?? formatHhMm(l.total_seconds)}</span>
                      </div>
                      <Progress value={pct ?? 0} className="h-2" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{t('wakatime.breakdown')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Editors */}
            {(summary?.editors ?? []).length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {t('wakatime.editors', { defaultValue: 'Editors' })}
                </h4>
                <motion.div className="flex flex-wrap gap-2" key={editorsKey} initial="hidden" animate="visible" variants={listVariants}>
                  {(summary?.editors ?? []).slice(0, 6).map((e) => (
                    <motion.span key={e.name} variants={itemVariants} transition={{ duration: 0.35 }}>
                      <Badge variant="secondary" className="border border-border/60 bg-muted/60">
                        {e.name} · {e.digital ?? formatHhMm(e.total_seconds)}
                        {typeof e.percent === 'number' && ` (${e.percent.toFixed(0)}%)`}
                      </Badge>
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            )}
            
            {/* Projects */}
            {(summary?.projects ?? []).length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {t('wakatime.projects', { defaultValue: 'Projects' })}
                </h4>
                <motion.div className="flex flex-wrap gap-2" key={projectsKey} initial="hidden" animate="visible" variants={listVariants}>
                  {(summary?.projects ?? []).slice(0, 8).map((p) => (
                    <motion.span key={p.name} variants={itemVariants} transition={{ duration: 0.35 }}>
                      <Badge variant="outline">
                        {p.name} · {p.digital ?? formatHhMm(p.total_seconds)}
                        {typeof p.percent === 'number' && ` (${p.percent.toFixed(0)}%)`}
                      </Badge>
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly activity bar chart (aggregate by weekday Mon..Sun) */}
        <Card className="lg:col-span-12">
          <CardHeader>
            <CardTitle>{t('wakatime.weeklyActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            {weeklyData.filter((d) => d.seconds > 0).length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('wakatime.noData')}</p>
            ) : (
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart key={barAnimKey} data={weeklyData} margin={{ left: -10, right: 0, top: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={accentColor} stopOpacity={0.95} />
                        <stop offset="100%" stopColor={primaryColor} stopOpacity={0.95} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} tick={{ fontSize: 12, fill: axisColor }} />
                    <YAxis hide domain={[0, 'dataMax']} />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      content={({ active, payload, label }: any) => {
                        if (active && payload && payload.length) {
                          const secs = payload[0]?.payload?.seconds || 0;
                          return (
                            <div className="rounded-md bg-popover px-2 py-1 text-xs shadow border border-border">
                              <span className="font-medium">{label}:</span> {formatHhMm(secs, '0m')}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="seconds"
                      radius={[6, 6, 0, 0]}
                      fill={`url(#${gradientId})`}
                      isAnimationActive
                      animationBegin={150}
                      animationDuration={800}
                      animationEasing="ease-out"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
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
              <p className="text-muted-foreground">{t('wakatime.notConfigured')}</p>
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
