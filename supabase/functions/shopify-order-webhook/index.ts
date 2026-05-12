import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const PIXEL_ID = Deno.env.get('META_PIXEL_ID');
const ACCESS_TOKEN = Deno.env.get('META_CAPI_ACCESS_TOKEN');
const WEBHOOK_SECRET = Deno.env.get('SHOPIFY_WEBHOOK_SECRET');
const API_VERSION = 'v20.0';

async function sha256Hex(value: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value.trim().toLowerCase()));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyShopifyHmac(rawBody: string, hmacHeader: string | null): Promise<boolean> {
  if (!WEBHOOK_SECRET || !hmacHeader) return false;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody));
  const b64 = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return b64 === hmacHeader;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return new Response('Server misconfigured', { status: 500, headers: corsHeaders });
  }

  const rawBody = await req.text();
  const hmacHeader = req.headers.get('x-shopify-hmac-sha256');
  const valid = await verifyShopifyHmac(rawBody, hmacHeader);
  if (!valid) {
    console.warn('Invalid Shopify HMAC');
    return new Response('Unauthorized', { status: 401, headers: corsHeaders });
  }

  let order: any;
  try { order = JSON.parse(rawBody); } catch {
    return new Response('Bad request', { status: 400, headers: corsHeaders });
  }

  const email: string | undefined = order?.email || order?.customer?.email;
  const phone: string | undefined = order?.phone || order?.customer?.phone;
  const firstName: string | undefined = order?.customer?.first_name;
  const lastName: string | undefined = order?.customer?.last_name;
  const orderId = String(order?.id ?? '');
  const value = parseFloat(order?.total_price ?? '0');
  const currency: string = order?.currency ?? 'USD';
  const lineItems = Array.isArray(order?.line_items) ? order.line_items : [];
  const contentIds = lineItems.map((li: any) => String(li?.product_id ?? li?.variant_id ?? '')).filter(Boolean);
  const contents = lineItems.map((li: any) => ({
    id: String(li?.product_id ?? li?.variant_id ?? ''),
    quantity: Number(li?.quantity ?? 1),
    item_price: parseFloat(li?.price ?? '0'),
  }));

  const user_data: Record<string, unknown> = {};
  if (email) user_data.em = [await sha256Hex(email)];
  if (phone) user_data.ph = [await sha256Hex(phone.replace(/\D/g, ''))];
  if (firstName) user_data.fn = [await sha256Hex(firstName)];
  if (lastName) user_data.ln = [await sha256Hex(lastName)];
  if (orderId) user_data.external_id = [await sha256Hex(orderId)];

  const payload = {
    data: [{
      event_name: 'Purchase',
      event_id: `shopify-order-${orderId}`,
      event_time: Math.floor(new Date(order?.created_at ?? Date.now()).getTime() / 1000),
      action_source: 'website',
      event_source_url: order?.order_status_url || undefined,
      user_data,
      custom_data: {
        currency,
        value,
        content_ids: contentIds,
        contents,
        content_type: 'product',
        num_items: lineItems.reduce((acc: number, li: any) => acc + Number(li?.quantity ?? 1), 0),
        order_id: orderId,
      },
    }],
  };

  try {
    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('Meta CAPI Purchase error', res.status, json);
      return new Response('CAPI error', { status: 502, headers: corsHeaders });
    }
    console.log('Purchase tracked', orderId, json);
    return new Response('ok', { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('Webhook handler error', err);
    return new Response('Server error', { status: 500, headers: corsHeaders });
  }
});
