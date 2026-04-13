
Objetivo: corrigir o fluxo de checkout para que o botão do site sempre abra o checkout real da Shopify, e ajustar a configuração de domínio para não haver conflito entre Lovable e Shopify.

Diagnóstico já confirmado:
- O carrinho está sendo criado corretamente via Storefront API.
- A Shopify já está retornando uma `checkoutUrl`.
- Hoje essa URL vem como `https://aurea18k.com/cart/c/...`.
- Só que `aurea18k.com` está apontado para o Lovable no storefront, então essa rota cai no app do Lovable em vez de cair no checkout da Shopify.
- Resultado: página vazia / 404 / tela de setup, mesmo com o checkout em si tendo sido criado corretamente.

Plano de correção

1. Corrigir a estratégia de domínio
- Separar claramente os hosts:
  - `aurea18k.com` e `www.aurea18k.com` = storefront no Lovable
  - `checkout.aurea18k.com` (ou `shop.aurea18k.com`) = domínio público da Shopify para checkout
- Não usar o mesmo host raiz (`aurea18k.com`) nas duas plataformas ao mesmo tempo.

2. Configurar o domínio correto no Shopify
- No Shopify Admin: `Settings > Domains`
- Conectar um subdomínio novo, por exemplo `checkout.aurea18k.com`
- No DNS do domínio, criar:
  - `CNAME checkout -> shops.myshopify.com`
- Se a Shopify pedir verificação extra, adicionar também o TXT que ela gerar.
- Depois marcar esse subdomínio como domínio principal do target “online store” no Shopify.
- O `hd5ps3-wc.myshopify.com` continua existindo como domínio permanente interno da loja; ele não é o domínio bonito do cliente.

3. Ajustar o frontend para o checkout
- Manter o fluxo atual correto via `cartCreate` / `checkoutUrl`.
- Centralizar a abertura do checkout para validar a URL antes de abrir.
- Se a URL ainda vier com o domínio errado ou estiver apontando para um host do Lovable, exibir um erro claro em vez de abrir uma página vazia.
- Opcionalmente deixar o código preparado para um host de checkout dedicado, evitando nova quebra se o domínio mudar.

4. Revisar toda a jornada de compra
- Produto → add to cart
- Cart drawer → checkout
- Retorno do checkout → sync do carrinho
- Validar comportamento tanto em preview quanto no domínio publicado

5. Entrega prática para você
- Deixar o site abrindo apenas checkout válido da Shopify
- Te passar o checklist final exato de configuração no Shopify/DNS
- Confirmar qual URL final deve aparecer ao cliente, por exemplo:
  - `https://checkout.aurea18k.com/cart/c/...`

Checklist de configuração no Shopify
- [ ] Abrir `Shopify Admin > Settings > Domains`
- [ ] Clicar em `Connect existing domain`
- [ ] Informar `checkout.aurea18k.com`
- [ ] No DNS, criar `CNAME checkout -> shops.myshopify.com`
- [ ] Se solicitado, criar o TXT de verificação da Shopify
- [ ] Aguardar validação
- [ ] Definir `checkout.aurea18k.com` como domínio principal do target da loja online
- [ ] Manter `aurea18k.com` no Lovable
- [ ] Não apontar o domínio raiz para Shopify se ele já aponta para o Lovable

Detalhes técnicos
- O problema não está no `cartCreate`; a evidência mostra resposta 200 com checkout criado.
- O problema está no host da URL de checkout.
- Hoje o código abre exatamente a URL que a Shopify retorna; isso está certo.
- O que precisa mudar é a configuração de domínio da Shopify para que ela retorne um host servido pela própria Shopify, não pelo Lovable.
- `hd5ps3-wc.myshopify.com` é o domínio permanente da loja e não costuma ser o domínio final de marca; o ideal é mascarar isso com um subdomínio seu.

Resultado esperado após a implementação
- O cliente navega em `aurea18k.com`
- Clica em checkout
- Nova aba abre em `checkout.aurea18k.com/...`
- O pagamento acontece na Shopify, sem página vazia e sem conflito de roteamento
