

## Diagnóstico: Site em branco

O problema é um erro de CSS que já foi corrigido no arquivo `src/index.css`, mas o dev server pode ter ficado em estado de erro. A última versão do arquivo está sintaticamente correta (170 linhas, todos os blocos fechados).

Além disso, o `src/App.css` contém estilos padrão do Vite que limitam o `#root` com `max-width: 1280px` e `padding: 2rem` — isso não causa tela branca, mas deve ser limpo.

## Plano

1. **Forçar rebuild do CSS** — Adicionar um comentário trivial ao `index.css` e removê-lo para forçar o HMR a reprocessar o arquivo
2. **Limpar App.css** — Remover os estilos padrão do Vite (`#root { max-width: 1280px; padding: 2rem }`) que podem interferir no layout full-width da loja
3. **Verificar se o site carrega** após as alterações

