

# Correção do Checkout — Remover bloqueio desnecessário

## Problema
O código atual tem duas lógicas conflitantes:
1. `normalizeCheckoutUrl` — reescreve corretamente o host da URL de checkout para `hd5ps3-wc.myshopify.com`
2. `hasInvalidCheckoutDomain` / `checkoutDomainInvalid` — bloqueia o botão de checkout e mostra um toast de erro pedindo para configurar um subdomínio

A lógica 1 já resolve o problema. A lógica 2 impede que ela funcione.

## Plano

### 1. Simplificar `normalizeCheckoutUrl` em `src/lib/shopify.ts`
- Sempre reescrever o hostname para `hd5ps3-wc.myshopify.com` quando não for um host Shopify válido (já faz isso)
- Remover a constante `CHECKOUT_CUSTOM_DOMAIN` (não é mais necessária)
- Remover `hasInvalidCheckoutDomain` (não será mais usada)

### 2. Limpar `src/stores/cartStore.ts`
- Remover o campo `checkoutDomainInvalid` do estado
- Remover referências a `hasInvalidCheckoutDomain`
- Manter `normalizeCheckoutUrl` no `getCheckoutUrl` e `syncCart`

### 3. Limpar `src/components/CartDrawer.tsx`
- Remover a verificação `checkoutDomainInvalid` do `handleCheckout`
- Remover o toast de erro sobre configuração de domínio
- O botão de checkout passa a abrir direto a URL normalizada

## Resultado
- Clique em checkout → abre `https://hd5ps3-wc.myshopify.com/cart/c/...?channel=online_store` em nova aba
- Checkout funciona imediatamente, sem configuração de DNS
- O cliente vê o checkout da Shopify e finaliza a compra

## Detalhes técnicos
- Nenhuma configuração externa necessária (sem DNS, sem subdomínio)
- O domínio `.myshopify.com` é sempre servido pela Shopify
- O parâmetro `channel=online_store` garante que o checkout não pede senha

