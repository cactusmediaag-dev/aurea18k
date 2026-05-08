# Passo a passo: pegar Token + ID do Instagram

Tranquilo, vou te guiar do zero. Reserva ~15 min e segue na ordem.

---

## Etapa 1 — Conta Instagram precisa ser Profissional

A API só funciona com conta **Business** ou **Creator** (não funciona com pessoal).

No app do Instagram (celular):
1. Vai no perfil → ☰ → **Configurações e privacidade**
2. **Tipo de conta e ferramentas** → **Mudar para conta profissional**
3. Categoria: "Joias e relógios" → tipo: **Empresa**

É grátis e dá pra reverter quando quiser.

---

## Etapa 2 — Criar Página do Facebook e vincular

A Meta exige a conta IG vinculada a uma Página do Facebook (mesmo vazia).

1. Acessa https://www.facebook.com/pages/create
2. Cria uma Página com nome **Aurea Jewels** (categoria: Joalheria)
3. Pula tudo (foto, descrição) — não precisa
4. Volta no app do Instagram → perfil → **Editar perfil** → **Informações da Página** → conecta a Página recém-criada

---

## Etapa 3 — Criar app no Meta for Developers

1. Vai em https://developers.facebook.com/apps/ (login com seu Facebook pessoal)
2. **Criar app**
3. Caso de uso: **Outro** → Avançar
4. Tipo: **Empresa** → Avançar
5. Nome do app: `Aurea Jewels Site`, email de contato → **Criar app**

---

## Etapa 4 — Adicionar produto Instagram + gerar Token

1. No painel do app, menu da esquerda: **Adicionar produto**
2. Acha **Instagram** → **Configurar**
3. Vai pra aba **Acesso à API com Conta Profissional do Instagram** (ou similar — "Instagram API setup with Instagram login")
4. Clica em **Gerar token** (ou "Generate token")
5. Popup do Instagram abre → faz login com `@aureajewels.18k` → **Permitir tudo**
6. **Copia o token** que aparece (string longa começando com `IGAA...`)

➡️ Esse é o **Token de Acesso**. Salva num bloco de notas.

---

## Etapa 5 — Pegar o ID da conta

Ainda na mesma tela do passo 4, logo abaixo do token aparece:

- **ID da conta do Instagram** (número longo, ex: `17841401234567890`)

➡️ Copia também esse número.

**Se não aparecer ali**, alternativa:
- Vai em https://developers.facebook.com/tools/explorer/
- No topo, em **App Meta**, seleciona o app "Aurea Jewels Site"
- Em **Token de acesso**, cola o token que você gerou
- No campo de URL, digita: `me/accounts?fields=instagram_business_account{id,username}`
- Clica **Enviar** → copia o `id` que aparecer

---

## Etapa 6 — Me manda os 2 valores

Cola aqui no chat assim:

```
Token: IGAAxxxxxxxxxxxxxxxxxxxxxxxx
ID: 17841401234567890
```

Aí eu salvo nos secrets seguros do servidor (nunca aparecem no site público) e ativo a integração. Os 6 quadradinhos da seção "Follow Along" vão começar a mostrar suas últimas 6 postagens reais, cada uma linkando direto pro post no Instagram.

---

## Travou?

Me avisa em qual etapa empacou (1 a 5) e manda print se puder. Eu te desbloqueio.

> ⚠️ Importante: o token dura **60 dias**. Quando faltar 1 semana eu te aviso e a gente gera um novo (leva 2 minutos). Mais pra frente dá pra automatizar isso também.
