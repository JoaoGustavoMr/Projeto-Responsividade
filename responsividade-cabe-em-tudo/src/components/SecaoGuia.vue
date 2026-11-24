<script setup>
// Molde de toda seção: explicação, código, pergunta-guia e fontes
import { computed } from 'vue'
import { useGuiaStore } from '@/stores/guia'

const props = defineProps({
  numero: { type: String, required: true },
  titulo: { type: String, required: true },
  id: { type: String, required: true },
  pergunta: { type: String, required: true },
  fontes: { type: Array, default: () => [] }, // [{ nome, url }]
})
const emit = defineEmits(['lida'])
const guia = useGuiaStore()
const lida = computed(() => guia.lidas.includes(props.id))
function marcar() { guia.alternar(props.id); emit('lida', props.id) }
</script>

<template>
  <article class="secao">
    <header class="secao__topo">
      <span class="secao__num">{{ numero }}</span>
      <h1>{{ titulo }}</h1>
    </header>

    <div class="secao__explica"><slot name="explicacao" /></div>

    <slot />

    <section class="pergunta">
      <p class="tag">PERGUNTA-GUIA</p>
      <h2>{{ pergunta }}</h2>
      <div class="pergunta__resposta"><slot name="resposta" /></div>
    </section>

    <section class="fontes">
      <p class="tag tag--escura">FONTES</p>
      <ul><li v-for="f in fontes" :key="f.url"><a :href="f.url" target="_blank" rel="noopener">{{ f.nome }}</a></li></ul>
    </section>

    <button class="btn" :class="{ 'btn--ok': lida }" @click="marcar">{{ lida ? '✓ lida' : 'marcar como lida' }}</button>
  </article>
</template>

<style scoped>
.secao__topo { display: grid; gap: var(--esp-1); margin-block: var(--esp-4) var(--esp-3); }
.secao__num { font: 4rem/0.8 var(--fonte-display); color: var(--laranja); -webkit-text-stroke: 2px var(--preto); }
h1 { font: 2rem/1 var(--fonte-display); text-transform: uppercase; letter-spacing: -0.02em; }
.secao__explica { font-size: 1.1rem; max-width: 65ch; }
.pergunta { background: var(--preto); color: var(--branco); padding: var(--esp-3); margin-block: var(--esp-4); }
.pergunta h2 { font-size: 1.15rem; margin-block: var(--esp-2); color: var(--laranja-claro); }
.pergunta__resposta { max-width: 70ch; }
.fontes ul { padding-left: 1.2rem; }
.fontes a { color: var(--preto); word-break: break-word; }
.btn { margin-top: var(--esp-3); }
@media (min-width: 48rem) {
  .secao__topo { grid-template-columns: auto 1fr; align-items: end; gap: var(--esp-3); }
  .secao__num { font-size: 7rem; }
  h1 { font-size: 3rem; }
  .pergunta { padding: var(--esp-4); }
}
</style>
