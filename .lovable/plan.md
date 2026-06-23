
# Guia de Atualização Estética do Site Aurea Jewels

## Objetivo

Criar **um único documento** em Markdown (`GUIA-ATUALIZACAO-SITE.md`) na raiz do projeto, escrito em português claro e direto, pensado para alguém **sem nenhum conhecimento técnico** atualizar a estética do site usando o Lovable.

O arquivo pode ser aberto no Lovable, no GitHub, ou copiado pro Google Docs/Notion. Fica versionado junto com o código.

## Estrutura do documento

1. **Como funciona o Lovable (em 1 minuto)**
   - O que é o chat, o preview, o botão de publicar
   - Como pedir mudanças (exemplos de bons prompts vs prompts ruins)
   - Como reverter se algo der errado (histórico de versões)

2. **Checklist rápido antes de começar**
   - Ter as imagens prontas nos tamanhos certos
   - Ter os textos novos já escritos
   - Saber em qual seção vai mexer

3. **Banners da home (Hero)**
   - Onde aparecem (2 slides rotativos)
   - **Tamanhos exatos:**
     - Desktop: 1920×1080 px (JPG, até 400 KB)
     - Mobile: 1080×1350 px (JPG, até 300 KB)
   - Como nomear os arquivos
   - Prompt pronto pra colar no Lovable trocar o banner
   - Como mudar título, subtítulo, tag e botões de cada slide
   - Como adicionar um 3º slide

4. **Imagens das seções da home**
   - Categorias (3 cards) — 800×1000 px
   - Bundle Section — 1200×800 px
   - Brand Story — 1000×1200 px
   - Instagram — 600×600 px (quadradas)
   - Prompt pronto pra cada troca

5. **Cores, fontes e identidade visual**
   - Onde ficam (sem precisar abrir código): `src/index.css`
   - Lista das cores principais (verde, dourado, creme) com nome semântico
   - Como pedir: "trocar o dourado por X", "deixar o creme mais claro"
   - Fontes atuais (Cormorant Garamond + Jost) e como trocar
   - **Aviso:** nunca pedir cores hardcoded tipo "bg-white" — sempre pedir via token

6. **Textos do site (copy)**
   - Onde ficam os textos da home, sobre, footer
   - Como pedir alteração sem mexer em layout
   - Anúncio do topo (AnnouncementBar): frete grátis etc.

7. **Produtos, tags e recomendações**
   - Resumo das tags `set-XX` e `match-XX` (já decidido)
   - Tag `bundle-eligible` pro Bundle Builder
   - Que isso é feito no painel do Shopify, **não no Lovable**

8. **SEO básico (título, descrição, favicon)**
   - Onde aparece no Google
   - Como pedir mudança de meta title/description
   - Como trocar favicon e logo

9. **Publicar as mudanças**
   - Botão "Publish" canto superior direito
   - Verificar no domínio aurea18k.com
   - O que fazer se não atualizar (cache)

10. **Modelos prontos de prompt pra colar**
    - "Trocar banner 1 da home"
    - "Trocar cor dourada do site"
    - "Adicionar nova seção de depoimentos"
    - "Mudar texto do rodapé"
    - "Trocar fonte dos títulos"

11. **O que NÃO fazer**
    - Não mexer em arquivos `supabase/`, `client.ts`, `.env`
    - Não pedir mudanças no checkout/carrinho sem avisar
    - Não publicar sem revisar no preview
    - Não subir imagem gigante (>2MB)

12. **Quando chamar reforço (suporte técnico)**
    - Erros que aparecem em vermelho
    - Site fora do ar
    - Pagamento/checkout quebrado

## Detalhes técnicos

- Arquivo único: `GUIA-ATUALIZACAO-SITE.md` na raiz do projeto.
- Markdown puro, sem dependências, sem imagens embutidas (referencia caminhos do projeto).
- Tamanhos de banner vêm dos componentes reais: `HeroSection.tsx` usa `banner1-desktop.jpg` / `banner1-mobile.jpg` etc.
- Lista de cores extraída de `src/index.css` (tokens semânticos verde/dourado/creme).
- Tom: passo a passo, sem jargão, com exemplos de prompt prontos pra copiar e colar.
- Tamanho estimado: ~400-600 linhas de Markdown.

## O que NÃO entra

- Nada de código novo, nada de mudança em componentes.
- Não é deploy de página `/admin` nem tutorial visual dentro do app — é só o documento.
- Não cobre operação do Shopify a fundo (só o que cruza com tags/produtos).

Confirma que quer só esse `.md` na raiz? Se preferir que eu também gere uma versão `.docx` pra mandar por email/WhatsApp, me avisa que adiciono o passo.
