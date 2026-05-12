// Meta Pixel + Conversions API client helper
// - Bootstraps fbevents.js dynamically using Pixel ID fetched from edge function
// - Every trackEvent fires both fbq() and CAPI with the same event_id (dedup)

import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

let pixelId: string | null = null;
let bootstrapped = false;
let bootstrapPromise: Promise<void> | null = null;
const queue: Array<() => void> = [];

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.$?*|{}()[\]\\\/+^]/g, '\\$&') + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

function ensureFbc(): string | undefined {
  if (typeof window === 'undefined') return;
  const existing = readCookie('_fbc');
  if (existing) return existing;
  const url = new URL(window.location.href);
  const fbclid = url.searchParams.get('fbclid');
  if (!fbclid) return undefined;
  const value = `fb.1.${Date.now()}.${fbclid}`;
  document.cookie = `_fbc=${value}; path=/; max-age=${60 * 60 * 24 * 90}; SameSite=Lax`;
  return value;
}

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return (crypto as any).randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function loadFbScript() {
  if (typeof window === 'undefined' || window.fbq) return;
  // Standard Meta Pixel base code
  /* eslint-disable */
  ;(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
}

async function bootstrap(): Promise<void> {
  if (bootstrapped) return;
  if (bootstrapPromise) return bootstrapPromise;
  bootstrapPromise = (async () => {
    try {
      const { data, error } = await supabase.functions.invoke('meta-config');
      if (error) throw error;
      pixelId = data?.pixelId ?? null;
      if (!pixelId) {
        console.warn('[meta] No Pixel ID configured');
        return;
      }
      loadFbScript();
      window.fbq?.('init', pixelId);
      ensureFbc();
      bootstrapped = true;
      // flush queued events
      while (queue.length) queue.shift()?.();
    } catch (err) {
      console.warn('[meta] bootstrap failed', err);
    }
  })();
  return bootstrapPromise;
}

export function initMetaPixel() {
  // fire and forget; PageView is sent by useMetaPageView on every route change
  bootstrap();
}

interface UserData {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  external_id?: string;
}

export function trackEvent(
  eventName: string,
  customData: Record<string, any> = {},
  userData: UserData = {},
) {
  const fire = () => {
    const event_id = uuid();
    try {
      window.fbq?.('track', eventName, customData, { eventID: event_id });
    } catch (err) {
      console.warn('[meta] fbq failed', err);
    }
    const fbp = readCookie('_fbp');
    const fbc = ensureFbc();
    const body = {
      event_name: eventName,
      event_id,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: typeof window !== 'undefined' ? window.location.href : undefined,
      action_source: 'website',
      user_data: { ...userData, fbp, fbc },
      custom_data: customData,
    };
    supabase.functions.invoke('meta-capi', { body }).catch((err) => {
      console.warn('[meta] CAPI failed', err);
    });
  };
  if (bootstrapped) fire();
  else {
    queue.push(fire);
    bootstrap();
  }
}

// ─── helpers tipados ──────────────────────────────────────────────
export const trackPageView = (userData?: UserData) =>
  trackEvent('PageView', {}, userData);

export const trackViewContent = (p: { id: string; name?: string; value?: number; currency?: string }, userData?: UserData) =>
  trackEvent('ViewContent', {
    content_ids: [p.id],
    content_name: p.name,
    content_type: 'product',
    value: p.value,
    currency: p.currency ?? 'USD',
  }, userData);

export const trackAddToCart = (p: { id: string; name?: string; value?: number; currency?: string; quantity?: number }, userData?: UserData) =>
  trackEvent('AddToCart', {
    content_ids: [p.id],
    content_name: p.name,
    content_type: 'product',
    value: p.value,
    currency: p.currency ?? 'USD',
    contents: [{ id: p.id, quantity: p.quantity ?? 1, item_price: p.value }],
  }, userData);

export const trackInitiateCheckout = (p: { value: number; currency?: string; num_items: number; content_ids: string[] }, userData?: UserData) =>
  trackEvent('InitiateCheckout', {
    value: p.value,
    currency: p.currency ?? 'USD',
    num_items: p.num_items,
    content_ids: p.content_ids,
    content_type: 'product',
  }, userData);

export const trackAddToWishlist = (p: { id: string; name?: string; value?: number; currency?: string }, userData?: UserData) =>
  trackEvent('AddToWishlist', {
    content_ids: [p.id],
    content_name: p.name,
    content_type: 'product',
    value: p.value,
    currency: p.currency ?? 'USD',
  }, userData);

export const trackLead = (email: string, source?: string) =>
  trackEvent('Lead', { content_name: source }, { email });

export const trackSearch = (query: string) =>
  trackEvent('Search', { search_string: query });

export const trackCompleteRegistration = (email: string) =>
  trackEvent('CompleteRegistration', {}, { email });
