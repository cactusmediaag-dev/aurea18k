## Plano: Tag em massa dos 52 produtos restantes ($29-$49)

Agora que `update_product` está em "Always allow", vou disparar todas as 52 chamadas `shopify--update_product` **em paralelo numa única mensagem**, adicionando a tag `bundle-eligible` (preservando tags existentes) em todos os produtos da faixa $29-$49 que ainda não foram marcados.

### Etapas
1. Listar produtos atualizados (paginar via `shopify--list_products`) para confirmar IDs e tags atuais dos 52 restantes.
2. Disparar 52 `shopify--update_product` em paralelo, cada um com `tags` = tags existentes + `bundle-eligible`.
3. Validar contagem final no Bundle Builder (`/bundle/duo`) — deve mostrar ~66 produtos elegíveis.

### Resultado esperado
Todos os produtos na faixa $29-$49 ficam disponíveis no Bundle Builder (duo/stack/full) sem precisar de aprovação individual.