# Bundle & Save — Populado via Tags do Shopify

## Conceito

Cada um dos 3 cards (`The Duo`, `The Stack`, `The Full Set`) vira um **produto real do Shopify** com preço fixo e desconto embutido (já calculado no preço de venda vs. `compareAtPrice`). Pra popular/atualizar os bundles, você só precisa **adicionar uma tag** ao produto no Shopify — sem mexer no código.

### Saves atualizados
- The Duo → **Save 15%**
- The Stack → **Save 20%**
- The Full Set → **Save 25%**

## Como vai funcionar pra você (fluxo de uso)

1. Cria um produto no Shopify (ex: "Duo — Pearl Studs + Hoops")
2. Define o `price` (com desconto) e o `compareAtPrice` (preço cheio)
3. Adiciona **uma** das 3 tags:
   - `bundle-duo` → aparece no card "The Duo"
   - `bundle-stack` → aparece no card "The Stack"
   - `bundle-full` → aparece no card "The Full Set"
4. Pronto — o site puxa automaticamente

Se houver mais de um produto com a mesma tag, o site mostra o **primeiro** (ou um featured, baseado em outra tag — ver abaixo).

## Como vai funcionar no site

A `BundleSection.tsx` deixa de ser estática. Ela:

1. Busca via Storefront API produtos com `tag:bundle-duo OR tag:bundle-stack OR tag:bundle-full`
2. Agrupa por tipo de bundle
3. Renderiza os 3 cards usando os dados reais (imagem, título, preço, compareAtPrice)
4. O badge "Save X%" é **calculado automaticamente** a partir de `(compareAtPrice - price) / compareAtPrice`
5. Botão "Build My Duo/Stack/Set" → leva pra `/product/:handle` do bundle (página de produto normal, com Add to Cart)

### Layout dos cards (mantido)
- Visual idêntico ao atual (ícones, cores, badge "Most Popular" no Stack)
- Substituído: nome estático → `product.title`, preço estático → `product.price`, ícones genéricos → primeira imagem do produto (ou ícones se sem imagem)

## Estrutura técnica

### 1. Hook novo: `src/hooks/useBundles.ts`
Busca os 3 produtos bundle via Storefront API:
```
query: "tag:bundle-duo OR tag:bundle-stack OR tag:bundle-full"
```
Retorna `{ duo, stack, full }`.

### 2. Atualizar `STOREFRONT_QUERY` em `src/lib/shopify.ts`
Adicionar campo `compareAtPrice` no `priceRange.maxVariantPrice` (ou via variants) — necessário pra calcular o save %.

### 3. Refatorar `src/components/BundleSection.tsx`
- Remove o array hardcoded
- Usa `useBundles()`
- Loading state: skeleton dos 3 cards
- Empty state: se nenhum bundle existir com aquela tag, esconde o card (ou mostra placeholder "Em breve")
- Stack continua sempre com badge "Most Popular"

### 4. Convenção de tags (documentada)
| Tag | Card | Save |
|-----|------|------|
| `bundle-duo` | The Duo | 15% |
| `bundle-stack` | The Stack | 20% |
| `bundle-full` | The Full Set | 25% |

Opcional (se quiser controlar qual aparece quando há vários):
- `bundle-featured` → tag adicional pra forçar prioridade

## O que NÃO precisa fazer

- ❌ Não precisa criar Automatic Discount no Shopify (o desconto já está no preço do produto bundle)
- ❌ Não precisa Bundle Builder (cliente compra o bundle como um produto único)
- ❌ Não precisa mexer no carrinho (é um SKU normal)

## Próximos passos depois da implementação

Eu te entrego o código pronto. Aí você:
1. Cria os produtos bundle no Shopify (posso te ajudar a criar via chat usando `shopify--create_product` se quiser)
2. Adiciona a tag correspondente
3. Bundle aparece no site automaticamente

## Salvar na memória do projeto

Vou registrar a convenção de tags `bundle-duo` / `bundle-stack` / `bundle-full` + saves (15/20/25%) na memória pra futuras edições manterem consistência.
