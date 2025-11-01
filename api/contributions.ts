export const config = { runtime: 'edge' };

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              color
              weekday
            }
          }
        }
      }
    }
  }
`;

export default async function handler(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('user');
  if (!user) return new Response('Missing ?user=', { status: 400 });

  // Edge runtime doesn't provide Node's global `process` type, so access via globalThis for TS safety.
  const env = (globalThis as any)?.process?.env as Record<string, string> | undefined;
  const token = env?.GITHUB_TOKEN;
  if (!token) return new Response('Missing GITHUB_TOKEN', { status: 500 });

  const gh = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY, variables: { login: user } }),
  });

  if (!gh.ok) {
    const text = await gh.text();
    return new Response(text, { status: gh.status });
  }

  const json = await gh.json();
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  const days = weeks.flatMap((w: any) =>
    w.contributionDays.map((d: any) => ({
      date: d.date,
      count: d.contributionCount,
      color: d.color ?? undefined,
    })),
  );

  return new Response(JSON.stringify(days), {
    headers: {
      'Content-Type': 'application/json',
      // Allow same-origin and common local Vite previews
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=600', // 10 minutes
    },
  });
}
