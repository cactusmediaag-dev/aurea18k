# Subir banner2 (desktop + mobile) no Hero

## O que vou fazer

1. **Copiar arquivos** dos uploads pra `src/assets/`:
   - `user-uploads://banner2-desktop.png.png` → `src/assets/banner2-desktop.png`
   - `user-uploads://banner2-mobile.png.png` → `src/assets/banner2-mobile.png`

2. **Editar `src/components/HeroSection.tsx`**:
   - Importar `banner2-desktop.png` e `banner2-mobile.png`
   - No segundo slide do array `slides`, trocar `image: null` por `image: { desktop: banner2Desktop, mobile: banner2Mobile }`
   - Resto do slide (tag, title, subtitle) fica igual — só adiciona a foto no lugar do gradiente verde

## Resultado

O hero vai alternar a cada 6s entre:
- Slide 1: banner1 (já existente) — "Wear the Golden Standard"
- Slide 2: banner2 (novo) — "Timeless Elegance Redefined"

Nada mais muda. Texto continua sobreposto com o mesmo gradiente escuro à esquerda pra leitura.
