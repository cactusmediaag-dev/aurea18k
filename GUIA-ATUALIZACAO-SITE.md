# 📘 Guia de Atualização do Site — Aurea Jewels

> Manual prático para atualizar **a estética** do site (banners, imagens, textos, cores) usando o **Lovable**, mesmo sem entender nada de código.
>
> Leia uma vez do começo ao fim antes de mexer em qualquer coisa. Depois, use como consulta.

---

## 1. Como funciona o Lovable (em 1 minuto)

O Lovable é um editor onde você **conversa** com uma IA (o "Lovable") e ela altera o site pra você.

A tela tem 3 partes principais:

- **Chat (esquerda):** onde você escreve o que quer mudar.
- **Preview (direita):** prévia ao vivo do site. Atualiza sozinho a cada mudança.
- **Botão "Publish" (canto superior direito):** publica as mudanças no site real (`aurea18k.com`). Enquanto não clicar nele, **nada vai pro ar**.

### Como pedir mudanças (jeito certo vs jeito errado)

❌ **Ruim:** "muda o banner"
✅ **Bom:** "trocar a imagem do banner 1 da home (desktop e mobile) por essas duas que estou anexando. Manter o texto atual."

❌ **Ruim:** "deixa mais bonito"
✅ **Bom:** "na seção 'Brand Story' da home, aumentar o tamanho do título e deixar o fundo um pouco mais escuro."

**Regra de ouro:** diga **o que**, **onde** e **como deve ficar**. Anexe imagens sempre que possível (arrasta direto no chat).

### Se algo der errado

No canto superior, tem um **histórico de versões**. Clique e escolha uma versão anterior pra restaurar. Nada é perdido pra sempre.

---

## 2. ✅ Checklist antes de começar qualquer alteração

- [ ] Imagens novas prontas, **nos tamanhos certos** (ver seções abaixo)
- [ ] Imagens otimizadas (máximo 400 KB cada — use [tinypng.com](https://tinypng.com) pra reduzir)
- [ ] Textos novos já escritos num bloco de notas
- [ ] Você sabe **qual seção** do site vai mudar
- [ ] Está logado no Lovable e vê o preview funcionando

---

## 3. 🖼️ Banners da Home (Hero)

A home tem **2 banners rotativos** no topo. Trocam sozinhos a cada 6 segundos.

### Tamanhos obrigatórios

Cada banner precisa de **2 versões** (uma pra computador, outra pra celular):

| Versão | Tamanho | Formato | Peso máximo |
|--------|---------|---------|-------------|
| Desktop | **1920×1080 px** (horizontal) | JPG | 400 KB |
| Mobile | **1080×1350 px** (vertical) | JPG | 300 KB |

> ⚠️ **Imagens fora desse tamanho vão ficar tortas, cortadas ou borradas.** Não pule essa etapa.

### Nomes dos arquivos atuais

- Banner 1: `banner1-desktop.jpg` e `banner1-mobile.jpg`
- Banner 2: `banner2-desktop.jpg` e `banner2-mobile.jpg`

### Prompt pronto pra trocar um banner

> Cole no chat do Lovable e **anexe as 2 imagens novas** (desktop + mobile):

```
Trocar o banner [1 ou 2] da home pelas imagens em anexo.
- Desktop: usar a imagem horizontal
- Mobile: usar a imagem vertical
Manter o texto, a tag e os botões iguais.
```

### Trocar texto de um banner

```
No banner [1 ou 2] da home, alterar:
- Tag (linha pequena no topo): "NOVO TEXTO DA TAG"
- Título: "NOVO TÍTULO"
- Subtítulo: "NOVO SUBTÍTULO"
- Botão principal: "TEXTO BOTÃO" → leva pra /collections/all
- Botão secundário: "TEXTO BOTÃO 2" → leva pra /about
```

### Adicionar um 3º banner

```
Adicionar um terceiro slide ao banner da home, usando as imagens em anexo (desktop e mobile).
Tag: "XXX"
Título: "XXX"
Subtítulo: "XXX"
Alinhamento: esquerda (ou direita)
```

---

## 4. 🖼️ Outras imagens do site

| Seção | Onde aparece | Tamanho ideal | Formato |
|---|---|---|---|
| **Categorias** (3 cards) | Home, meio da página | 800×1000 px | JPG |
| **Bundle Section** | Home, banner do combo | 1200×800 px | JPG |
| **Brand Story** | Home, "Nossa história" | 1000×1200 px | JPG |
| **Instagram** | Home, grade do Insta | 600×600 px (quadrada) | JPG |
| **Favicon** | Aba do navegador | 512×512 px | PNG |
| **Logo** | Topo do site | 400×120 px (transparente) | PNG |

### Prompt padrão pra trocar qualquer imagem

```
Trocar a imagem da seção [NOME DA SEÇÃO] da home pela imagem em anexo.
Manter o texto e o layout iguais.
```

---

## 5. 🎨 Cores, fontes e identidade visual

### Paleta atual

| Cor | Onde é usada |
|---|---|
| 🟢 **Verde escuro** (`primary`) | Botões, fundos escuros, footer |
| 🟡 **Dourado** (`gold`) | Detalhes, preços em destaque, ícones |
| 🟡 **Dourado claro** (`gold-light`) | Hover, textos sobre verde |
| 🤍 **Creme** (`cream`) | Fundos claros |
| ⚫ **Preto suave** (`foreground`) | Textos principais |

> Essas cores estão configuradas como **tokens** no sistema. Isso significa que se você trocar uma só, **o site inteiro atualiza junto**.

### Como pedir mudança de cor

✅ Bom:
```
Trocar o dourado do site por um tom mais claro/quente: #D4AF37
```
```
Deixar o verde do footer um pouco mais escuro
```

❌ Não peça: "põe o fundo dessa seção de branco puro" — isso quebra o sistema de cores. Sempre peça em cima dos tokens (verde, dourado, creme).

### Fontes atuais

- **Títulos:** Cormorant Garamond (serifada, elegante)
- **Texto comum:** Jost (sem serifa, moderna)

### Como trocar a fonte

```
Trocar a fonte dos títulos do site de Cormorant Garamond para [NOME DA FONTE].
Manter o Jost no corpo do texto.
```

> Use só fontes do [Google Fonts](https://fonts.google.com/) pra evitar problemas.

---

## 6. ✍️ Textos do site

### Onde fica cada texto

| Texto | Local |
|---|---|
| Banner anúncio (topo) | "Frete grátis acima de..." |
| Banners da home | Seção 3 deste guia |
| Categorias | Home, abaixo dos banners |
| Nossa história | Home, "Brand Story" |
| Rodapé | Final de todas as páginas |
| Página Sobre | `/about` |
| Página Contato | `/contact` |
| FAQ | `/faq` |

### Prompt pra trocar texto

```
Na seção [NOME DA SEÇÃO] da página [NOME DA PÁGINA], trocar o texto:
"texto antigo"
por
"texto novo"
Não mexer em mais nada.
```

### Trocar o anúncio do topo

```
Mudar o texto da barra de anúncio do topo para:
"NOVO TEXTO AQUI"
```

---

## 7. 🏷️ Produtos, tags e recomendações

Os produtos **NÃO são editados no Lovable**. São editados no **painel do Shopify** (`admin.shopify.com`).

### Tags que o site usa

Aplique essas tags nos produtos pelo Shopify:

| Tag | Pra que serve |
|---|---|
| `set-00`, `set-01`, `set-02`... | Coleções (família visual). Mesmo `set-XX` = mesma coleção. |
| `match-00`, `match-01`, `match-02`... | Conjuntos (peças que combinam entre si). Mesmo `match-XX` = aparecem juntas em "Complete o look". |
| `bundle-eligible` | Aparece no Bundle Builder (`/bundle/duo`, `/bundle/stack`, `/bundle/full`) |
| `best-seller` | Aparece em "Mais vendidos" |
| `new-arrival` | Aparece em "Novidades" |
| `gift-ideas` | Aparece em "Ideias de presente" |

> Um produto pode ter várias tags. Ex: `set-01`, `match-01`, `match-07`, `bundle-eligible`.

### Como funciona "Complete o look"

Na página de um produto, o site mostra automaticamente **outros produtos com a mesma tag `match-XX`** primeiro. Depois, os com mesmo `set-XX`. Não precisa configurar nada — só taggear certo no Shopify.

---

## 8. 🔎 SEO básico (Google)

O que aparece no Google quando alguém busca o site:

- **Título da aba/Google** (máx 60 caracteres)
- **Descrição** (máx 160 caracteres)
- **Favicon** (ícone da aba)

### Prompt pra atualizar

```
Atualizar o SEO da home:
- Título: "NOVO TÍTULO"
- Descrição: "NOVA DESCRIÇÃO"
```

### Trocar favicon ou logo

```
Trocar o favicon do site pela imagem em anexo (512x512 PNG).
```
```
Trocar a logo do topo pela imagem em anexo (PNG com fundo transparente).
```

---

## 9. 🚀 Publicar as mudanças

1. Confira tudo no **preview** (lado direito do Lovable).
2. Teste no celular também (botão de mudar viewport em cima do preview).
3. Clique em **Publish** (canto superior direito).
4. Aguarde 30 a 60 segundos.
5. Abra `https://aurea18k.com` em uma **aba anônima** (Ctrl+Shift+N) pra ver a versão real, sem cache.

### Não atualizou?

- Aperte **Ctrl+F5** (Windows) ou **Cmd+Shift+R** (Mac) pra forçar atualização.
- Espere 2 minutos e tente de novo.
- Se ainda não atualizou, chame o suporte técnico.

---

## 10. 📋 Modelos prontos de prompt (copia e cola)

### Trocar banner da home
```
Trocar o banner 1 da home pelas imagens em anexo (desktop 1920x1080 e mobile 1080x1350).
Manter o texto atual.
```

### Trocar cor do site
```
Trocar o dourado do site (`gold`) para o tom #COR_NOVA.
Aplicar em todos os lugares onde aparece.
```

### Adicionar seção de depoimentos
```
Adicionar uma nova seção de depoimentos na home, abaixo da seção Brand Story.
Mostrar 3 depoimentos em cards (foto redonda, nome, texto, 5 estrelas).
Usar o estilo visual do resto do site.
```

### Mudar texto do rodapé
```
No rodapé, trocar o texto "TEXTO ANTIGO" por "TEXTO NOVO".
Não mexer em links nem em layout.
```

### Trocar fonte dos títulos
```
Trocar a fonte dos títulos de Cormorant Garamond para Playfair Display.
Manter o Jost no corpo.
```

### Reordenar seções da home
```
Reordenar as seções da home na seguinte ordem:
1. Banner
2. Categorias
3. Mais vendidos
4. Bundle
5. Brand Story
6. Instagram
7. Reviews
```

### Esconder uma seção temporariamente
```
Esconder a seção "Instagram" da home (sem apagar — só comentar pra eu reativar depois).
```

---

## 11. ⛔ O que NÃO fazer

- ❌ Não peça mudanças em **carrinho, checkout ou pagamento** sem avisar o suporte técnico. Quebra fácil.
- ❌ Não mexa em arquivos que começam com `supabase/`, `client.ts`, `.env` ou `types.ts`. São automáticos.
- ❌ Não suba imagem **maior que 2 MB**. Vai deixar o site lento.
- ❌ Não publique sem **revisar no preview** antes.
- ❌ Não use cores "hardcoded" tipo `text-white`, `bg-black`. Sempre peça pelos tokens (verde, dourado, creme).
- ❌ Não delete seções sem ter certeza. **Esconda primeiro**, delete depois se confirmar.
- ❌ Não edite produtos pelo Lovable. **Use o Shopify.**

---

## 12. 🆘 Quando chamar o suporte técnico

Pare imediatamente e chame ajuda se:

- 🔴 Apareceu um **erro em vermelho** no Lovable que não some
- 🔴 O site `aurea18k.com` **saiu do ar** ou mostra tela em branco
- 🔴 **Checkout** parou de funcionar
- 🔴 **Pagamento** dando erro
- 🔴 Pediu uma mudança simples e o site quebrou em vários lugares
- 🔴 Dúvida sobre Shopify, domínio, e-mail ou backend

> Não tente "consertar pedindo mais coisa" pro Lovable. Geralmente piora. Chame o time técnico.

---

## 📌 Resumo em 5 regras

1. **Tamanho de imagem importa.** Sempre confira antes de subir.
2. **Diga o quê, onde e como.** Quanto mais específico, melhor.
3. **Revise no preview** antes de publicar.
4. **Tags de produto = Shopify**, não Lovable.
5. **Em dúvida, não publique.** Pergunta primeiro.

---

*Última atualização: junho/2026 · Dúvidas técnicas → time de desenvolvimento*
