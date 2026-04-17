

# Roadmap Aurea Jewels — Checklist de Lançamento

Texto pronto para copiar e colar em documento externo.

---

```
═══════════════════════════════════════════════════════════
ROADMAP DE LANÇAMENTO — AUREA JEWELS
═══════════════════════════════════════════════════════════

📦 1. CONTEÚDO VISUAL (BANNERS E IMAGENS)
───────────────────────────────────────────────────────────
[ ] Hero Carousel — Slide 2 desktop (1920×1080) + mobile (750×1200)
[ ] Hero Carousel — Slide 3 desktop (1920×1080) + mobile (750×1200)
[ ] 8 imagens de Categorias (600×800, 3:4)
    └ Women, Men, Kids, Best Sellers, New Arrivals,
      Bundles, Gift Ideas, Shop All
[ ] 6 fotos do Instagram Feed (600×600, 1:1)
[ ] 5 banners de header de Coleção desktop (1440×400)
[ ] 5 banners de header de Coleção mobile (750×500)
[ ] 3 imagens de Bundle (400×400) — opcional, pode manter ícones
[ ] Logo em alta resolução (SVG + PNG)
[ ] Favicon definitivo (substituir placeholder)
[ ] Open Graph image para compartilhamento social (1200×630)


🛍️ 2. CATÁLOGO SHOPIFY
───────────────────────────────────────────────────────────
[ ] Cadastrar todos os produtos no Shopify Admin
[ ] Adicionar fotos profissionais de cada produto (mín. 3 por produto)
[ ] Preencher descrições completas de produto
[ ] Definir variantes (tamanho, cor, material) corretamente
[ ] Configurar coleções: womens, mens, kids, best-sellers,
    new-arrivals, bundles, gift-ideas
[ ] Configurar SEO de cada produto (title, description, handle)
[ ] Definir estoque inicial e SKUs
[ ] Cadastrar preços e preços comparativos (riscado)


🔐 3. CONTA DO CLIENTE & WISHLIST
───────────────────────────────────────────────────────────
[ ] Ativar Customer Accounts no Shopify (Classic ou New)
[ ] Implementar Wishlist (favoritar produtos)
    └ Opção A: localStorage (simples, sem login)
    └ Opção B: Lovable Cloud + Supabase (vinculado ao usuário)
[ ] Página dedicada /wishlist
[ ] Ícone de coração nos cards de produto
[ ] Sincronização wishlist ↔ conta logada


💳 4. CHECKOUT E PAGAMENTOS
───────────────────────────────────────────────────────────
[ ] Claim da loja Shopify (encerra sandbox, inicia trial 30 dias)
[ ] Configurar gateway de pagamento (Shopify Payments / Stripe / Pix)
[ ] Configurar Pix, boleto e cartão (mercado BR)
[ ] Testar fluxo completo de checkout end-to-end
[ ] Configurar parcelamento (se aplicável)
[ ] Validar emails transacionais (pedido, envio, entrega)


🚚 5. FRETE E LOGÍSTICA
───────────────────────────────────────────────────────────
[ ] Configurar zonas de envio no Shopify
[ ] Integrar Correios / transportadora (Melhor Envio, Frenet, etc.)
[ ] Definir prazo e custo de frete por região
[ ] Política de frete grátis (acima de X)
[ ] Configurar embalagem padrão (peso, dimensões)
[ ] Etiquetas de envio automatizadas


📄 6. PÁGINAS LEGAIS E INSTITUCIONAIS
───────────────────────────────────────────────────────────
[ ] Revisar conteúdo de Privacy Policy (LGPD)
[ ] Revisar Terms & Conditions
[ ] Revisar Shipping & Returns (com prazos reais)
[ ] Revisar Cookie Policy + banner de consentimento
[ ] Revisar página About (história real da marca)
[ ] Revisar FAQ com perguntas reais
[ ] Página de Contact com formulário funcional + email
[ ] CNPJ, endereço e dados da empresa no Footer


📧 7. EMAIL MARKETING & AUTOMAÇÕES
───────────────────────────────────────────────────────────
[ ] Conectar formulário de Email Capture a Klaviyo / Mailchimp
[ ] Welcome email automático com cupom de boas-vindas
[ ] Email de carrinho abandonado
[ ] Email pós-compra (review request)
[ ] Newsletter mensal


📊 8. ANALYTICS E TRACKING
───────────────────────────────────────────────────────────
[ ] Google Analytics 4 (GA4)
[ ] Google Tag Manager
[ ] Meta Pixel (Facebook/Instagram Ads)
[ ] TikTok Pixel (se aplicável)
[ ] Google Search Console
[ ] Configurar eventos de e-commerce (view_item, add_to_cart, purchase)
[ ] Hotjar / Microsoft Clarity (heatmaps) — opcional


🔍 9. SEO
───────────────────────────────────────────────────────────
[ ] Meta tags (title, description) em todas as páginas
[ ] Open Graph + Twitter Cards
[ ] Sitemap.xml
[ ] Robots.txt revisado
[ ] Schema.org markup (Product, Organization, BreadcrumbList)
[ ] URLs amigáveis (já implementado)
[ ] Alt text em todas as imagens
[ ] Otimização de Core Web Vitals (LCP, CLS, INP)


⭐ 10. SOCIAL PROOF & ENGAJAMENTO
───────────────────────────────────────────────────────────
[ ] Integrar Reviews reais (Judge.me, Loox, ou Yotpo)
[ ] Trustpilot / Google Reviews badge
[ ] Feed real do Instagram (substituir placeholders)
[ ] Notificações de venda em tempo real (Fomo) — opcional
[ ] WhatsApp Business no canto da tela
[ ] Chat ao vivo (Tidio, Crisp) — opcional


🎨 11. UX / FEATURES PENDENTES
───────────────────────────────────────────────────────────
[ ] Filtros funcionais na página de Coleção
    └ Por preço, categoria, material, disponibilidade
[ ] Ordenação (mais vendidos, preço, novidades)
[ ] Paginação ou infinite scroll
[ ] Quick view nos cards de produto
[ ] Zoom nas fotos do produto
[ ] Galeria de imagens com swipe (mobile)
[ ] Cross-sell e upsell na página de produto
[ ] "Recently viewed products"
[ ] Tabela de medidas / guia de tamanhos
[ ] Cupom de desconto na página de carrinho


📱 12. PERFORMANCE E TÉCNICO
───────────────────────────────────────────────────────────
[ ] Otimizar todas as imagens (WebP + lazy loading)
[ ] Auditoria Lighthouse (mín. 90 em todas as métricas)
[ ] Testar em dispositivos reais (iOS Safari, Android Chrome)
[ ] Testar em todos os browsers (Chrome, Safari, Firefox, Edge)
[ ] Validar responsividade em todos os breakpoints
[ ] Verificar acessibilidade (WCAG AA)
[ ] Configurar redirects 301 de URLs antigas (se aplicável)
[ ] Backup automatizado do Shopify


🌐 13. DOMÍNIO E DEPLOY
───────────────────────────────────────────────────────────
[X] Domínio aurea18k.com configurado
[ ] SSL ativo e válido
[ ] www → apex (ou vice-versa) consistente
[ ] DNS configurado para emails (SPF, DKIM, DMARC)
[ ] Email profissional contato@aurea18k.com


📣 14. PRÉ-LANÇAMENTO
───────────────────────────────────────────────────────────
[ ] Página "Coming Soon" / countdown — opcional
[ ] Lista VIP de pré-lançamento
[ ] Estratégia de soft launch (amigos e família)
[ ] Influenciadores / press kit
[ ] Anúncios pagos preparados (Meta Ads, Google Ads)
[ ] Conteúdo orgânico programado (Instagram, TikTok)


🚀 15. PÓS-LANÇAMENTO
───────────────────────────────────────────────────────────
[ ] Monitoramento diário de pedidos e estoque
[ ] Atendimento ao cliente estruturado (SLA de resposta)
[ ] Política de troca e devolução clara
[ ] Programa de fidelidade — fase 2
[ ] Programa de afiliados — fase 2
[ ] App mobile (PWA) — fase 3

═══════════════════════════════════════════════════════════
PRIORIDADE PARA GO-LIVE (MÍNIMO VIÁVEL):
1. Catálogo Shopify completo (item 2)
2. Banners principais (item 1 — mínimo hero + categorias)
3. Checkout funcional (item 4)
4. Frete configurado (item 5)
5. Páginas legais revisadas (item 6)
6. Analytics básico (item 8)
7. Domínio + SSL (item 13)
═══════════════════════════════════════════════════════════
```

---

Esse é só um roadmap em texto — não envolve mudança de código. Se quiser, posso já abrir tickets de implementação para os itens que dependem do Lovable (wishlist, filtros, banners, schema SEO, etc.).

