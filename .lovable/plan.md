# Ajuste: Empty state do Bundle Builder

## Mudança única

No arquivo `src/pages/BundleBuilder.tsx`, substituir a mensagem técnica do empty state (que menciona a tag `bundle-eligible` e Shopify) por uma mensagem amigável ao cliente final:

**De:**
> "No bundle-eligible products yet. Add the tag `bundle-eligible` to products in Shopify to make them appear here."

**Para:**
> "New bundle pieces coming soon. Check back shortly."

Tags são uso interno — cliente não precisa saber.

## Próximo passo (depende de você)

Pra popular o Bundle Builder, basta adicionar a tag `bundle-eligible` nos produtos. Você pode:
- **Fazer no Shopify admin** (Products → tag em massa)
- **Me pedir no chat** ("adiciona bundle-eligible em todos os anéis", etc.) que eu faço via tools
