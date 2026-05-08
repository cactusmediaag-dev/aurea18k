## Sticky bottom bar no Bundle Builder (mobile)

### Problema
No mobile, ao selecionar uma peça no `/bundle/:type`, nada aparece indicando o estado do bundle. O painel resumo existe mas fica empurrado lá pro fim da página, então o usuário não sabe que algo aconteceu nem como avançar.

### Solução
Adicionar uma **barra fixa no rodapé** (visível só em mobile/tablet — `lg:hidden`) que aparece com animação slide-up assim que o usuário seleciona ≥1 peça.

### Conteúdo da barra
Linha única, compacta, dois lados:

**Esquerda:**
- Texto pequeno: `Your {config.name} · {selected.length}/{itemCount}`
- Linha de preço:
  - Se incompleto: `Subtotal ${subtotal} · est. save ${discountAmount}`
  - Se completo: `Total ${total}` com `~~${subtotal}~~` riscado ao lado

**Direita:**
- Botão CTA dourado:
  - Se incompleto: `Pick {remaining} more` (apenas scroll-to-top, sem ação destrutiva — ou desabilitado)
  - Se completo + tem `nextTier`: dois botões empilhados ou um único `Review Bundle` principal + chip secundário "+1 = {nextTier.discountPct}% off"
  - Se completo sem nextTier: `Review Bundle →`

Para manter simples no rodapé estreito do mobile, vou usar:
- **Incompleto:** info à esquerda + botão `Review` desabilitado mostrando `{remaining} to go`
- **Completo:** info à esquerda + botão `Review Bundle →` ativo (abre o mesmo dialog)
- A sugestão de upgrade do tier (`+1 piece = X% off`) continua aparecendo dentro do painel principal — não duplica no rodapé pra não poluir.

### Estilo
- `fixed bottom-0 left-0 right-0 z-40 lg:hidden`
- Background: `bg-cream-light` com `border-t border-gold/30` e `shadow-[0_-4px_20px_rgba(0,0,0,0.08)]`
- Padding: `px-4 py-3` + safe-area (`pb-[max(12px,env(safe-area-inset-bottom))]`)
- Animação de entrada: `animate-in slide-in-from-bottom-4 duration-300` (já temos tailwindcss-animate)
- Renderiza condicionalmente: só quando `selected.length > 0`

### Ajustes adicionais
- Adicionar `pb-32 lg:pb-0` no container da seção pra que o conteúdo final (botão "Back to home" do painel mobile) não fique escondido atrás da barra fixa.
- O painel resumo completo continua existindo no mobile (no fluxo normal da página) — a barra é um atalho/indicador, não substitui o painel detalhado. O usuário pode rolar até o painel se quiser ver os slots em detalhe ou remover peças.

### Arquivo a editar
- `src/pages/BundleBuilder.tsx` (única mudança)

### Não muda
- Layout desktop (`lg:` mantém sidebar sticky lateral igual)
- Lógica de seleção, dialog de review, fluxo de checkout
- Painel de resumo continua visível no mobile abaixo do grid de produtos
