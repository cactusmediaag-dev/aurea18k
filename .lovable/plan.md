## Plano: Meta Pixel + Conversions API (CAPI)

### Como você fornece as credenciais

**Pixel ID** — vai direto no código (é público, aparece no `<script>` do Pixel mesmo). Vou pedir pra você colar agora no chat.

**Token da Conversions API** — guardado como secret no Lovable Cloud (`META_CAPI_ACCESS_TOKEN`). Só a edge function lê. Eu disparo o prompt de secret depois que você confirmar o plano.

Você gera o token em: **Meta Events Manager → Seu Pixel → Settings → Conversions API → Generate Access Token**.

### Arquitetura

```
Browser                                   Edge Function (Lovable Cloud)
  │                                              │
  ├─ fbq('track', 'Event', data, {eventID})      │
  │                                              │
  └─ POST /functions/meta-capi  ───────────────► fetch graph.facebook.com
       (mesmo eventID = dedup)                   /v20.0/{PIXEL_ID}/events
                                                 (Bearer = secret)
```

Toda chamada client-side dispara também server-side com o mesmo `event_id` → Meta deduplica automaticamente, batendo match quality alto.

### O que vai ser implementado

**1. Pixel (client-side) em `index.html`**
- Snippet base do Meta Pixel com seu PIXEL_ID
- `<noscript>` com fallback `<img>` no `<body>` (não no `<head>`)

**2. Hook + helper `src/lib/metaPixel.ts`**
- `trackEvent(name, data, userData?)` — gera `event_id` (UUID), chama `fbq()` e `fetch('/functions/meta-capi')` em paralelo
- Helpers tipados: `trackPageView()`, `trackViewContent(product)`, `trackAddToCart(item)`, `trackInitiateCheckout(cart)`, `trackAddToWishlist(item)`, `trackLead(email)`, `trackSearch(query)`, `trackCompleteRegistration(email)`
- Captura automática de `fbp` (cookie `_fbp`) e `fbc` (param `fbclid` na URL → cookie `_fbc`) pra mandar no CAPI

**3. Edge function `meta-capi`**
- Recebe `{ event_name, event_id, event_time, event_source_url, user_data, custom_data }`
- Hash SHA-256 de email/phone/nome (requisito do CAPI)
- POST `https://graph.facebook.com/v20.0/{PIXEL_ID}/events?access_token={TOKEN}`
- Inclui `client_ip_address` (do header `x-forwarded-for`) e `client_user_agent` automaticamente
- Validação Zod, retorno padronizado, CORS

**4. Disparos integrados**
| Evento | Onde | Dados |
|---|---|---|
| `PageView` | `App.tsx` (todo route change) | url, referrer |
| `ViewContent` | `ProductDetail.tsx` (mount) | content_id, content_name, value, currency |
| `Search` | `SearchModal.tsx` (debounce) | search_string |
| `AddToCart` | `cartStore.addItem()` | content_id, value, currency, quantity |
| `AddToWishlist` | `wishlistStore.add()` (via WishlistButton) | content_id, value |
| `Lead` | `WishlistCaptureModal` (submit) + `EmailCaptureSection` | email |
| `CompleteRegistration` | `Account.tsx` (sign-in com email) | email |
| `InitiateCheckout` | `cartStore.checkout()` ou botão Checkout do `CartDrawer` | num_items, value |
| `Purchase` | **Webhook Shopify** → edge function `meta-purchase-webhook` | order_id, value, currency, content_ids |

**5. Webhook de Purchase (server-side, mais preciso)**
- Edge function nova `shopify-order-webhook` que:
  - Valida assinatura HMAC do Shopify (header `x-shopify-hmac-sha256` + secret `SHOPIFY_WEBHOOK_SECRET`)
  - Extrai `order.id`, `email`, `total_price`, `line_items`, `customer`
  - Chama internamente o handler do CAPI com `event_name: 'Purchase'`
- Você precisa registrar o webhook no Shopify Admin: **Settings → Notifications → Webhooks → Create webhook → Order creation → JSON → URL: `https://xtlyyioutqiyplylkebk.supabase.co/functions/v1/shopify-order-webhook`**
- Vou te dar o link pronto e a instrução depois do deploy

**6. Identificação do usuário**
- Quando tem email salvo (wishlist/account), passa pra todos os eventos como `user_data.em` (hashed)
- Sempre passa `fbp`/`fbc` automaticamente

### Secrets necessários

- `META_CAPI_ACCESS_TOKEN` — token da Conversions API
- `META_PIXEL_ID` — também como secret (server precisa dele pra montar a URL); o mesmo ID vai hardcoded no client/index.html

(Vou pedir os dois via prompt seguro depois do plano aprovado.)

### Fora do escopo

- Test events / payload code do Meta (você usa o Test Events tab no Events Manager pra validar — não precisa hardcode)
- Custom Audiences automation
- Catalog feed (Shopify já tem catalog feed nativo via Meta channel)
