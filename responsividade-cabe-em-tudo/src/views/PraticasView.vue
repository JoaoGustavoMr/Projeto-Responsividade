<script setup>
import { ref } from 'vue'
import SecaoGuia from '@/components/SecaoGuia.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import LabBox from '@/components/LabBox.vue'

// LAB: v-for com e sem :key
const inicial = () => [ { id: 1, nome: 'Gato' }, { id: 2, nome: 'Cachorro' }, { id: 3, nome: 'Coruja' } ]
const semKey = ref(inicial())
const comKey = ref(inicial())
const versao = ref(0)
function removerPrimeiro() { semKey.value.shift(); comKey.value.shift() }
function resetar() { semKey.value = inicial(); comKey.value = inicial(); versao.value++ }

const fontes = [
  { nome: 'Vue.js — Style Guide', url: 'https://vuejs.org/style-guide/' },
  { nome: 'Vue.js — List Rendering: key', url: 'https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key' },
  { nome: 'Vue Router — Lazy Loading Routes', url: 'https://router.vuejs.org/guide/advanced/lazy-loading.html' },
  { nome: 'web.dev — Web Vitals', url: 'https://web.dev/articles/vitals' },
]
const codigo = `// Componentes em PascalCase e com 2+ palavras: CardAnimal.vue, TheHeader.vue
const props = defineProps({
  nome:  { type: String, required: true },   // props tipadas
  idade: { type: Number, default: 0 },
})
const emit = defineEmits(['remover'])         // eventos declarados

// :key estável (id), nunca o índice
<CardAnimal v-for="a in animais" :key="a.id" :nome="a.nome" @remover="tirar(a.id)" />

// Rota carregada só quando alguém visita (menos JS no início = LCP melhor)
{ path: '/imagens', component: () => import('@/views/ImagensView.vue') }`
const vitals = [
  ['LCP', 'Largest Contentful Paint', 'quanto demora o maior elemento aparecer', '≤ 2,5s'],
  ['INP', 'Interaction to Next Paint', 'quanto demora reagir a um clique/toque', '≤ 200ms'],
  ['CLS', 'Cumulative Layout Shift', 'quanto o layout pula sozinho', '≤ 0,1'],
]
</script>

<template>
  <SecaoGuia numero="05" titulo="Boas práticas em Vue" id="praticas" :fontes="fontes"
    pergunta="Lista de animais com v-for sem :key, cada item com um campo de texto. A pessoa digita no segundo e o primeiro é removido. O que acontece com o texto?">
    <template #explicacao>
      <p>Este próprio guia segue a estrutura do <code>npm create vue@latest</code>: <code>views/</code> para páginas, <code>components/</code> para peças reutilizáveis, <code>stores/</code> (Pinia) para estado global — o contador de "lidas" no topo — e <code>composables/</code> para lógica reutilizável, como o <code>useViewport</code> do selo laranja. As cores e espaçamentos vivem em variáveis no <code>:root</code> (design tokens).</p>
    </template>

    <CodeBlock linguagem="vue / js" :codigo="codigo" />

    <div class="vitals">
      <div v-for="v in vitals" :key="v[0]" class="vital">
        <b>{{ v[0] }}</b><small>{{ v[1] }}</small><p>{{ v[2] }}</p><span>bom: {{ v[3] }}</span>
      </div>
    </div>

    <LabBox titulo="v-for com e sem :key">
      <p class="mono">1) digite algo no campo do <b>Cachorro</b> nas duas listas · 2) clique em remover</p>
      <div class="botoes"><button class="btn" @click="removerPrimeiro">remover o primeiro</button><button class="btn" @click="resetar">resetar</button></div>
      <div class="listas" :key="versao">
        <div>
          <p class="tag tag--escura">SEM :key</p>
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <label v-for="a in semKey" class="item">{{ a.nome }}<input placeholder="apelido" /></label>
        </div>
        <div>
          <p class="tag">COM :key="a.id"</p>
          <label v-for="a in comKey" :key="a.id" class="item">{{ a.nome }}<input placeholder="apelido" /></label>
        </div>
      </div>
    </LabBox>

    <template #resposta>
      <p>Sem <code>:key</code>, o Vue reaproveita os elementos <strong>pela posição</strong>. Ao remover o primeiro animal, ele não apaga o primeiro bloco: atualiza os nomes de cada posição e apaga o <em>último</em> elemento. Os <code>&lt;input&gt;</code> não são ligados a nenhum dado, então continuam onde estavam — o texto digitado no 2º campo (Cachorro) agora aparece ao lado da <strong>Coruja</strong>, no animal errado.</p>
      <p>Com <code>:key="a.id"</code> o Vue sabe qual elemento pertence a qual animal, remove exatamente o do Gato e o texto continua com o Cachorro.</p>
    </template>
  </SecaoGuia>
</template>

<style scoped>
.vitals { display: grid; gap: var(--esp-2); margin-block: var(--esp-3); }
.vital { border: 2px solid var(--preto); padding: var(--esp-2); background: var(--branco); }
.vital b { font: 2rem var(--fonte-display); color: var(--laranja); display: block; }
.vital small { font-family: var(--fonte-mono); }
.vital span { font: 700 0.8rem var(--fonte-mono); }
.botoes { display: flex; flex-wrap: wrap; gap: var(--esp-1); }
.listas { display: grid; gap: var(--esp-3); margin-top: var(--esp-3); }
.item { display: grid; gap: 0.3rem; margin-top: var(--esp-1); font-weight: 600; }
.mono { font: 0.85rem var(--fonte-mono); }
@media (min-width: 48rem) {
  .vitals { grid-template-columns: repeat(3, 1fr); }
  .listas { grid-template-columns: 1fr 1fr; }
}
</style>
