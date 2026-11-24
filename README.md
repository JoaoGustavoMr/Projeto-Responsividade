# Tela Cheia — responsividade-cabe-em-tudo

Guia interativo, feito em Vue 3, que ensina a criar páginas que funcionam em qualquer tela. Cada capítulo traz uma explicação curta, um exemplo de código comentado, laboratórios interativos, uma pergunta-guia respondida e as fontes consultadas.

Projeto desenvolvido em dupla para a atividade **Projeto — Responsividade**.

- **Autores:** João Gustavo Mota Ramos e João Pedro da Cunha Machado

## Sobre o projeto

O guia se chama **Tela Cheia** e é dividido em seis telas, cada uma com sua própria rota:

| Rota | Seção | O que aborda |
| --- | --- | --- |
| 01 | Por que responsividade importa | A meta tag `viewport` e o que ela muda no celular |
| 02 | Unidades CSS | `px`, `rem`, `em`, `%`, `fr`, `vw`/`vh`, `dvh` e `ch` |
| 03 | Flexbox e Grid | `justify-content`, `align-items`, `flex-wrap`, `gap` e `repeat(auto-fit, minmax())` |
| 04 | Imagens responsivas | `max-width`, `width`/`height`, `loading="lazy"`, `aspect-ratio`, `object-fit` e `srcset` |
| 05 | Boas práticas em Vue | Estrutura de pastas, props tipadas, `:key`, design tokens, Core Web Vitals e rotas sob demanda |
| Desafio | Desafio final | Uma pergunta que só se responde usando o próprio guia |

### Laboratórios interativos

- **Celular com e sem viewport:** liga e desliga a meta tag e mostra a diferença na tela do celular.
- **Conversor de unidades → px:** digite um valor (`1.5rem`, `2em`, `50%`), escolha a unidade e veja o resultado em pixels, ajustando o `font-size` do `html`.
- **Brincando com Flexbox:** altere `justify-content`, `align-items` e `flex-wrap` e veja os itens se reorganizarem.
- **Slider de largura + auto-fit:** mude a largura do contêiner e veja quantas colunas o Grid cria.
- **O texto que pula:** imagem carregada com atraso, com e sem `width` e `height`, para ver o layout "pular".
- **object-fit numa caixa 1:1:** compare `cover`, `contain`, `fill` e outros valores.
- **v-for com e sem `:key`:** mostra o que acontece com o texto digitado quando um item da lista é removido.
- **Selo de largura:** indicador fixo no canto da tela com a largura atual da janela e o breakpoint ativo (por exemplo, `MD 868px`).
- **Contador de capítulos lidos:** botão "Lida" ao fim de cada seção, com o progresso (`4/5 lidas`) no menu.

### Decisões técnicas

- **Mobile-first:** o CSS fora de media query é o do celular, e as media queries usam apenas `min-width`.
- **Unidades relativas:** fontes e espaçamentos em `rem`.
- **Design tokens:** cores e espaçamentos definidos como variáveis CSS em `:root`.
- **Sem rolagem horizontal:** nenhum conteúdo vaza da tela.
- **Menu responsivo:** no celular, o menu vira um botão.
- **Rotas sob demanda:** as páginas são carregadas somente quando a pessoa as visita (`import()` dinâmico), o que melhora o LCP.

## Tecnologias

- [Vue 3](https://vuejs.org/)
- [Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) (estado global, como o contador de capítulos lidos)

## Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 22.18 ou superior, ou 24.12 ou superior)
- npm (já vem com o Node.js)
- [Git](https://git-scm.com/)

### Passo a passo

1. Clone o repositório:

```sh
git clone https://github.com/JoaoGustavoMr/Projeto-Responsividade
cd Projeto-Responsividade/responsividade-cabe-em-tudo
```

2. Instale as dependências:

```sh
npm install
```

3. Inicie o servidor de desenvolvimento (com hot-reload):

```sh
npm run dev
```

4. Abra o endereço mostrado no terminal, normalmente `http://localhost:5173/`.

### Testando no celular

Com o servidor rodando, o celular e o computador na mesma rede Wi-Fi, execute:

```sh
npm run dev -- --host
```

O Vite vai mostrar um endereço de rede (algo como `http://192.168.x.x:5173/`). Abra esse endereço no navegador do celular.

Você também pode testar direto no computador usando o modo de dispositivo do DevTools (F12 → ícone de celular) e diminuindo a janela. O selo laranja no canto da tela mostra a largura e o breakpoint atuais.

### Gerar a versão de produção

```sh
npm run build
```

Os arquivos otimizados e minificados ficam na pasta `dist/`. Para visualizar essa versão localmente:

```sh
npm run preview
```

## Estrutura de pastas

```text
src/
├── assets/        # estilos globais e variáveis CSS (design tokens)
├── components/    # componentes reutilizáveis (PascalCase, nomes com 2+ palavras)
├── composables/   # lógica reutilizável, como o useViewport do selo de largura
├── router/        # rotas, uma por seção, com carregamento sob demanda
├── stores/        # estado global com Pinia
├── views/         # uma página por seção do guia
├── App.vue
└── main.js
```

## Configuração recomendada

### Editor

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (desative o Vetur).

### Navegador

- Navegadores baseados em Chromium (Chrome, Edge, Brave etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Ative o Custom Object Formatter no Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Ative o Custom Object Formatter no Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

### Configuração do Vite

Consulte a [referência de configuração do Vite](https://vite.dev/config/).

## Licença

Projeto acadêmico, sem fins comerciais.
