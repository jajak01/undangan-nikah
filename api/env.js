/**
 * VERCEL SERVERLESS ENDPOINT: /api/env
 * Reads SUPABASE_URL and SUPABASE_ANON_KEY from Vercel Environment Variables
 */

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

  const jsPayload = `window.__ENV__ = Object.assign(window.__ENV__ || {}, {
  SUPABASE_URL: "${supabaseUrl}",
  SUPABASE_ANON_KEY: "${supabaseAnonKey}"
});`;

  res.status(200).send(jsPayload);
}
