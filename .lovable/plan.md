## Objetivo
Adicionar o link "Men's Rings" no mega menu do header (seção Men), apontando para a coleção de anéis masculinos já existente no Shopify.

## Alteração
**Arquivo:** `src/components/Navbar.tsx`

No objeto `shopMenus.Men`, incluir como primeiro item:
```ts
{ label: "Men's Rings", href: '/collections/mens-rings' },
```

A lista de Men ficará:
1. Men's Rings (novo)
2. Men's Chains
3. Men's Bracelets
4. Men's Stud Earrings
5. Men's Scapular Necklaces
6. Minimal Men
7. Classic Collection

## Notas
- O link aparece tanto no mega menu desktop quanto no menu mobile (ambos renderizam a partir do mesmo `shopMenus`).
- A página `/collections/:handle` já existe e puxa produtos pela tag/handle do Shopify, então nenhuma rota nova é necessária.
- Sem mudanças visuais, de tipografia ou de espaçamento.
