# Aurea Jewels — Documentação Completa do Projeto

> Documento técnico e visual de referência do site **aurea18k.com**.
> Versão: julho/2026 · Stack: React + Vite + Tailwind + Shopify + Lovable Cloud

---

## 1. Visão Geral

**Aurea Jewels** é um e-commerce de joias folheadas em ouro 18K, com foco em elegância moderna, durabilidade e uso diário. O site foi construído no **Lovable**, integrado ao **Shopify** (catálogo, checkout, clientes, descontos) e ao **Lovable Cloud** (Supabase) para funções serverless (wishlist, pedidos, Meta CAPI, newsletter).

- **Domínio oficial:** https://aurea18k.com
- **Preview Lovable:** https://aurea18k.lovable.app
- **Store Shopify:** hd5ps3-wc.myshopify.com
- **Idioma padrão:** Inglês (US) · Comunicação interna: PT-BR
- **Moeda:** USD

---

## 2. Stack Tecnológica

### Frontend
| Camada | Tecnologia |
|---|---|
| Framework | **React 18** + **Vite 5** |
| Linguagem | **TypeScript 5** |
| Estilo | **Tailwind CSS v3** + design tokens semânticos (HSL) |
| Componentes UI | **shadcn/ui** (Radix primitives) |
| Roteamento | **react-router-dom v6** |
| Estado global | **Zustand** (com persistência em localStorage) |
| Data fetching | **@tanstack/react-query** (com `useInfiniteQuery` para paginação) |
| Ícones | **lucide-react** |
| Formulários | React Hook Form + Zod |

### Backend / Integrações
| Serviço | Uso |
|---|---|
| **Shopify Storefront API** | Catálogo, produtos, coleções, carrinho, checkout |
| **Shopify Admin API** | Clientes (wishlist), pedidos, descontos, webhooks |
| **Lovable Cloud (Supabase)** | Edge Functions (Deno) + secrets |
| **Meta Pixel + CAPI** | Rastreamento de eventos (browser + server-side) |
| **Microsoft Clarity** | Heatmaps, session replay (`wqj7gg2p3w`) |

### Edge Functions (`supabase/functions/`)
- `meta-capi` — Envio server-side de eventos para Meta
- `meta-config` — Retorna Pixel ID sem hardcode
- `shopify-order-webhook` — Captura eventos de compra (Purchase)
- `wishlist-register-customer` — Cria/atualiza cliente Shopify com tag `wishlist-subscriber`
- `customer-orders` — Busca pedidos do cliente via Admin API
- `subscribe-newsletter` — Captura de e-mail

---

## 3. Identidade Visual

### 3.1 Paleta de Cores (Design Tokens — `src/index.css`)

Todos os tokens são em **HSL**, aplicados globalmente. **Nunca usar cores hardcoded** (`text-white`, `bg-black`) em componentes.

| Token | HSL | Uso |
|---|---|---|
| `--cream` | `36 33% 93%` | Fundo secundário claro |
| `--cream-light` | `36 33% 96%` | Fundo principal do site |
| `--dark-green` | `140 30% 15%` | **Primary** — botões escuros, header, footer |
| `--dark-green-mid` | `140 28% 23%` | Hover de fundo escuro |
| `--gold` | `37 55% 50%` | **Accent** — CTAs, preços em destaque, detalhes |
| `--gold-light` | `37 55% 62%` | Texto sobre fundo verde, hover |
| `--gold-pale` | `40 60% 85%` | Backgrounds sutis dourados |
| `--wishlist-red` | `5 65% 38%` | Coração da wishlist (vermelho queimado) |
| `--warm-black` | `30 30% 7%` | Texto principal |
| `--warm-gray` | `30 8% 44%` | Texto secundário |
| Footer bg | `#422C19` | Marrom escuro fixo do rodapé |

**Border-radius:** `--radius: 0px` (design retilíneo, sem cantos arredondados)

### 3.2 Tipografia

| Fonte | Uso | Pesos |
|---|---|---|
| **Cormorant Garamond** (serif) | Títulos (h1–h6), destaques em itálico | 300, 400, 500, 600 |
| **Jost** (sans-serif) | Corpo de texto, botões, navegação | 300, 400, 500 |

Ambas carregadas via Google Fonts em `src/index.css`.

**Classes utilitárias:**
- `.aurea-section-label` — label em caixa alta, gold, `letter-spacing: 0.35em`
- `.aurea-section-title` — título serif, `clamp(34px, 4vw, 52px)`, com `<em>` em gold itálico
- `.btn-aurea-primary` — botão gold sólido
- `.btn-aurea-ghost` — botão outline claro
- `.btn-aurea-dark` — botão verde escuro full-width

### 3.3 Layout & Espaçamento
- Container max: **1400px** (`2xl`)
- Padding padrão de seção: `py-24 px-12` (`.aurea-section`)
- Grid responsivo mobile-first
- Animações customizadas: `marquee`, `heroFadeIn`, `goldShimmer`, `particleFloat`, `scrollPulse`

---

## 4. Estrutura de Páginas & Rotas

| Rota | Componente | Descrição |
|---|---|---|
| `/` | `Index` | Home (hero, categorias, bundles, best sellers, brand story…) |
| `/product/:handle` | `ProductDetail` | Página de produto com variantes, fotos, complete the look |
| `/collections` | `Collections` | Lista de todas as coleções |
| `/collections/:handle` | `Collection` | Coleção com **infinite scroll** (lotes de 40) |
| `/bundle/:type` | `BundleBuilder` | Builder de duo/stack/full com painel fixo mobile |
| `/account` | `Account` | Login/hub da conta |
| `/account/wishlist` | `AccountWishlist` | Produtos salvos |
| `/account/orders` | `AccountOrders` | Histórico de pedidos (Shopify Admin) |
| `/about` | `About` | Sobre a marca |
| `/about-aurea-jewels` | `AboutAureaJewels` | Página institucional SEO (Entity) |
| `/contact` | `Contact` | Contato |
| `/faq` | `FAQ` | Perguntas frequentes (com JSON-LD FAQPage) |
| `/reviews` | `Reviews` | Avaliações |
| `/shipping-returns` | `ShippingReturns` | Frete e devoluções |
| `/privacy-policy`, `/terms`, `/cookie-policy`, `/accessibility` | Legal | Páginas institucionais |
| `*` | `NotFound` | 404 |

---

## 5. Seções da Home (`src/pages/Index.tsx`)

Ordem exata renderizada:

1. **AnnouncementBar** — barra superior (frete grátis, promo)
2. **Navbar** — logo centralizada, menu, busca, wishlist, conta, carrinho
3. **HeroSection** — banners rotativos (6s), 2 versões (desktop 1920×1080 / mobile 1080×1350)
4. **TrustStrip** — badges: hipoalergênico, frete grátis, garantia
5. **CategoriesSection** — Shop by Category (contagem dinâmica via Storefront API)
6. **BundleSection** — Save More, Shine More (Duo / Stack / Full)
7. **BestSellersSection** — grid de best sellers
8. **BrandStorySection** — história da marca
9. **PromiseSection** — pilares da marca (qualidade, durabilidade)
10. **ReviewsSection** — depoimentos
11. **InstagramSection** — grid do Instagram
12. **EmailCaptureSection** — captura de e-mail para newsletter
13. **Footer** — bg `#422C19`, links, redes sociais

---

## 6. Recursos Funcionais

### 6.1 Carrinho & Checkout
- Estado persistido em `src/stores/cartStore.ts` (Zustand)
- `CartDrawer` lateral com miniaturas otimizadas
- `PreCheckoutModal` antes de redirecionar ao Shopify
- Sincronização via `useCartSync`

### 6.2 Wishlist
- Ícone de coração (`WishlistButton`) em todos os cards e PDP
- Cor ativa: `--wishlist-red` (`hsl(5 65% 38%)`)
- Estado em `wishlistStore.ts` com persistência
- `WishlistCaptureModal` coleta e-mail e cria cliente no Shopify com tag `wishlist-subscriber`
- Contador exibido no Navbar

### 6.3 Bundle Builder (`/bundle/:type`)
| Tipo | Peças | Desconto | Código |
|---|---|---|---|
| **The Duo** | 2 | 10% | `BUNDLEDUO10` |
| **The Stack** | 3 | 15% | `BUNDLESTACK15` |
| **The Full Set** | 4 | 20% | `BUNDLEFULL20` |

- Filtros: All, Rings, Earrings, Necklaces, Bracelets, Chains
- Elegibilidade via tag `bundle-eligible` no Shopify
- **Mobile:** painel fixo (bottom-sheet) aparece ao selecionar 1+ peça, com estado colapsado (thumbnail + total) e expandido (lista completa + Review Bundle)

### 6.4 Sistema de Tags Shopify (recomendações)

| Tag | Função | Prioridade |
|---|---|---|
| `match-00` … `match-99` | **Conjuntos intencionais** — peças pensadas juntas. Aparecem 1º em "Complete your look" | Tier 1 |
| `set-00` … `set-99` | **Família visual** — mesmo estilo/coleção. Fallback em "Você também pode gostar" | Tier 2 |
| `bundle-eligible` | Habilita no Bundle Builder | — |
| `best-seller` | Home "Mais vendidos" | — |
| `new-arrival` | "Novidades" | — |
| `gift-ideas` | "Ideias de presente" | — |
| `wishlist-subscriber` | Cliente que salvou item na wishlist | — |

Lógica em `src/lib/recommendations.ts`.

### 6.5 Otimização de Imagens
- `src/components/OptimizedImage.tsx` — `srcset` dinâmico via Shopify CDN
- `src/lib/imageOptimization.ts` — geração de tamanhos responsivos
- `loading="lazy"`, `decoding="async"`, `fetchpriority="high"` no hero
- Thumbnails em cards/carrinho: 120–200px
- Redução total dos assets locais de ~52MB → 5.3MB

### 6.6 Scroll & UX
- `ScrollToTop` — reseta scroll ao topo em toda mudança de rota
- **Infinite scroll** em `/collections/:handle` (IntersectionObserver, lotes de 40)

### 6.7 SEO Técnico & Entity SEO
- `src/components/Seo.tsx` — metadados dinâmicos por rota (title, description, canonical, OG, Twitter Card)
- **JSON-LD:** `JewelryStore`, `WebSite`, `Product`, `BreadcrumbList`, `FAQPage`, `AboutPage`
- `scripts/generate-sitemap.ts` — sitemap gerado no build com produtos vivos da Shopify
- `public/robots.txt` configurado
- Página institucional `/about-aurea-jewels` reforça associação de marca ao domínio

### 6.8 Rastreamento & Analytics
- **Meta Pixel** (browser) + **Conversions API** (server) via Edge Function `meta-capi`
- Eventos: `PageView`, `ViewContent`, `AddToCart`, `Search`, `AddToWishlist`, `Lead`, `InitiateCheckout`, `Purchase` (via webhook Shopify)
- Deduplicação por `event_id`
- **Microsoft Clarity** para heatmaps/replays (ID `wqj7gg2p3w`)

---

## 7. Estrutura de Diretórios

```
src/
├── components/          # Componentes reutilizáveis + seções da home
│   ├── ui/              # shadcn/ui primitives
│   ├── HeroSection.tsx, BundleSection.tsx, ...
│   ├── OptimizedImage.tsx, WishlistButton.tsx, Seo.tsx
│   └── PageLayout.tsx   # Wrapper padrão (AnnouncementBar + Navbar + Footer)
├── pages/               # Rotas
├── hooks/               # useProducts, useCartSync, useMetaPageView, useBundleEligibleProducts
├── stores/              # cartStore, wishlistStore, uiStore (Zustand)
├── lib/                 # shopify, bundles, recommendations, metaPixel, imageOptimization
├── integrations/supabase/  # client + types (auto-gerados — NÃO editar)
├── index.css            # Design tokens + utilities Aurea
└── App.tsx              # Rotas + providers
supabase/functions/      # Edge Functions Deno
scripts/                 # generate-sitemap.ts
public/                  # robots.txt, sitemap.xml, placeholder
GUIA-ATUALIZACAO-SITE.md # Manual leigo para atualizações estéticas
```

---

## 8. Fluxos de Dados

### Produto → Página
```
Shopify Storefront API → useProducts / useInfiniteQuery
  → React Query cache → Componentes (Collection, BestSellers, BundleBuilder)
```

### Wishlist
```
Botão coração → wishlistStore (persist)
  → WishlistCaptureModal → Edge Function wishlist-register-customer
  → Shopify Admin API (customer + tag)
```

### Compra (tracking)
```
Checkout Shopify → Webhook orders/paid
  → Edge Function shopify-order-webhook
  → Meta CAPI (Purchase event com hash de e-mail/telefone)
```

---

## 9. Regras Absolutas do Projeto

1. **Nunca** usar cores hardcoded — sempre tokens (`bg-primary`, `text-gold`, etc.)
2. **Nunca** editar `src/integrations/supabase/client.ts`, `types.ts` ou `.env` (auto-gerados)
3. **Produtos são gerenciados no Shopify**, não no Lovable
4. Toda mudança em cor deve ser feita em `src/index.css` (token) — não em componentes
5. Novas páginas devem incluir `<Seo />` e usar `<PageLayout>`
6. Imagens novas: passar por otimização (`OptimizedImage`), max 400KB
7. Ancoragem: toda navegação sobe pro topo automaticamente (`ScrollToTop`)
8. Border-radius do projeto = **0** (design retilíneo, elegante)

---

## 10. Documentos Relacionados

- **`GUIA-ATUALIZACAO-SITE.md`** — Manual passo-a-passo para usuário leigo (banners, textos, cores)
- **`README.md`** — Instruções técnicas de dev
- **Memórias do projeto** (`mem://`) — Regras persistentes usadas pelo Lovable AI

---

*Documento gerado em julho/2026 · Aurea Jewels · aurea18k.com*
