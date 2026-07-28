# Fio & Ponto — Landing Page

Landing page para negócio de crochê feito à mão, com CTA direto para WhatsApp. Construída em **HTML, CSS e JavaScript puros** (sem frameworks, sem build), pronta para publicar ou editar.

## 📁 Estrutura do projeto

```
.
├── index.html   → estrutura e conteúdo da página
├── style.css    → identidade visual, layout e responsividade
├── script.js    → interações (menu, carrossel, formulário, animações)
└── README.md    → este arquivo
```

Os três arquivos são independentes e se conectam via `<link>` e `<script>` no `index.html` — não há nenhuma dependência externa além de fontes do Google Fonts (carregadas por CDN).

## 🚀 Como usar

Não é necessário instalar nada. Basta:

1. Baixar os 3 arquivos (`index.html`, `style.css`, `script.js`) e mantê-los na **mesma pasta**.
2. Abrir o `index.html` diretamente no navegador — ou hospedar a pasta em qualquer serviço de hospedagem estática (Netlify, Vercel, GitHub Pages, hospedagem tradicional, etc).

## ✏️ O que trocar antes de publicar

| O que trocar | Onde encontrar |
|---|---|
| Número de WhatsApp (`5531999999999`) | Aparece em vários links `href="https://wa.me/..."` no `index.html` **e** na constante `WHATSAPP_NUMBER` no topo do `script.js` — troque em **todos** os lugares |
| E-mail (`contato@fioeponto.com.br`) | Seção "Contatos" no `index.html` |
| Instagram (`@fioeponto.croche`) | Seção "Contatos" no `index.html` |
| Nome da marca ("Fio & Ponto") | `<title>`, `.brand-name` e textos ao longo do `index.html` |
| Textos de Sobre, Serviços e Depoimentos | Diretamente no `index.html`, dentro de cada `<section>` |
| Cores da marca | Variáveis CSS no topo do `style.css` (bloco `:root`) |

> 💡 Dica: use `Ctrl+F` (ou `Cmd+F`) para localizar `5531999999999` no HTML e no JS e substituir por um número real, no formato `55` + DDD + número, sem espaços, traços ou símbolos.

## 🎨 Identidade visual

O design foi pensado para remeter ao universo do crochê, evitando um visual genérico:

- **Paleta**: pergaminho cru, framboesa (cor de ação), verde-pinho (seções escuras) e mostarda (detalhes) — inspirada em tons de novelos de lã.
- **Tipografia**: `Fraunces` (títulos, com personalidade artesanal), `Karla` (textos) e `Space Mono` (rótulos, como se fossem "fichas técnicas de ponto").
- **Divisores "picô"**: as ondulações entre seções imitam o acabamento arrematado (scalloped edge) típico do crochê — feitas só com CSS (`radial-gradient`), sem imagens.
- **Granny square**: motivo decorativo na seção "Sobre", construído inteiramente em CSS.
- **Fio animado**: linha desenhada no hero ao carregar a página, representando um ponto sendo feito (a animação é desativada automaticamente para usuários que preferem menos movimento).

## 🧩 Seções da página

1. **Header/Navegação** — logo, menu (Sobre, Serviços, Depoimentos, Contatos) e CTA fixo "Faça já sua encomenda".
2. **Hero** — apresentação principal com CTA duplo (WhatsApp + ver catálogo).
3. **Sobre** — história do ateliê e estatísticas rápidas.
4. **Serviços** — catálogo em grade: Moda Feminina, Moda Masculina, Acessórios, Decoração, Infantil e Personalizados. Cada card já tem um link de WhatsApp com mensagem pré-preenchida específica daquela categoria.
5. **Depoimentos** — carrossel com setas, indicadores (dots) e autoplay (pausa ao passar o mouse ou focar via teclado).
6. **Contatos** — dados de contato + formulário de "pedido rápido" que monta uma mensagem e abre o WhatsApp automaticamente (sem backend).
7. **Botão flutuante de WhatsApp** — aparece após o usuário rolar a página além do hero.

## ⚙️ Funcionalidades em JavaScript

- Menu mobile (abrir/fechar, fecha ao clicar em link ou pressionar `Esc`).
- Sombra no header ao rolar a página.
- Revelação suave das seções ao entrarem na tela (`IntersectionObserver`).
- Exibição do botão flutuante de WhatsApp após o hero.
- Carrossel de depoimentos com autoplay de 6s.
- Formulário de pedido rápido que gera e abre um link do WhatsApp com a mensagem preenchida.
- Ano atual atualizado automaticamente no rodapé.

## 📱 Responsividade

Layout **mobile-first**, com pontos de quebra em:
- `640px` (tablet) — grade de serviços em 2 colunas.
- `1024px` (desktop) — menu horizontal, grade de serviços em 3 colunas, seções "Sobre" e "Contatos" em duas colunas lado a lado.

## ♿ Acessibilidade

- Link de "pular para o conteúdo".
- Foco visível em todos os elementos interativos.
- Atributos `aria-label`, `aria-expanded` e `role` no menu e no carrossel.
- Animações respeitam `prefers-reduced-motion`.

## 🔧 Possíveis próximos passos

- Substituir os ícones/ilustrações CSS por fotos reais das peças.
- Integrar o formulário a um serviço de e-mail ou planilha (ex.: Formspree, Google Sheets) além do envio via WhatsApp.
- Adicionar Google Analytics ou Meta Pixel para acompanhar conversões.
- Registrar um domínio próprio e configurar SEO (meta tags de Open Graph para compartilhamento em redes sociais).
