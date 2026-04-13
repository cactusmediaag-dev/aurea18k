

# Adicionar Ícone de Conta (Login/Perfil) no Navbar e Footer

## O que será feito
Adicionar um ícone de usuário (User) no navbar entre o ícone de busca e o carrinho, e um link "My Account" no footer. Ambos redirecionam para a página de conta nativa do Shopify (`https://hd5ps3-wc.myshopify.com/account`), onde o cliente pode fazer login, ver pedidos e gerenciar perfil.

## Arquivos modificados

### 1. `src/components/Navbar.tsx`
- Importar ícone `User` do lucide-react
- Desktop: adicionar botão com ícone `User` entre Search e ShoppingBag, abrindo `https://hd5ps3-wc.myshopify.com/account` em nova aba
- Mobile: adicionar o mesmo ícone antes do carrinho no mobile controls
- Mobile menu: adicionar link "My Account" no menu mobile

### 2. `src/components/Footer.tsx`
- Adicionar link "My Account" na coluna "Customer Care", abrindo a página de conta do Shopify em nova aba

## Detalhes técnicos
- URL da conta: `https://hd5ps3-wc.myshopify.com/account`
- Usa `<a href="..." target="_blank" rel="noopener noreferrer">` por ser link externo (Shopify)
- Ícone: `User` do lucide-react, mesmo estilo visual dos ícones existentes

