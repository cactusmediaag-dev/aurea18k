import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const PIXEL_ID = Deno.env.get('META_PIXEL_ID');
const ACCESS_TOKEN = Deno.env.get('META_CAPI_ACCESS_TOKEN');
const API_VERSION = 'v20.0';

const UserDataSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  external_id: z.string().optional(),
  fbp: z.string().optional(),
  fbc: z.string().optional(),
}).partial();

const EventSchema = z.object({
  event_name: z.string().min(1),
  event_id: z.string().min(1),
  event_time: z.number().int().optional(),
  event_source_url: z.string().url().optional(),
  action_source: z.enum(['website', 'email', 'app', 'phone_call', 'chat', 'physical_store', 'system_generated', 'other']).optional(),
  user_data: UserDataSchema.optional(),
  custom_data: z.record(z.any()).optional(),
  test_event_code: z.string().optional(),
});

async function sha256(value: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value.trim().toLowerCase()));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function buildUserData(input: z.infer<typeof UserDataSchema> | undefined, req: Request) {
  const out: Record<string, unknown> = {};
  if (input?.email) out.em = [await sha256(input.email)];
  if (input?.phone) out.ph = [await sha256(input.phone.replace(/\D/g, ''))];
  if (input?.first_name) out.fn = [await sha256(input.first_name)];
  if (input?.last_name) out.ln = [await sha256(input.last_name)];
  if (input?.external_id) out.external_id = [await sha256(input.external_id)];
  if (input?.fbp) out.fbp = input.fbp;
  if (input?.fbc) out.fbc = input.fbc;
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('cf-connecting-ip');
  if (ip) out.client_ip_address = ip;
  const ua = req.headers.get('user-agent');
  if (ua) out.client_user_agent = ua;
  return out;
}

export async function sendCapiEvent(event: z.infer<typeof EventSchema>, req: Request) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    throw new Error('META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not configured');
  }
  const user_data = await buildUserData(event.user_data, req);
  const payload = {
    data: [{
      event_name: event.event_name,
      event_id: event.event_id,
      event_time: event.event_time ?? Math.floor(Date.now() / 1000),
      event_source_url: event.event_source_url,
      action_source: event.action_source ?? 'website',
      user_data,
      custom_data: event.custom_data ?? {},
    }],
    ...(event.test_event_code ? { test_event_code: event.test_event_code } : {}),
  };
  const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error('Meta CAPI error', res.status, json);
    throw new Error(`Meta CAPI ${res.status}: ${JSON.stringify(json)}`);
  }
  return json;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  try {
    const body = await req.json();
    const parsed = EventSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const result = await sendCapiEvent(parsed.data, req);
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('meta-capi handler error', msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
