import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const SHOPIFY_DOMAIN = 'hd5ps3-wc.myshopify.com';
const SHOPIFY_API_VERSION = '2025-07';

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().max(60).optional().nullable(),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get('SHOPIFY_ACCESS_TOKEN');
    if (!token) {
      return new Response(JSON.stringify({ error: 'Shopify token not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { email, firstName, lastName } = parsed.data;

    const baseUrl = `https://${SHOPIFY_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}`;
    const headers = {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    };

    // Check if customer already exists
    const searchRes = await fetch(
      `${baseUrl}/customers/search.json?query=${encodeURIComponent(`email:${email}`)}`,
      { headers },
    );
    if (!searchRes.ok) {
      const text = await searchRes.text();
      console.error('Shopify search failed', searchRes.status, text);
      return new Response(JSON.stringify({ error: 'Shopify search failed' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const searchData = await searchRes.json();
    const existing = searchData.customers?.[0];

    if (existing) {
      // Update tags to include wishlist-subscriber
      const existingTags: string = existing.tags || '';
      const tagSet = new Set(
        existingTags.split(',').map((t: string) => t.trim()).filter(Boolean),
      );
      tagSet.add('wishlist-subscriber');
      const updateRes = await fetch(`${baseUrl}/customers/${existing.id}.json`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          customer: {
            id: existing.id,
            tags: Array.from(tagSet).join(', '),
            email_marketing_consent: {
              state: 'subscribed',
              opt_in_level: 'single_opt_in',
            },
          },
        }),
      });
      if (!updateRes.ok) {
        const text = await updateRes.text();
        console.error('Shopify update failed', updateRes.status, text);
      }
      return new Response(JSON.stringify({ ok: true, existed: true, customerId: existing.id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create new customer
    const createRes = await fetch(`${baseUrl}/customers.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        customer: {
          email,
          first_name: firstName,
          last_name: lastName || '',
          tags: 'wishlist-subscriber',
          email_marketing_consent: {
            state: 'subscribed',
            opt_in_level: 'single_opt_in',
          },
        },
      }),
    });
    const createData = await createRes.json();
    if (!createRes.ok) {
      console.error('Shopify create failed', createRes.status, createData);
      return new Response(JSON.stringify({ error: 'Shopify create failed', details: createData }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ ok: true, existed: false, customerId: createData.customer?.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('wishlist-register-customer error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
