# Conectar formulário "Inner Circle" à Shopify

Atualmente o `EmailCaptureSection` só mostra um toast — emails são perdidos. Vou conectar à Shopify via Storefront API pra cadastrar como cliente real com `acceptsMarketing: true` (equivalente da tag `newsletter` — é o filtro que Shopify Email/Marketing usa pra segmentar).

## Por que `acceptsMarketing` em vez da tag `newsletter`

A Storefront API (que usamos no frontend) **não permite setar tags em customers** — só Admin API permite, e essa exige backend/secret. O campo `acceptsMarketing: true`:
- Marca o cliente como inscrito no marketing
- É o filtro nativo usado por Shopify Email, Klaviyo, Mailchimp etc.
- Aparece no painel Shopify em "Customers → Subscribed to email marketing"

Se depois você quiser tag literal `newsletter`, dá pra adicionar manualmente em massa no painel Shopify (filtro: "Email subscribers" → bulk edit → add tag).

## Mudanças

**`src/components/EmailCaptureSection.tsx`**
- Tornar `handleSubmit` async
- Chamar mutation GraphQL `customerCreate` via `storefrontApiRequest` (já existe em `src/lib/shopify.ts`)
- Payload: `{ email, password: <random 24 chars>, acceptsMarketing: true }`
  - Password aleatória obrigatória pela API; cliente pode redefinir via "esqueci senha" da Shopify se quiser logar
- Tratar respostas:
  - Sucesso → toast "You're in! Check your inbox for 10% off."
  - Email já cadastrado (`code: TAKEN` ou `CUSTOMER_DISABLED`) → mesmo toast de sucesso (UX — não revelar duplicidade)
  - Outros erros → toast com mensagem
- Estado `submitting` com `<Loader2>` no botão e disable do input
- Adicionar `required` no input

## O que NÃO muda

- Visual/copy idênticos
- Cupom de 10% off — você precisa configurar no painel Shopify (Marketing → Automations → Welcome series, ou criar discount code `WELCOME10` e enviar via Shopify Email)

## Pós-implementação (você faz no Shopify)

1. **Shopify admin → Customers** — confirmar que aparecem novos cadastros com checkbox "Accepts marketing" ✅
2. **Marketing → Automations** — criar fluxo "Welcome new subscribers" enviando código `WELCOME10`
3. (Opcional) Filtrar por "Email subscribers" e adicionar tag `newsletter` em bulk
