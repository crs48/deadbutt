import type { APIRoute } from 'astro';
import { moves } from '../data/moves';
import { path } from '../lib/paths';
export const GET: APIRoute = ({ site }) => {
  const routes = [
    '',
    'learn/',
    'check-in/',
    'moves/',
    'reset/',
    'sources/',
    ...moves.map((move) => `moves/${move.slug}/`),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${new URL(path(route), site).href}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
