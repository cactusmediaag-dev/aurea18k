

# Roadmap — Aurea Jewels: Do desenvolvimento ao ar

## Estado atual

| Item | Status |
|------|--------|
| Loja Shopify | ✅ Claimed (hd5ps3-wc) |
| Produtos no Shopify | ⚠️ Apenas 3 produtos |
| Homepage com seções | ✅ Funcional |
| Carrinho + Checkout Shopify | ✅ Implementado |
| Produto individual (`/product/:handle`) | ✅ Implementado |
| Páginas institucionais (FAQ, About, Contact, etc.) | ✅ Criadas |
| Publicação | ✅ Publicado em aurea18k.lovable.app |
| Domínio personalizado | ❌ Não configurado |
| Páginas de coleções (`/collections/*`) | ❌ Não existem (links do menu quebrados) |
| Instagram Feed (API real) | ❌ Placeholder com gradientes |
| Busca de produtos | ❌ Ícone sem funcionalidade |
| Track Order | ❌ Link no footer sem página |

---

## Roadmap por prioridade

### FASE 1 — Crítico para ir ao ar

**1. Criar página de coleções/listagem de produtos**
- Rota `/collections/:collectionHandle` que filtra produtos do Shopify
- Rota `/collections/all` que mostra todos os produtos
- Isso resolve todos os links quebrados do mega menu (Women, Men, Kids, New Arrivals, Best Sellers, Bundles, Gift Ideas)

**2. Conectar domínio personalizado (aurea18k.com)**
- Em Project Settings → Domains, adicionar o domínio
- Configurar registros DNS (A record → 185.158.133.1, TXT → verificação)
- Aguardar propagação DNS e SSL automático

**3. Catálogo de produtos no Shopify**
- Com apenas 3 produtos, a loja ficará vazia
- Criar os produtos restantes via Shopify Admin ou via chat
- Organizar por coleções/tags no Shopify (women, men, kids, best-sellers, etc.)

### FASE 2 — Funcionalidades importantes

**4. Funcionalidade de busca**
- O ícone de busca no header não faz nada
- Implementar modal/overlay de busca usando a Storefront API com query

**5. Instagram Feed real**
- Atualmente usa placeholders com gradientes
- Integrar via Instagram Basic Display API ou conector
- Exibir posts reais de @aureajewels.18k

**6. Remover/corrigir link "Track Your Order"**
- Link no footer aponta para `/track-order` que não existe
- Opções: remover o link, criar página com instruções, ou integrar com serviço de rastreio

### FASE 3 — Polimento

**7. SEO e Meta Tags**
- Adicionar meta title, description e Open Graph em cada página
- Favicon personalizado da Aurea

**8. Verificação mobile completa**
- Testar todo o fluxo: navegação → produto → carrinho → checkout
- Garantir que o mega menu funciona bem em todos os tamanhos de tela

**9. Performance e imagens**
- Lazy loading nas imagens de produtos
- Otimizar carregamento de fontes (Cormorant Garamond + Jost)

---

## Resumo de ações imediatas

```text
Prioridade    O quê                              Quem faz
─────────────────────────────────────────────────────────
  1           Página de coleções                  Lovable (código)
  2           Domínio aurea18k.com                Você (DNS) + Lovable (config)
  3           Criar produtos no Shopify           Você (Shopify Admin)
  4           Busca funcional                     Lovable (código)
  5           Instagram feed real                 Lovable (código) + API key
  6           Fix "Track Your Order"              Lovable (código)
```

Quer que eu comece pela **Fase 1** — criando a página de coleções e resolvendo os links quebrados do menu?

