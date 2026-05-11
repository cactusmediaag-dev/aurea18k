# Tamanho do banner — faixa do header da categoria

## Medida real da faixa atual

A "faixinha" no topo da página (entre as duas linhas douradas, contendo `AUREA JEWELS` + nome da categoria) tem hoje, no CSS de `Collection.tsx`:

```text
<div className="text-center py-14 border-b border-gold/15">
```

- **Largura:** 100% da viewport (full-width, sem `max-w`)
- **Altura renderizada:** `py-14` = 56px topo + 56px base = **112px de padding** + conteúdo (label ~18px + título ~50px) ≈ **~180–200px** no desktop
- **Aspect ratio resultante:** em tela cheia (1920px) ≈ **~9.6 : 1** (1920 × 200)

## Especificação final do arquivo de banner

Para ficar nítido em telas Retina e cobrir até 2560px de largura sem perder qualidade, criar os arquivos em **resolução 2x**:

| Item | Valor |
|---|---|
| **Dimensão do arquivo** | **2400 × 280 px** (ratio ~8.6:1) |
| **Formato** | JPG, qualidade 80, EXIF removido (~150–250 KB) |
| **Conteúdo** | Apenas imagem — **sem texto** |
| **Área segura** | Manter foco visual nos 60% centrais (corte lateral em telas largas) |
| **Renderização no site** | Full-width, `object-cover`, altura travada em `~200px` desktop / `~120px` mobile (substitui exatamente a faixinha atual, mantendo o mesmo "encaixe" entre as linhas douradas) |

> Observação: o usuário sugeriu "2400 × 300". Vou usar **2400 × 280** (ratio mais próximo do que a faixa renderiza hoje). Se preferir 2400×300, também funciona — a diferença é mínima e o `object-cover` ajusta.

## Implementação no código (Collection.tsx)

Substituir o bloco do banner por uma altura fixa que replica a faixa:

```tsx
<div className="w-full overflow-hidden border-y border-gold/15 h-[200px] max-md:h-[140px] max-sm:h-[110px]">
  <img src={banner} alt={title} className="w-full h-full object-cover block" loading="eager" fetchPriority="high" />
</div>
```

Assim qualquer banner que você criar em **2400×280** vai encaixar perfeitamente na mesma altura da faixa "AUREA JEWELS / All Jewelry" atual.

## Checklist final de banners faltando (28 arquivos — todos 2400×280)

**All Jewelry**
- [ ] `banner-all-jewelry.jpg`

**Women's (9)**
- [ ] `banner-womens-rings.jpg`
- [ ] `banner-womens-earrings.jpg`
- [ ] `banner-womens-necklaces.jpg`
- [ ] `banner-womens-bracelets.jpg`
- [ ] `banner-womens-chokers.jpg`
- [ ] `banner-everyday-essentials.jpg`
- [ ] `banner-statement-pieces.jpg`
- [ ] `banner-minimal-collection.jpg`
- [ ] `banner-layering-pieces.jpg`

**Men's (7)**
- [ ] `banner-mens-rings.jpg`
- [ ] `banner-mens-chains.jpg`
- [ ] `banner-mens-bracelets.jpg`
- [ ] `banner-mens-stud-earrings.jpg`
- [ ] `banner-mens-scapular-necklaces.jpg`
- [ ] `banner-minimal-men.jpg`
- [ ] `banner-classic-collection.jpg`

**Kids (5)**
- [ ] `banner-kids-earrings.jpg`
- [ ] `banner-kids-necklaces.jpg`
- [ ] `banner-kids-bracelets.jpg`
- [ ] `banner-kids-chokers.jpg`
- [ ] `banner-hypoallergenic-kids.jpg`

**Collections / Sidebar direita (5)**
- [ ] `banner-trending-now.jpg`
- [ ] `banner-under-50.jpg`
- [ ] `banner-limited-drop.jpg`
- [ ] `banner-gift-ready.jpg`
- [ ] `banner-his-hers-sets.jpg`

## O que vou fazer ao implementar

1. Travar a altura do banner em `Collection.tsx` para **200px desktop / 140px tablet / 110px mobile** (replica a faixa atual).
2. Mapear cada handle no `getCollectionBanner()` para o arquivo correspondente.
3. Manter `loading="eager"` + `fetchPriority="high"` (LCP).
4. Quando você subir os arquivos em `src/assets/`, é só me avisar que eu ligo cada um.
