# Conectar Instagram à seção "Follow Along"

A Lovable não tem connector nativo de Instagram, então a integração é feita via **Instagram Graph API da Meta** + uma edge function da Lovable Cloud que busca os posts mais recentes.

> Importante: a antiga **Instagram Basic Display API foi descontinuada em dez/2024**. A única forma oficial e estável hoje é a **Instagram Graph API**, que exige conta **Business** ou **Creator** (não funciona com conta pessoal).

---

## O que você vai precisar fazer (lado Meta)

1. **Converter `@aureajewels.18k` em conta Business ou Creator** (no app do Instagram → Configurações → Tipo de conta). É grátis.
2. **Vincular essa conta a uma Página do Facebook** (pode ser uma página nova só pra isso).
3. Criar um app em https://developers.facebook.com/ → adicionar o produto **Instagram Graph API**.
4. Gerar um **Long-Lived Access Token** com os escopos: `instagram_basic`, `pages_show_list`, `business_management`.
5. Pegar o **Instagram Business Account ID** (via Graph Explorer: `me/accounts` → `instagram_business_account`).

Você me entrega 2 valores no final:
- `INSTAGRAM_ACCESS_TOKEN` (long-lived, dura 60 dias)
- `INSTAGRAM_BUSINESS_ACCOUNT_ID`

---

## O que eu vou construir

### 1. Ativar Lovable Cloud
Necessário pra rodar a edge function que protege o token (token nunca vai pro browser).

### 2. Edge function `get-instagram-posts`
- Endpoint público (sem auth) que chama:
  `GET https://graph.facebook.com/v21.0/{IG_BUSINESS_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=6&access_token={TOKEN}`
- Retorna JSON limpo com os 6 posts mais recentes.
- Cache de 1h (header `Cache-Control: s-maxage=3600`) pra não estourar limite da API.
- Trata erros (token expirado, conta sem mídia) retornando array vazio pro front não quebrar.

### 3. Atualizar `src/components/InstagramSection.tsx`
- Buscar posts via React Query (`useQuery`) chamando a edge function.
- Renderizar grid de 6 posts reais (foto/thumbnail de vídeo) mantendo o mesmo layout (`grid-cols-6` desktop, `grid-cols-3` mobile, aspect-square, hover com coração e dark-green/55).
- Cada card linka pro `permalink` do post no Instagram (não mais pro perfil).
- Fallback: se a API falhar ou ainda não tiver token, mantém os 6 gradientes atuais como placeholder.
- Loading state suave (skeleton com mesmo gradiente do brand).

### 4. Renovação do token
Token long-lived dura 60 dias. Opções:
- **Manual**: você me avisa quando faltar 1 semana e eu te passo o link do Graph Explorer pra gerar outro. Simples.
- **Automática (recomendada depois)**: criar uma cron edge function que chama `GET /refresh_access_token` toda semana. Posso adicionar num passo seguinte.

---

## Detalhes técnicos

**Secrets (Lovable Cloud):**
- `INSTAGRAM_ACCESS_TOKEN`
- `INSTAGRAM_BUSINESS_ACCOUNT_ID`

**Arquivos:**
- `supabase/functions/get-instagram-posts/index.ts` (novo)
- `src/components/InstagramSection.tsx` (modificado)

**Limites Meta:** 200 calls/hora por usuário. Com cache de 1h, ficamos folgados.

**Privacidade:** só posts públicos da conta business são retornados. Stories/Reels privados não aparecem.

---

## Próximo passo

Confirma que quer seguir por esse caminho que eu:
1. Ativo a Lovable Cloud
2. Crio a edge function e o componente
3. Te peço os 2 secrets (`INSTAGRAM_ACCESS_TOKEN` e `INSTAGRAM_BUSINESS_ACCOUNT_ID`) via formulário seguro

Se a conta `@aureajewels.18k` ainda for **pessoal**, me avisa — primeiro precisa virar Business no app do Instagram, senão a API não retorna nada.
