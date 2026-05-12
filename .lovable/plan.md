## Plano: Wishlist + Account

### Comportamento

**Wishlist (sem login obrigatório):**
- Ícone de coração em cada card de produto (Collections, Home, BestSellers, Bundle Builder) e na página de detalhe.
- Clique no coração: salva imediatamente no `localStorage` (funciona pra qualquer visitante anônimo).
- Coração no header com badge de contador, leva pra `/account/wishlist`.
- Animação suave (fill dourado) ao adicionar.

**Captura de email (cria customer no Shopify):**
- Na primeira vez que adiciona à wishlist, abre modal pedindo nome + email (opcional, com botão "Pular").
- Se preencher: chama edge function `wishlist-register-customer` que cria/atualiza customer no Shopify Admin API com tag `wishlist-subscriber` e marketing opt-in.
- Email salvo em `localStorage` pra não pedir de novo.

**Página /account:**
- `/account` — dashboard com saudação, link pra wishlist, "Meus pedidos" (lookup por email via Shopify), dados básicos.
- `/account/wishlist` — grid dos produtos salvos, botão remover, "Add to Cart".
- `/account/orders` — busca pedidos no Shopify pelo email salvo (Admin API).
- Sem senha: usuário se identifica pelo email salvo. Botão "Trocar email" limpa localStorage.

### Estrutura técnica

**Frontend (novo):**
- `src/stores/wishlistStore.ts` — Zustand com persist (localStorage). Métodos: `add(productId, handle)`, `remove`, `toggle`, `has`, `clear`, `customerEmail`, `setCustomer`.
- `src/components/WishlistButton.tsx` — botão coração reutilizável (variantes: card overlay, detail inline).
- `src/components/WishlistCaptureModal.tsx` — modal de captura de email na 1ª adição.
- `src/components/Navbar.tsx` — adicionar ícone Heart com badge.
- `src/pages/Account.tsx`, `src/pages/AccountWishlist.tsx`, `src/pages/AccountOrders.tsx`.
- Rotas no `App.tsx`: `/account`, `/account/wishlist`, `/account/orders`.
- Integrar `<WishlistButton>` em: `Collection.tsx`, `BestSellersSection.tsx`, `SuggestionCard.tsx`, `BundleBuilder.tsx`, `ProductDetail.tsx`.

**Backend (Lovable Cloud edge functions):**
- `wishlist-register-customer` — recebe `{email, firstName, lastName}`, chama Shopify Admin `POST /customers.json` com tag `wishlist-subscriber` + `accepts_marketing: true`. Se já existe (409), atualiza tags.
- `customer-orders` — recebe `{email}`, retorna pedidos via Admin `GET /customers/search.json?query=email:X` + `GET /customers/{id}/orders.json`.
- Usa secret `SHOPIFY_ACCESS_TOKEN` já existente.

**Wishlist no Shopify (opcional/leve):**
- Wishlist em si fica no localStorage (sem backend de produtos salvos por enquanto — simples, rápido, zero custo).
- O que vai pra Shopify é o **customer record** com tag `wishlist-subscriber` (assim você vê todos os interessados no admin Shopify e pode fazer email marketing pro Klaviyo/Shopify Email).

### Considerações

- localStorage é por dispositivo (limitação aceita do modelo "híbrido leve"). Se quiser sync cross-device no futuro, dá pra adicionar tabela `wishlists` no Lovable Cloud usando email como chave.
- Pedidos no /account são read-only via Admin API (lookup por email). Sem senha = sem proteção forte; mostramos só pedidos do email digitado/salvo. Aceitável pro modelo escolhido.
- Ícone de coração usa `lucide-react` `Heart` (outline) → `Heart fill` quando salvo, na cor `gold`.
