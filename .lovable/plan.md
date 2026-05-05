# Melhorias no Bundle Builder

Quatro upgrades no `/bundle/:type` (arquivo principal: `src/pages/BundleBuilder.tsx`).

## 1. Economia em tempo real ("Você economiza R$ X")

Hoje o desconto só aparece quando o bundle está completo. Vou:
- Mostrar a linha **"Você economiza −R$ X"** desde a primeira peça selecionada (calculado proporcionalmente: `subtotal × discountPct/100`).
- Mostrar o **"Total com desconto"** sempre que houver pelo menos 1 item, mesmo incompleto, com label "estimado" enquanto não fecha o bundle.
- Destacar a economia em verde/dourado pra dar mais impacto visual.

## 2. Sugestão de upgrade de tier

Lógica nova no painel lateral:
- Se está em `/bundle/duo` (2 itens, 15%) e selecionou 2 → mostrar banner: **"Adicione +1 peça e ganhe 20% de desconto → ir pro The Stack"** com link pra `/bundle/stack` mantendo as peças já escolhidas (via state na navegação).
- Se está em `/bundle/stack` e selecionou 3 → **"Adicione +1 e ganhe 25% → ir pro The Full Set"**.
- Receber esse state em `BundleBuilder` (via `useLocation().state`) e pré-popular `selected` se vier de upgrade.

## 3. Filtros por categoria

Acima do grid de produtos:
- Chips/botões: **Todos · Anéis · Colares · Brincos · Pulseiras · Chains** (derivados de `product_type` ou tags da Shopify).
- Categoria detectada inspecionando `product.node.productType` (ou tags como `rings`, `necklaces`, `earrings`).
- Filtro client-side, mantém estado em `useState`.
- Contador ao lado de cada chip ("Anéis · 12").

## 4. Modal de preview antes de finalizar

Ao clicar em **"Add Bundle to Cart"** com bundle completo:
- Abre modal (shadcn `Dialog`) mostrando: thumbnails grandes das peças, título, variante, preço unitário, subtotal, desconto, total final, código aplicado.
- Dois botões: **"Editar bundle"** (fecha modal) e **"Confirmar e adicionar ao carrinho"** (chama `handleAddBundle` atual).
- Loading state no botão de confirmar enquanto submete.

## Arquivos afetados

- `src/pages/BundleBuilder.tsx` — toda a lógica nova (preview modal, filtros, economia em tempo real, upgrade banner, recepção de state).
- `src/lib/bundles.ts` — adicionar helper `getNextTier(current)` retornando o próximo bundle config.
- `src/components/BundleSection.tsx` — sem mudança (Links continuam iguais).

## Detalhes técnicos

- **Preview modal**: novo componente inline ou em `src/components/BundlePreviewDialog.tsx` usando `@/components/ui/dialog`.
- **State entre rotas**: `navigate('/bundle/stack', { state: { preselected: selected } })`. No mount, ler `location.state?.preselected` e setar.
- **Filtros**: derivar lista de categorias única dos produtos carregados; "Todos" como default.
- **Economia em tempo real**: simplificar — sempre exibe `discountAmount = subtotal × pct/100` e `total = subtotal − discountAmount`, mas com label "estimado" quando `!isComplete`.

## Não inclui

- Mudanças no Shopify (tags, codes) — já está tudo configurado.
- Mudança no fluxo de checkout — continua via `addBundle` do cartStore.
