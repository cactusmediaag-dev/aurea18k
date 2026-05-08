## Inscrição de e-mail no marketing do Shopify (Admin API)

### Objetivo
Quando alguém envia o e-mail no formulário "Join the Inner Circle", o e-mail entra direto na lista de **email subscribers** do Shopify (com `emailMarketingConsent: SUBSCRIBED`), disparando o fluxo de double opt-in que você já tem ativo.

### Por que precisa de edge function
A Storefront API (que roda no navegador) não permite mais marcar `acceptsMarketing`. Só a **Admin API** consegue — mas o token de Admin nunca pode ir pro frontend. Por isso, a chamada vai numa edge function backend que usa o `SHOPIFY_ACCESS_TOKEN` já armazenado nos secrets.

### Fluxo

```text
Usuário digita e-mail → submit
        ↓
Frontend chama supabase.functions.invoke('subscribe-newsletter', { email })
        ↓
Edge function valida e-mail (zod)
        ↓
Edge function chama Admin GraphQL: customerCreate
  com emailMarketingConsent: { marketingState: SUBSCRIBED, marketingOptInLevel: CONFIRMED_OPT_IN }
        ↓
Shopify cria o customer + dispara e-mail de double opt-in (já configurado no admin)
        ↓
Frontend mostra toast "Check your inbox to confirm"
```

### Arquivos

**1. Nova edge function**: `supabase/functions/subscribe-newsletter/index.ts`
- CORS handler
- Valida body com zod (`{ email: string().email() }`)
- Chama Admin API: `https://hd5ps3-wc.myshopify.com/admin/api/2025-07/graphql.json`
  - Mutation: `customerCreate(input: { email, emailMarketingConsent: { marketingState: SUBSCRIBED, marketingOptInLevel: CONFIRMED_OPT_IN } })`
  - Header: `X-Shopify-Access-Token: ${Deno.env.get('SHOPIFY_ACCESS_TOKEN')}`
- Trata erro `TAKEN` (e-mail já existe) como sucesso silencioso
- Retorna `{ success: true, alreadySubscribed?: boolean }` ou erro 400/500

**2. Atualizar `src/components/EmailCaptureSection.tsx`**
- Remover a chamada direta à Storefront API e o `generatePassword`
- Trocar por `supabase.functions.invoke('subscribe-newsletter', { body: { email } })`
- Mensagem de sucesso atualizada: "Check your inbox to confirm and grab 10% off."

### Detalhes técnicos
- Edge function deploy automático após criação
- `verify_jwt = false` (default) — endpoint público, validação do e-mail feita server-side
- Sem rate limiting elaborado (volume baixo de newsletter); se virar problema, adiciono depois com tabela no Supabase
- Não loga e-mails no console pra evitar exposição de PII

### O que NÃO muda
- Toggle de "Dupla confirmação de marketing" no Shopify continua sendo o que dispara o e-mail de confirmação (mantenha ativo)
- Cupom de 10% off precisa ser configurado por você no Shopify e incluído no template do e-mail de boas-vindas (também pelo admin do Shopify, em Settings → Notifications → Customer email templates)
