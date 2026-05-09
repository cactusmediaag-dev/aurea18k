## Problema

No mobile, ao selecionar uma peça:
1. **Sheet abre expandido** ocupando ~80% da tela — usuário não consegue continuar vendo/escolhendo produtos.
2. **Quando minimiza**, a barra colapsada quebra: o título "YOUR THE DUO" aparece quebrado em várias linhas, "1/2" some pra baixo, e o botão "1 TO GO" fica desproporcionalmente largo, com layout visivelmente bugado.

## Solução

### 1. Sheet inicia colapsado (não expandido)

Mudar o default de `sheetCollapsed` para `true`. Assim, ao selecionar a primeira peça, o rodapé sobe **já compacto**, mostrando só o resumo essencial. Usuário continua vendo o grid de produtos e pode expandir tocando no chevron quando quiser revisar/finalizar.

Também resetar para colapsado a cada nova adição de peça (`addPiece` faz `setSheetCollapsed(true)`), pra garantir que após qualquer ação ele volta ao estado mínimo.

### 2. Refazer o layout da barra colapsada

Trocar a estrutura atual (que está deixando o botão esticar e o título quebrar) por um layout horizontal sólido em duas colunas:

```text
┌────────────────────────────────────────────────────┐
│  ─── (grabber)                              ⌃     │
│  Your The Duo · 1/2              [ 1 TO GO  → ]   │
│  $37.00  save ~$5.55                              │
└────────────────────────────────────────────────────┘
```

Mudanças concretas:
- Título "Your {config.name} · X/Y" em **uma linha só** com `whitespace-nowrap truncate` no container `flex-1 min-w-0`.
- Linha de preço logo abaixo, também `truncate`, fonte menor.
- Botão à direita com `shrink-0`, padding compacto (`px-4 py-2.5`), texto curto (`Review →` ou `${remaining} to go`), `text-[11px] tracking-[0.1em] uppercase`.
- Container externo: `px-4 py-2 flex items-center gap-3` — sem wrap.
- Chevron de expand fica no canto superior direito acima do conteúdo (separado da grabber).
- Quando colapsado, **tap em qualquer parte da barra (exceto botão) expande** — e o botão "Review" / "X to go" tem `e.stopPropagation()`.

### 3. Sheet expandido com altura limitada e backdrop sutil

Quando o usuário expande manualmente:
- `max-h-[70vh]` (em vez de 75vh) e `overflow-y-auto` interno.
- Adicionar um backdrop opcional `bg-black/20` clicável atrás do sheet expandido pra fechar (volta a colapsar).
- Manter animação suave de altura.

### 4. Padding inferior da página

Ajustar `pb-32 lg:pb-12` para `pb-24 lg:pb-12` — suficiente pra barra colapsada (~80px) sem desperdiçar espaço.

## Arquivo a editar

- `src/pages/BundleBuilder.tsx` — único arquivo. Mudar default state, ajustar `addPiece`, refazer JSX do bloco colapsado, adicionar backdrop opcional no expandido.

## Não muda

- Layout desktop (sidebar lateral sticky).
- Conteúdo do `BundleSummaryPanel` (mesmo painel completo).
- Lógica de seleção, dialog de Review, fluxo de checkout.
