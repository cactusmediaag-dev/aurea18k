# Bundle Builder — Cliente monta o conjunto e ganha desconto

## Conceito

Em vez de produtos-bundle prontos no Shopify, o cliente:
1. Clica em "Shop The Duo" na home
2. Vai pra uma página `/bundle/duo` (builder)
3. Escolhe N peças entre os produtos elegíveis
4. Vê o preço cheio + preço com desconto + economia em tempo real
5. Adiciona tudo ao carrinho de uma vez **com desconto aplicado**

## Regras de cada bundle

| Slot | Rota | Quantidade | Desconto |
|------|------|------------|----------|
| The Duo | `/bundle/duo` | 2 peças | 15% |
| The Stack | `/bundle/stack` | 3 peças | 20% |
| The Full Set | `/bundle/full` | 4 peças | 25% |

## Como o desconto é aplicado (a parte crítica)

Existe **uma decisão técnica importante** aqui. Tenho 2 caminhos viáveis:

### Caminho A — Discount Code automático no checkout (recomendado)
1. Crio 3 **Price Rules** no Shopify (BUNDLE_DUO_15, BUNDLE_STACK_20, BUNDLE_FULL_25)
2. Cada Price Rule exige quantidade mínima de itens com tag `bundle-eligible`
3. Crio 3 **Discount Codes** correspondentes (ex: `DUO15`, `STACK20`, `FULL25`)
4. No builder, quando o cliente clica "Add Bundle to Cart":
   - Adiciono os N itens ao carrinho Shopify
   - Aplico o discount code via Storefront API (`cartDiscountCodesUpdate`)
5. Desconto aparece automaticamente no checkout

✅ **Vantagem:** Desconto real, validado pelo Shopify, à prova de manipulação
✅ Aparece corretamente no checkout, na fatura, nas analytics
⚠️ Cliente verá o código aplicado no checkout (pode ser visto como "promo")

### Caminho B — Mostrar desconto no UI, sem desconto real no Shopify
- O builder mostra o preço com desconto
- Mas no carrinho/checkout, vai o preço cheio
- ❌ **Não recomendo** — quebra confiança do cliente

**Vou seguir com o Caminho A.**

## Quais produtos são elegíveis?

Você marca produtos no Shopify com a tag **`bundle-eligible`**. Só esses aparecem no builder.

Opcionalmente, dá pra restringir por categoria:
- `bundle-eligible` + `bundle-eligible-earrings` → só pode entrar em bundles do tipo brincos
- Mas pra começar simples: **uma única tag `bundle-eligible`** e o cliente pode misturar qualquer coisa

## Estrutura técnica

### 1. Price Rules + Discount Codes no Shopify
Crio via tools do Shopify:
- `BUNDLE_DUO_15` — 15% off, mínimo 2 itens com tag `bundle-eligible`
- `BUNDLE_STACK_20` — 20% off, mínimo 3 itens com tag `bundle-eligible`
- `BUNDLE_FULL_25` — 25% off, mínimo 4 itens com tag `bundle-eligible`

Cada um com `target_selection: entitled` apenas a produtos com a tag `bundle-eligible`.

### 2. Nova rota: `/bundle/:type`
Página `src/pages/BundleBuilder.tsx` com:
- Header explicando o bundle ("Pick 2 pieces, save 15%")
- Grid de produtos elegíveis (busca por `tag:bundle-eligible`)
- Cada produto tem botão "Add to Bundle" (toggle)
- Painel lateral fixo (sticky):
  - Slots visuais: `[1] [2]` mostrando peças escolhidas (com X pra remover)
  - Subtotal cheio (riscado)
  - Total com desconto
  - Economia (verde)
  - Progresso: "Pick 1 more to unlock 15% off"
  - Botão "Add Bundle to Cart" (disabled até completar)

### 3. Suporte a discount code no carrinho
Atualizar `src/lib/shopify.ts` e `src/stores/cartStore.ts`:
- Nova mutation `cartDiscountCodesUpdate`
- Action `applyDiscountCode(code: string)` no cartStore
- Quando o builder finaliza, chama: adiciona itens + aplica código

### 4. Atualizar `BundleSection.tsx`
- Remove a busca por produtos-bundle prontos
- Volta pra layout estático elegante (como era antes)
- Cards linkam pra `/bundle/duo`, `/bundle/stack`, `/bundle/full`
- Saves: 15% / 20% / 25% (atualizados)
- Variante de seleção: peças escolhidas mostradas como ícones (visual atual)

### 5. Limpar código antigo
- Remover `useBundles.ts` (não vai mais buscar produtos com tag `bundle-duo` etc)
- Remover do `STOREFRONT_QUERY` o `compareAtPrice` se não for usado em outro lugar — **manter**, é útil

## Como você popula (fluxo de uso)

1. No Shopify admin, em cada produto que pode entrar em bundles, adicione a tag **`bundle-eligible`**
2. Pronto — esses produtos aparecerão automaticamente no builder
3. As Price Rules ficam permanentes; não precisa criar nada de novo

## Edge cases tratados

- Cliente tenta finalizar com peças incompletas → botão disabled
- Cliente já tinha itens no carrinho → bundle é adicionado por cima, código aplicado ao subtotal
- Produto fica out of stock → some do builder
- Mesma peça selecionada 2x (Duo de brincos iguais) → permitido (quantity=2)

## Pergunta antes de implementar

**Sobre a elegibilidade — começa simples ou separa por categoria?**

- **Simples:** Uma tag `bundle-eligible`, cliente mistura o que quiser
- **Por categoria:** Tags adicionais `bundle-cat-rings`, `bundle-cat-earrings` etc, e cada bundle pode ter regras específicas

Se não me responder, sigo com **simples** (recomendado pra primeira versão — você pode evoluir depois).
