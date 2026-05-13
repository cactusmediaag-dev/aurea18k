# Ajuste dos descontos de Bundle

## Novos percentuais
- The Duo (2 peças) → **10%**
- The Stack (3 peças) → **15%**
- The Full Set (4 peças) → **20%**

## Mudanças no código (frontend)
1. **`src/lib/bundles.ts`** — atualizar `BUNDLE_CONFIGS`:
   - `duo`: discountPct `15 → 10`, discountCode `BUNDLEDUO15 → BUNDLEDUO10`, tagline "save 10%"
   - `stack`: discountPct `20 → 15`, discountCode `BUNDLESTACK20 → BUNDLESTACK15`, tagline "save 15%"
   - `full`: discountPct `25 → 20`, discountCode `BUNDLEFULL25 → BUNDLEFULL20`, tagline "save 20%"
2. Verificar/atualizar quaisquer textos hardcoded ("Save 15%", "20%", "25%") em `BundleSection.tsx`, `BundleBuilder.tsx` e afins (a maioria já lê do config — confirmar na hora).

## Mudanças no Shopify (back office)
Criar 3 price rules + discount codes via API (a infra antiga BUNDLEDUO15/STACK20/FULL25 fica órfã — opcionalmente removo depois pra não confundir):

| Código | Tipo | Valor | Mínimo de itens |
|---|---|---|---|
| `BUNDLEDUO10` | percentage | -10% | 2 |
| `BUNDLESTACK15` | percentage | -15% | 3 |
| `BUNDLEFULL20` | percentage | -20% | 4 |

Configuração de cada price rule:
- `customer_selection: all`
- `target_type: line_item`, `target_selection: all`
- `allocation_method: across`
- `once_per_customer: false`
- Sem data de expiração

> Observação: o Shopify Admin API não tem campo "mínimo de quantidade" direto em todos os planos via REST simples — o builder do site já garante a quantidade correta antes de aplicar o code, então o code funciona sem prerequisite. O cupom só é aplicado quando o cliente passa pelo Bundle Builder.

## Memória
Atualizar `mem://features/bundles.md` e o índice com os novos códigos e percentuais.

## Validação
- Abrir `/bundle/duo`, `/bundle/stack`, `/bundle/full` e conferir badges/CTAs mostrando 10/15/20%.
- Adicionar bundle ao carrinho e verificar que o desconto é aplicado no checkout do Shopify.
