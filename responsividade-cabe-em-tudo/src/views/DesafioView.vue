<script setup>
import { ref } from 'vue'
const opcoes = ['464px', '704px', '720px', '944px']
const escolha = ref('')
const certa = '704px'
</script>

<template>
  <section class="desafio">
    <p class="tag">DESAFIO</p>
    <h1>No laboratório de Grid, com que largura do contêiner aparecem <span>3 colunas</span>?</h1>
    <p>Dica: tudo que você precisa está na seção 03. Faça a conta antes de testar no slider.</p>
    <div class="opcoes">
      <button v-for="o in opcoes" :key="o" class="op" :class="{ certo: escolha && o === certa, errado: escolha === o && o !== certa }" @click="escolha = o">{{ o }}</button>
    </div>
    <p v-if="escolha" class="feedback">
      {{ escolha === certa ? 'Isso! 3 × 224px + 2 gaps de 16px = 704px.' : 'Ainda não. Lembre: são 3 colunas mínimas e 2 gaps entre elas.' }}
    </p>
    <RouterLink to="/flex-grid" class="btn">voltar ao laboratório</RouterLink>
  </section>
</template>

<style scoped>
.desafio { padding-block: var(--esp-4); }
h1 { font: 2rem/1.05 var(--fonte-display); margin-block: var(--esp-2); text-transform: uppercase; }
h1 span { background: var(--laranja); padding-inline: 0.3rem; }
.opcoes { display: grid; grid-template-columns: 1fr 1fr; gap: var(--esp-2); margin-block: var(--esp-3); }
.op { font: 1.4rem var(--fonte-display); padding: var(--esp-3) var(--esp-1); border: 3px solid var(--preto); background: var(--branco); cursor: pointer; }
.op:hover { background: var(--creme); }
.certo { background: var(--laranja); }
.errado { background: var(--preto); color: var(--branco); }
.feedback { font-weight: 600; font-size: 1.1rem; }
.btn { display: inline-block; text-decoration: none; }
@media (min-width: 48rem) { h1 { font-size: 3.5rem; } .opcoes { grid-template-columns: repeat(4, 1fr); } }
</style>
