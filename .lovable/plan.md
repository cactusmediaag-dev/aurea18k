# Variantes: cor como bolinhas + imagem ancorada

## O que muda

### 1. Buscar imagem de cada variante na Shopify
Em `src/pages/ProductDetail.tsx`, na query `PRODUCT_BY_HANDLE_QUERY`, adicionar `image { url altText }` dentro de `variants.edges.node`. A Shopify já guarda a imagem ancorada à variante — só não estamos pedindo hoje.

### 2. Trocar imagem ao selecionar variante
No `setSelectedVariantIdx`, quando a variante tiver `image.url`, achar o índice correspondente em `images` e setar `selectedImage` automaticamente. Funciona pra qualquer opção (cor, tamanho, material) que tenha imagem ancorada — exatamente como o painel da Shopify configura.

### 3. Renderizar opção "Color" como bolinhas
Detectar se `option.name` é cor (`/^(cor|color|colour)$/i`). Se sim:
- Renderizar cada valor como círculo de ~36px com a cor de amostra
- Mapear nome → hex via tabela:
  ```
  green → #2D5A3D, black → #1a1a1a, purple → #7B4F9E,
  pink → #E8A0BF, gold → #D4AF37, silver → #C0C0C0,
  rose → #E8B4B8, white → #FAFAF7, blue → #2C5F8D,
  red → #B22222, ...
  ```
  Fallback: nome em lowercase como CSS color (cobre maioria), e cinza neutro se inválido.
- Selecionado: anel dourado em volta (border-2 + ring-1 offset gold) — mantém a mesma "lógica de contornado" atual
- Tooltip/aria-label com o nome da cor pra acessibilidade

Outras opções (Tamanho, Material, etc) continuam como botões de texto — sem mudança.

### 4. Onde isso aparece
- `ProductDetail.tsx` — página do produto (principal)

`BestSellersSection`/cards de listagem **não** mudam (mostram só thumbnail + Quick Add da primeira variante, sem seleção de cor).

## Detalhes técnicos

```text
variant click flow:
  user clica bolinha verde
    → setSelectedVariantIdx(idx)
    → useEffect: se variant.image existe,
       acha img em product.images cujo url === variant.image.url
       → setSelectedImage(matchIdx)
```

Helper novo `src/lib/colorSwatch.ts` com a tabela `name → hex` + função `getSwatchColor(name)`.

## Não muda

- Visual/copy do resto da página
- Add to cart, recomendações, breadcrumbs
- Cards de listagem
- Cadastro na Shopify (você continua subindo imagem por variante normalmente)
