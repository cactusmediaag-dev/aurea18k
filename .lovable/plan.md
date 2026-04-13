

# Auditoria e Correção da Estrutura de Páginas

## Problemas Encontrados

1. **Link "View All" no BestSellersSection** aponta para `href="#"` — deveria ir para `/collections/all`
2. **"Shop the Collection" no Hero** usa `href="#bestsellers"` (anchor tag `<a>`) — deveria ser `<Link>` para `/collections/all`
3. **"Our Story" no Hero** usa `href="#story"` — deveria ser `<Link>` para `/about`
4. **Botões do BundleSection** ("Build My Duo", etc.) não têm ação — deveriam linkar para `/collections/bundles-sets`
5. **`/collections` sem handle** renderiza Collection com `handle='all'` mas não tem página de categorias dedicada — o link "View Categories" no mega menu aponta para `/collections` que mostra todos os produtos em vez de uma página de categorias
6. **Index.tsx não usa PageLayout** — repete AnnouncementBar/Navbar/Footer manualmente em vez de usar o componente compartilhado
7. **Coleções usam filtro por tag (`tag:handle`)** — funciona, mas as coleções de alto nível (`womens`, `mens`, `kids`) precisam de queries mais amplas para agrupar subcoleções

## Plano de Correção

### 1. Corrigir links quebrados no Hero e BestSellers
- `HeroSection.tsx`: trocar `<a href="#bestsellers">` por `<Link to="/collections/all">` e `<a href="#story">` por `<Link to="/about">`
- `BestSellersSection.tsx`: trocar `<a href="#">View All</a>` por `<Link to="/collections/all">View All</Link>`

### 2. Conectar botões do BundleSection
- Cada botão "Build My Duo/Stack/Set" vira um `<Link>` para `/collections/bundles-sets`

### 3. Criar página de Categorias (`/collections` sem handle)
- Nova rota `/collections` (sem `:handle`) renderiza uma página com cards linkando para as categorias principais: Women, Men, Kids, Best Sellers, New Arrivals, Bundles & Sets, Gift Ideas
- Reutiliza o visual do CategoriesSection atual

### 4. Melhorar queries das coleções agrupadas
- `womens` → `tag:womens-earrings OR tag:womens-necklaces OR tag:womens-bracelets OR tag:womens-chokers`
- `mens` → query similar agrupando subcoleções
- `kids` → query similar
- Manter `tag:handle` para coleções individuais

### 5. Unificar Index com PageLayout
- `Index.tsx` passa a usar `<PageLayout>` em vez de repetir Navbar/Footer/CartDrawer

### 6. Validar todas as rotas no App.tsx
- Confirmar que cada link no Navbar, Footer e componentes internos tem rota correspondente no router

## Arquivos Modificados
- `src/components/HeroSection.tsx` — links do hero
- `src/components/BestSellersSection.tsx` — link "View All"
- `src/components/BundleSection.tsx` — botões de bundle
- `src/pages/Index.tsx` — usar PageLayout
- `src/pages/Collection.tsx` — queries agrupadas + lógica para `/collections` sem handle (página de categorias)
- `src/App.tsx` — separar rota `/collections` da rota `/collections/:handle` se necessário

