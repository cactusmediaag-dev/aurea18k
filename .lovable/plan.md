## Objetivo

Em todas as páginas de coleção/categoria (`/collections/:handle`), carregar **todos** os produtos da tag correspondente via **infinite scroll automático**, em lotes de **40**, sem paginação numerada. A Home e a página índice `/collections` ficam de fora.

## Escopo

- **Arquivo afetado:** `src/pages/Collection.tsx` (única página que renderiza produtos de uma categoria — cobre womens, mens, kids, best-sellers, gift-ideas, bundles-sets, new-arrivals, todas as subcategorias e a `all`).
- **Fora do escopo:** Home (`/`), `/collections` (índice de categorias), Bundle Builder, página de produto.

## Como vai funcionar

1. Trocar `useQuery` por **`useInfiniteQuery`** do React Query.
2. Atualizar a `PRODUCTS_QUERY` GraphQL pra usar cursor da Shopify Storefront API:
   - Adicionar variável `$after: String`.
   - Pedir `pageInfo { hasNextPage endCursor }` junto com `edges`.
   - `first: 40` por lote.
3. `getNextPageParam` retorna `endCursor` quando `hasNextPage = true`, senão `undefined` (para o React Query).
4. **Sentinel + IntersectionObserver:** um `<div ref={loadMoreRef}>` invisível logo abaixo do grid. Quando entra no viewport, dispara `fetchNextPage()` automaticamente.
5. Achatar todas as `pages` num único array pra renderizar no grid existente (sem mexer no visual dos cards).
6. Estados visuais:
   - Loading inicial: spinner atual.
   - Loading de próximo lote: spinner discreto centralizado abaixo do grid.
   - Fim da lista: nada (sem mensagem) — apenas para de carregar.
7. Cache key do React Query: `['collection', handle]` (mantido), com paginação interna gerenciada pelo `useInfiniteQuery`.

## Detalhes técnicos

```text
useInfiniteQuery({
  queryKey: ['collection', handle],
  queryFn: ({ pageParam }) => storefrontApiRequest(PRODUCTS_QUERY, {
    first: 40,
    query,
    after: pageParam ?? null,
  }),
  getNextPageParam: (lastPage) => {
    const pageInfo = lastPage?.data?.products?.pageInfo;
    return pageInfo?.hasNextPage ? pageInfo.endCursor : undefined;
  },
  initialPageParam: null,
})
```

- `IntersectionObserver` com `rootMargin: '400px'` pra começar a carregar antes do usuário bater no fim (scroll mais fluido).
- Guard: só chamar `fetchNextPage()` se `hasNextPage && !isFetchingNextPage`.
- Cleanup do observer no `useEffect` return.

## Validação

- Abrir `/collections/gift-ideas` (154 produtos) → rolar até o fim → conferir que carrega em lotes até mostrar todos.
- Testar `/collections/womens` (query agrupada com `OR`) pra garantir que cursor funciona com queries compostas.
- Testar categoria pequena (< 40 produtos) pra confirmar que não tenta carregar mais.
- Confirmar que a Home e `/collections` não foram afetadas.

## Risco

A Shopify Storefront API tem custo de query — `first: 40` com imagens/variants está bem dentro do limite. Sem mudanças no backend.