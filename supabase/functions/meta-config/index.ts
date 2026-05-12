import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve((req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const pixelId = Deno.env.get('META_PIXEL_ID') ?? null;
  return new Response(JSON.stringify({ pixelId }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
  });
});
