## Objetivo
Substituir o logotipo textual "AUREA / Jewels · 18K Gold Plated" pelo arquivo `logo-horizontal.png` enviado, em todos os locais onde aparece o logo genérico.

## Locais identificados
1. **Header (Navbar)** — `src/components/Navbar.tsx` (desktop + mobile, mesmo bloco de logo)
2. **Footer** — `src/components/Footer.tsx` (coluna da esquerda, bloco com "AUREA" + tagline)

> O `index.html` (favicon/og-image) não está incluído neste escopo — só o logo visual nos componentes.

## Passos

### 1. Copiar o asset
- `user-uploads://logo-horizontal.png` → `src/assets/logo-horizontal.png`

### 2. Navbar (`src/components/Navbar.tsx`)
- Importar: `import logo from '@/assets/logo-horizontal.png'`
- Substituir o bloco do logo (texto "AUREA" + sublinha "Jewels · 18K Gold Plated") por:
  ```tsx
  <Link to="/" className="block">
    <img src={logo} alt="Aurea Jewels" className="h-10 md:h-11 w-auto" />
  </Link>
  ```
- Altura: ~40px mobile / ~44px desktop, mantendo a altura do header (72px desktop / 64px mobile).

### 3. Footer (`src/components/Footer.tsx`)
- Importar o mesmo asset.
- Substituir o bloco `<div className="font-serif ...">AUREA</div>` + tagline por:
  ```tsx
  <img src={logo} alt="Aurea Jewels" className="h-12 w-auto mb-5 brightness-0 invert opacity-90" />
  ```
- O footer tem fundo escuro (`warm-black`) e o logo tem cores escuras (verde/dourado sobre branco). Aplicar `brightness-0 invert` para deixar branco, OU manter o logo colorido se contrastar bem. **Decisão:** manter colorido sem filtro, pois o dourado e o verde-claro ficam visíveis no fundo escuro. Caso fique ilegível, ajustar com `bg-cream-light/5 p-3 rounded` como container.

## Notas técnicas
- O PNG enviado tem fundo transparente (presumido — confirmar ao copiar). Se tiver fundo branco, considerar versão SVG futuramente.
- A tagline "Jewels · 18K Gold Plated" some do header (já está embutida no logo).
- Nenhuma mudança em rotas, links ou comportamento.

## Fora de escopo
- Favicon (`public/`), meta og-image em `index.html`, e qualquer página interna que renderize "AUREA" como texto decorativo (ex: hero sections) — só substituir onde funciona como logo do header/footer.