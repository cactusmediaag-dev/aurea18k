## Problema

Os banners adicionados pesam **1.7–2.2 MB cada** (JPGs ~1774×887). Total ~15 MB. Mesmo com `loading="eager"`, o navegador demora segundos pra baixar — não é "instantâneo".

Banners afetados em `src/assets/`:

- `banner-bestsellers.jpg` (1.7 MB)
- `banner-bundles.jpg` (1.8 MB)
- `banner-gifts.jpg` (1.8 MB)
- `banner-kids.jpg` (2.1 MB)
- `banner-mens.jpg` (1.9 MB)
- `banner-newarrivals.jpg` (1.7 MB)
- `banner-womens.jpg` (1.8 MB)
- `about-hero.jpg` (2.2 MB)
- `about-brazil.jpg` e `about-craft.jpg` (~2 MB cada — usados em About)

Usados em: `Collection.tsx` (banner topo), `About.tsx` (hero + 2 sessões), `BrandStorySection.tsx`.

## Plano

### 1. Comprimir todos os banners para WebP em múltiplas larguras

Pra cada banner, gerar 3 versões em **WebP qualidade 78** (sem perda visível, 8–10× menor que JPG):

```text
banner-womens-800.webp    ~40–60 KB
banner-womens-1200.webp   ~80–120 KB
banner-womens-1800.webp   ~140–200 KB
```

Reduz cada banner de ~1.8 MB → ~90 KB no desktop e ~50 KB no mobile.

### 2. Trocar `<img>` por `<picture>` responsivo

Em `Collection.tsx` e `About.tsx`, usar `<picture>` com `srcset` + `sizes` para o navegador escolher a versão certa:

- `loading="eager"` + `fetchpriority="high"` (banners são LCP)
- `decoding="async"`
- `width`/`height` definidos (zero CLS — sem pulo de layout)

### 3. Preload do banner no `<head>`

Adicionar `<link rel="preload" as="image" imagesrcset="...">` dinâmico via React quando entra na página de coleção. O navegador começa a baixar antes do componente renderizar.

### 4. Manter JPG original como fallback

O `<picture>` inclui o JPG como fallback `<source>`. Browsers modernos (97%+) pegam WebP automaticamente; legados pegam JPG.

## Detalhes técnicos

- Conversão via **ImageMagick** (`-resize {w}x -quality 78 -strip`) — `-strip` remove EXIF
- WebP suportado em 97% dos navegadores
- Não deletar JPGs originais — ficam só como fallback (sem custo pra browsers modernos)

## Impacto esperado


| Métrica                  | Antes  | Depois |
| ------------------------ | ------ | ------ |
| Banner desktop (1200w)   | 1.8 MB | ~90 KB |
| Banner mobile (800w)     | 1.8 MB | ~50 KB |
| Download em 4G (~5 Mbps) | 2.9 s  | 0.15 s |
| LCP típico               | 3–4 s  | < 1 s  |


## Arquivos afetados

- `src/assets/banner-*-{800,1200,1800}.webp` (24 arquivos novos)
- `src/assets/about-hero-*.webp`, `about-brazil-*.webp`, `about-craft-*.webp` (9 novos)
- `src/pages/Collection.tsx` — img → picture com srcset + preload
- `src/pages/About.tsx` — mesmo tratamento nas 3 imagens
- `src/components/BrandStorySection.tsx` — picture com srcset  
  
EXISTEM MAIS DE 30 BANNERS NO SITE - OTIMIZE TUDO!!!!!!!!!!!!!!!!