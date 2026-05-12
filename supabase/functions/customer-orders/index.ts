import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const SHOPIFY_DOMAIN = 'hd5ps3-wc.myshopify.com';
const SHOPIFY_API_VERSION = '2025-07';

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
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
    const { email } = parsed.data;

    const baseUrl = `https://${SHOPIFY_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}`;
    const headers = {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    };

    const searchRes = await fetch(
      `${baseUrl}/customers/search.json?query=${encodeURIComponent(`email:${email}`)}`,
      { headers },
    );
    if (!searchRes.ok) {
      return new Response(JSON.stringify({ error: 'Shopify search failed' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const searchData = await searchRes.json();
    const customer = searchData.customers?.[0];
    if (!customer) {
      return new Response(JSON.stringify({ ok: true, customer: null, orders: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ordersRes = await fetch(
      `${baseUrl}/customers/${customer.id}/orders.json?status=any&limit=50`,
      { headers },
    );
    const ordersData = await ordersRes.json();

    const orders = (ordersData.orders || []).map((o: Record<string, unknown>) => ({
      id: o.id,
      name: o.name,
      created_at: o.created_at,
      financial_status: o.financial_status,
      fulfillment_status: o.fulfillment_status,
      total_price: o.total_price,
      currency: o.currency,
      order_status_url: o.order_status_url,
      line_items: ((o.line_items as Array<Record<string, unknown>>) || []).map((li) => ({
        title: li.title,
        quantity: li.quantity,
        price: li.price,
      })),
    }));

    return new Response(
      JSON.stringify({
        ok: true,
        customer: {
          id: customer.id,
          first_name: customer.first_name,
          last_name: customer.last_name,
          email: customer.email,
          orders_count: customer.orders_count,
          total_spent: customer.total_spent,
          currency: customer.currency,
        },
        orders,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('customer-orders error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
