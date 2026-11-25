<script setup>
import { ref, computed } from 'vue'

// Desafio: pegadinha sobre em x rem, respondida com o conversor da seção 02
const resposta = ref('')
const tentativas = ref(0)
const enviado = ref(false)
const CERTA = 15

const acertou = computed(() => Number(String(resposta.value).replace(',', '.')) === CERTA)
function conferir() {
  if (resposta.value === '') return
  tentativas.value++
  enviado.value = true
}
const dica = computed(() => {
  if (tentativas.value < 2) return 'Releia o que o em multiplica. Ele olha para o <html>?'
  return 'O em usa a fonte do pai (20px). Mudar a raiz não mexe nele: 0.75 × 20 = ?'
})
</script>

<template>
  <section class="desafio">
    <p class="tag">DESAFIO</p>
    <h1>Um botão tem <span>padding: 0.75em</span>. Quanto ele mede em px?</h1>
    <ul class="dados">
      <li>Fonte do elemento pai: <strong>20px</strong></li>
      <li>A pessoa aumentou a fonte do navegador: o <code>&lt;html&gt;</code> foi de <strong>16px</strong> para <strong>20px</strong></li>
    </ul>
    <p>Pense antes de digitar. Depois confira no conversor da seção 02.</p>

    <form class="resposta" @submit.prevent="conferir">
      <label for="px">padding em px</label>
      <div class="linha">
        <input id="px" v-model="resposta" inputmode="decimal" placeholder="ex.: 12" @input="enviado = false" />
        <button class="btn" type="submit">conferir</button>
      </div>
    </form>

    <p v-if="enviado" class="feedback" :class="acertou ? 'ok' : 'nao'">
      <template v-if="acertou">Isso! 0.75 × 20px = 15px. O em segue o pai, então mudar a raiz não altera nada. Se fosse 0.75rem, aí sim: 0.75 × 20 = 15px também, mas por outro motivo.</template>
      <template v-else>Ainda não. {{ dica }}</template>
    </p>

    <RouterLink to="/unidades" class="btn">abrir o conversor</RouterLink>
  </section>
</template>

<style scoped>
.desafio { padding-block: var(--esp-4); }
h1 { font: 2rem/1.05 var(--fonte-display); margin-block: var(--esp-2); text-transform: uppercase; }
h1 span { background: var(--laranja); padding-inline: 0.3rem; }
.dados { border-left: 0.3rem solid var(--preto); padding-left: var(--esp-2); list-style: none; }
.dados li { margin-block: var(--esp-1); }
.resposta { margin-block: var(--esp-3); }
.resposta label { font: 0.8rem var(--fonte-mono); text-transform: uppercase; }
.linha { display: flex; flex-wrap: wrap; gap: var(--esp-2); margin-top: var(--esp-1); }
.linha input { flex: 1 1 10rem; font: 1.6rem var(--fonte-display); padding: var(--esp-2); border: 3px solid var(--preto); background: var(--branco); min-width: 0; }
.feedback { font-weight: 600; font-size: 1.1rem; padding: var(--esp-2); border: 3px solid var(--preto); }
.ok { background: var(--laranja); }
.nao { background: var(--preto); color: var(--branco); }
.btn { display: inline-block; text-decoration: none; }
@media (min-width: 48rem) { h1 { font-size: 3.5rem; } }
</style>
