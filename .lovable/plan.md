## Bottom sheet do Bundle Builder com o painel completo (mobile)

### Problema atual
A barra que adicionei é minimalista demais — só mostra título, total e botão Review. O usuário quer **o painel inteiro** ("Your The Duo" com fotos, nomes, preços, X de remover, subtotal, You save, Total, sugestão de upgrade, Review) renderizado como rodapé fixo no mobile, idêntico ao painel da imagem 1.

### Comportamento desejado
- **Sem peça selecionada:** o painel completo continua **fixo no fluxo da página** (como está hoje no mobile, abaixo do grid de produtos).
- **Com ≥1 peça selecionada:** o mesmo painel "salta" para a base da tela como **bottom sheet fixo**, mantendo todo o conteúdo e visual originais.

### Implementação

**1. Remover a barra minimalista** que adicionei na resposta anterior.

**2. Componentizar o conteúdo do painel** (atualmente o `<aside>` em `BundleBuilder.tsx`) em um sub-componente local `BundleSummaryPanel` que recebe os props necessários (selected, config, subtotal, etc.) — assim podemos renderizá-lo em dois lugares sem duplicar JSX.

**3. Renderização condicional no mobile:**

```text
desktop (lg+): aside sticky lateral (igual hoje)
mobile, selected = 0: <BundleSummaryPanel /> inline no grid (igual hoje)
mobile, selected ≥ 1: <BundleSummaryPanel /> como fixed bottom sheet
```

**4. Estilo do bottom sheet (mobile, quando selected ≥ 1):**
- `fixed bottom-0 left-0 right-0 z-40 lg:hidden`
- `bg-cream-light border-t border-gold/30 shadow-[0_-8px_32px_rgba(0,0,0,0.12)]`
- `max-h-[80vh] overflow-y-auto` — scrolla internamente se passar do limite
- `rounded-t-lg` para sugerir sheet
- Padding com safe-area: `pb-[max(16px,env(safe-area-inset-bottom))]`
- Animação de entrada: `animate-in slide-in-from-bottom-8 duration-300`
- Pequena alça visual ("grabber") no topo: `<div className="w-10 h-1 bg-gold/30 rounded-full mx-auto mt-2 mb-1" />`

**5. Botão collapse/expand:**
- Chevron no canto superior direito do sheet (`ChevronDown` / `ChevronUp` do lucide).
- Estado local `sheetCollapsed` no `BundleBuilder`.
- Quando colapsado: sheet vira uma faixa fina (`max-h-[72px]`) mostrando só o título "Your The Duo · 2/2" + total + botão Review compacto. Tap na faixa expande de volta.
- Permite o usuário continuar vendo os produtos sem o sheet ocupar 80% da tela.

**6. Padding bottom no container** para o conteúdo da página não ficar atrás do sheet quando expandido (já adicionei `pb-32 lg:pb-0` — vou ajustar para que funcione tanto colapsado quanto expandido — `pb-24` é suficiente porque com sheet expandido o usuário scrolla dentro do sheet).

**7. Inline panel no mobile com selected = 0:** continua mostrando o painel completo (slots vazios "Pick piece 1", "Pick piece 2", subtotal $0, etc.) — assim o usuário aprende a estrutura antes de selecionar. O sheet só aparece quando há ação real.

### Arquivo a editar
- `src/pages/BundleBuilder.tsx` (única mudança — extrair `BundleSummaryPanel` no mesmo arquivo, ajustar renderização condicional).

### Não muda
- Layout desktop (sidebar sticky lateral igual).
- Lógica de seleção, dialog Review, fluxo de checkout.
- Visual do painel — exatamente o mesmo design da imagem 1.
