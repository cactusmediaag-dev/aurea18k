
# Como linkar produtos a cada item de menu (Navbar + Categorias)

## Contexto: como o sistema funciona hoje

O site **não usa Collections nativas do Shopify** — usa um sistema baseado em **TAGS de produto**. Cada link do menu vai para `/collections/:handle`, e o handle vira uma tag que é buscada no Shopify via Storefront API.

```text
Click em "Women's Earrings" no Navbar
        ↓
Navega para /collections/womens-earrings
        ↓
Collection.tsx pega handle = "womens-earrings"
        ↓
Monta query Shopify: tag:womens-earrings
        ↓
Mostra todos os produtos que têm essa tag
```

Ou seja: **o "link" entre menu e produto é a TAG**. Basta adicionar a tag certa em cada produto no Shopify Admin e ele aparece automaticamente na página correspondente.

---

## Mapeamento completo: Menu → Tag necessária no produto

### Menu "Shop" (mega menu do Navbar)

**Women**
- Women's Earrings → tag `womens-earrings`
- Women's Necklaces → tag `womens-necklaces`
- Women's Bracelets → tag `womens-bracelets`
- Women's Chokers → tag `womens-chokers`
- Everyday Essentials → tag `everyday-essentials`
- Statement Pieces → tag `statement-pieces`
- Minimal Collection → tag `minimal-collection`
- Layering Pieces → tag `layering-pieces`

**Men**
- Men's Chains → tag `mens-chains`
- Men's Bracelets → tag `mens-bracelets`
- Men's Stud Earrings → tag `mens-stud-earrings`
- Men's Scapular Necklaces → tag `mens-scapular-necklaces`
- Minimal Men → tag `minimal-men`
- Classic Collection → tag `classic-collection`

**Kids**
- Kids Earrings → tag `kids-earrings`
- Kids Necklaces → tag `kids-necklaces`
- Kids Bracelets → tag `kids-bracelets`
- Kids Chokers → tag `kids-chokers`
- Hypoallergenic Kids → tag `hypoallergenic-kids`

**Collections**
- Best Sellers → tag `best-sellers`
- Trending Now → tag `trending-now`
- Under $50 → tag `under-50`
- Limited Drop → tag `limited-drop`
- Gift Ready → tag `gift-ready`
- His & Hers Sets → tag `his-hers-sets`

### Links diretos do Navbar
- New Arrivals → tag `new-arrivals`
- Best Sellers → tag `best-sellers`
- Bundles & Sets → tag `bundles-sets`
- Gift Ideas → tag `gift-ideas`

### Categorias agrupadas (homepage e /collections)
Esses são **agrupamentos automáticos** — não precisam de tag própria, eles juntam várias tags filhas:
- Women's Collection (`womens`) = junta TODAS as tags de Women acima
- Men's Collection (`mens`) = junta TODAS as tags de Men acima
- Kids Collection (`kids`) = junta TODAS as tags de Kids acima
- Shop All (`all`) = mostra todos os produtos

---

## Passo a passo — como adicionar um produto a um menu

### Opção A: Pelo Shopify Admin (recomendado, você fazendo manualmente)

1. Acesse o Shopify Admin → **Products**
2. Abra o produto que quer linkar
3. Role até o card **Tags** (lado direito)
4. Adicione a(s) tag(s) exata(s) da lista acima — escreva igualzinho, com hífen, minúsculo, em inglês
5. Clique em **Save**
6. Em ~30 segundos o produto já aparece na(s) página(s) correspondente(s) no site

**Exemplo prático**: Um brinco feminino best-seller que serve como presente:
- Tags: `womens-earrings`, `best-sellers`, `gift-ideas`, `everyday-essentials`
- Ele vai aparecer em 4 páginas + automaticamente dentro de "Women's Collection"

### Opção B: Em massa via CSV (para muitos produtos de uma vez)

1. Shopify Admin → Products → **Export** → CSV
2. Abra o CSV no Excel/Google Sheets
3. Coluna **Tags** — adicione as tags separadas por vírgula (ex: `womens-necklaces, best-sellers, gift-ideas`)
4. Salve e faça **Import** de volta no Shopify

### Opção C: Eu posso fazer pelo Lovable

Posso usar o conector Shopify para adicionar tags em produtos automaticamente. Você só me diz quais produtos vão em quais categorias, ou me dá uma lógica (ex: "todos os brincos da linha X são women's-earrings + best-sellers").

---

## Regras de tagueamento (importante)

1. **Múltiplas tags são aditivas**: um produto com tags `womens-earrings` + `gift-ideas` aparece nas duas páginas
2. **Nomes de tag são case-insensitive no Shopify**, mas use sempre minúsculo com hífen para evitar confusão
3. **Não use espaços** — use hífen (`best-sellers`, não `best sellers`)
4. **As páginas agrupadoras (`womens`, `mens`, `kids`) funcionam sozinhas** assim que existirem produtos nas tags filhas
5. **"All" não precisa de tag** — mostra tudo
6. **Coleções nativas do Shopify NÃO são usadas** — não adianta colocar produto em uma "Collection" do Admin, tem que ser por **TAG**

---

## Diagnóstico: como verificar se um menu está funcionando

1. Abra o site → clique no item de menu
2. Se aparecerem produtos = tag está correta e produtos têm essa tag
3. Se aparecer "No products found" = nenhum produto tem aquela tag (ou tag escrita diferente)
4. Verifique no Shopify Admin se a tag do produto bate **exatamente** com o handle da URL

---

## Próximos passos sugeridos

Posso fazer qualquer um desses agora (basta aprovar o plano e me dizer qual):

1. **Auditoria dos produtos**: usar a API do Shopify pra listar todos os produtos atuais e mostrar quais tags têm e quais menus estão vazios
2. **Tagueamento em massa**: você me passa a lógica e eu aplico via API em todos os produtos
3. **Imprimir um "mapa do site"**: documento com cada URL de menu + produtos atuais nela, pra você revisar
4. **Adicionar suporte a Collections nativas do Shopify** (alternativa a tags) — mais trabalho, mas algumas pessoas preferem pelo controle visual no Admin

Esse plano é apenas explicativo — não muda código por enquanto. Aprovando, eu executo a opção que você escolher.
