## Instagram Section - Posts Estáticos

### Objetivo
Substituir a integração dinâmica com a API do Instagram por imagens estáticas enviadas pelo usuário, mantendo o mesmo layout visual e links para o perfil @aureajewels.18k.

### Como vai funcionar

1. **Usuário envia as imagens** — Até 6 fotos diretamente no chat (upload do Lovable).
2. **Armazenamento no projeto** — As imagens serão salvas em `public/instagram/` para serem servidas como arquivos estáticos.
3. **Atualização do componente** — `InstagramSection.tsx` será simplificado:
   - Remover a chamada à API via `useQuery` e edge function
   - Usar array estático de imagens locais
   - Manter hover effects, link para o perfil e layout de grid 6 colunas
   - Remover a edge function `get-instagram-posts` (não será mais necessária)

### Fluxo técnico

```
Usuário envia 6 imagens no chat
        ↓
Salvar em public/instagram/photo-1.jpg ... photo-6.jpg
        ↓
Atualizar InstagramSection.tsx com array de imagens locais
        ↓
Cada imagem linka para https://instagram.com/aureajewels.18k
```

### Detalhes de implementação

- **Componente**: `src/components/InstagramSection.tsx`
  - Remover import de `useQuery` e `supabase`
  - Criar array `STATIC_POSTS` com paths das imagens
  - Manter estrutura visual atual (grid 6 cols, hover overlay com ♡, aspect-square)
- **Assets**: `public/instagram/photo-{1..6}.jpg`
- **Cleanup**: Remover/supabase/functions/get-instagram-posts/ (edge function não será mais usada)

### Próximo passo
Aguardando o usuário enviar as 6 imagens pelo chat para iniciar a implementação.