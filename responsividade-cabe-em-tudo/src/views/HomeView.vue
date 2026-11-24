<script setup>
const secoes = [
  { n: '01', to: '/por-que', t: 'Por que responsividade importa' },
  { n: '02', to: '/unidades', t: 'Unidades CSS' },
  { n: '03', to: '/flex-grid', t: 'Flexbox e Grid' },
  { n: '04', to: '/imagens', t: 'Imagens responsivas' },
  { n: '05', to: '/boas-praticas', t: 'Boas práticas em Vue' },
  { n: '!!', to: '/desafio', t: 'Desafio final' },
]
</script>

<template>
  <section class="capa">
    <p class="tag">GUIA PRÁTICO · 2026</p>
    <h1>Seu site cabe<br /><span>em qualquer</span><br />tela?</h1>
    <p class="capa__sub">Cinco capítulos curtos, alguns laboratórios para mexer e um desafio no fim. Diminua a janela enquanto lê — o selo laranja no canto conta tudo.</p>
  </section>

  <ol class="indice">
    <li v-for="s in secoes" :key="s.to">
      <RouterLink :to="s.to"><span class="num">{{ s.n }}</span><span>{{ s.t }}</span><span class="seta">→</span></RouterLink>
    </li>
  </ol>
</template>

<style scoped>
.capa { padding-block: var(--esp-4); }
h1 { font: 2.6rem/0.95 var(--fonte-display); text-transform: uppercase; margin-block: var(--esp-2); letter-spacing: -0.03em; }
h1 span { color: var(--laranja); }
.capa__sub { max-width: 40ch; font-size: 1.1rem; }
.indice { list-style: none; padding: 0; margin: 0; border-top: 3px solid var(--preto); }
.indice a { display: grid; grid-template-columns: 3rem 1fr auto; align-items: center; gap: var(--esp-2); padding: var(--esp-2) 0; border-bottom: 3px solid var(--preto); text-decoration: none; font-weight: 600; font-size: 1.1rem; transition: background 0.15s, padding 0.15s; }
.indice a:hover { background: var(--laranja); padding-inline: var(--esp-2); }
.num { font-family: var(--fonte-display); font-size: 1.5rem; }
@media (min-width: 48rem) {
  h1 { font-size: 5.5rem; }
  .indice a { font-size: 1.5rem; grid-template-columns: 5rem 1fr auto; }
  .num { font-size: 2.5rem; }
}
</style>
