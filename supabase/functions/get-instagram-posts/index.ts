const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');
    const igId = Deno.env.get('INSTAGRAM_BUSINESS_ACCOUNT_ID');

    if (!token || !igId) {
      return new Response(JSON.stringify({ posts: [], error: 'not_configured' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
    const url = `https://graph.facebook.com/v21.0/${igId}/media?fields=${fields}&limit=6&access_token=${token}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error('Instagram API error:', data);
      return new Response(JSON.stringify({ posts: [], error: data?.error?.message || 'api_error' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const posts = (data.data || []).map((p: any) => ({
      id: p.id,
      permalink: p.permalink,
      caption: p.caption || '',
      mediaType: p.media_type,
      imageUrl: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
      timestamp: p.timestamp,
    }));

    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (err) {
    console.error('get-instagram-posts error:', err);
    return new Response(JSON.stringify({ posts: [], error: 'unknown' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
