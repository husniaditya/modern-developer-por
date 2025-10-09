import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption, loadEnv } from "vite";

import sparkPlugin from "@github/spark/spark-vite-plugin";
import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";
import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const githubToken = env.GITHUB_TOKEN;

  // Dev-only middleware to serve /api/contributions locally
  const githubContribDevPlugin: PluginOption = {
    name: 'dev-github-contributions-proxy',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contributions', async (req, res) => {
        try {
          const url = new URL(req.url || '/api/contributions', 'http://localhost');
          const user = url.searchParams.get('user');
          if (!user) {
            res.statusCode = 400;
            res.end('Missing ?user=');
            return;
          }
          if (!githubToken) {
            res.statusCode = 500;
            res.end('Missing GITHUB_TOKEN in .env for local dev');
            return;
          }

          const QUERY = `
            query($login: String!) {
              user(login: $login) {
                contributionsCollection {
                  contributionCalendar {
                    weeks { contributionDays { date contributionCount color weekday } }
                  }
                }
              }
            }
          `;

          const gh = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
              Authorization: `bearer ${githubToken}`,
              'Content-Type': 'application/json',
              'User-Agent': 'vite-dev-proxy',
            },
            body: JSON.stringify({ query: QUERY, variables: { login: user } }),
          });

          if (!gh.ok) {
            const text = await gh.text();
            res.statusCode = gh.status;
            res.setHeader('Content-Type', 'text/plain');
            res.end(text);
            return;
          }

          const json = await gh.json();
          const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
          const days = weeks.flatMap((w: any) =>
            w.contributionDays.map((d: any) => ({ date: d.date, count: d.contributionCount, color: d.color ?? undefined }))
          );

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(days));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end(`Error: ${err?.message || 'Unknown error'}`);
        }
      });
    },
  };

  return {
    plugins: [
      react(),
      tailwindcss(),
      // DO NOT REMOVE
      createIconImportProxy() as PluginOption,
      sparkPlugin() as PluginOption,
      githubContribDevPlugin,
    ],
    resolve: {
      alias: {
        '@': resolve(projectRoot, 'src')
      }
    },
  };
});
