<script setup>
import { ref, computed } from 'vue'
import SecaoGuia from '@/components/SecaoGuia.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import LabBox from '@/components/LabBox.vue'

// LAB Grid: largura do contêiner controlada por slider
const larguraCont = ref(600)
const minCard = 14 * 16 // 14rem em px
const gap = 16
// Mesma conta do auto-fit: quantas colunas de 224px + gaps cabem
const colunas = computed(() => Math.max(1, Math.floor((larguraCont.value + gap) / (minCard + gap))))

// LAB Flex
const justify = ref('flex-start')
const align = ref('stretch')
const wrap = ref('wrap')

const fontes = [
  { nome: 'CSS-Tricks — A Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
  { nome: 'CSS-Tricks — A Complete Guide to Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' },
  { nome: 'MDN — repeat() / auto-fit', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/repeat' },
]
const codigo = `/* FLEX: uma dimensão (linha OU coluna) */
.barra {
  display: flex;
  justify-content: space-between; /* eixo principal */
  align-items: center;            /* eixo cruzado */
  flex-wrap: wrap;                /* quebra linha se não couber */
  gap: 1rem;
}

/* GRID: duas dimensões (linhas E colunas) */
.cards {
  display: grid;
  /* cria quantas colunas couberem, cada uma com no mínimo 14rem */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}`
</script>

<template>
  <SecaoGuia numero="03" titulo="Flexbox e Grid" id="flexgrid" :fontes="fontes"
    pergunta="Com repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem, a partir de qual largura do contêiner os cards passam de 1 para 2 colunas?">
    <template #explicacao>
      <p><strong>Flexbox</strong> organiza itens numa fila só (horizontal ou vertical) — ótimo para menus, barras, botões lado a lado. <strong>Grid</strong> pensa em linhas e colunas ao mesmo tempo — ótimo para o layout da página e grades de cards. Regra prática: conteúdo decide o tamanho? Flex. Você quer desenhar a grade? Grid.</p>
    </template>

    <CodeBlock :codigo="codigo" />

    <LabBox titulo="Brincando com Flexbox">
      <div class="opcoes">
        <label class="controle">justify-content<select v-model="justify"><option v-for="o in ['flex-start','center','flex-end','space-between','space-around']" :key="o">{{ o }}</option></select></label>
        <label class="controle">align-items<select v-model="align"><option v-for="o in ['stretch','flex-start','center','flex-end']" :key="o">{{ o }}</option></select></label>
        <label class="controle">flex-wrap<select v-model="wrap"><option v-for="o in ['wrap','nowrap']" :key="o">{{ o }}</option></select></label>
      </div>
      <div class="flex-demo" :style="{ justifyContent: justify, alignItems: align, flexWrap: wrap }">
        <span v-for="i in 5" :key="i" :style="{ height: 2 + (i % 3) + 'rem' }">{{ i }}</span>
      </div>
    </LabBox>

    <LabBox titulo="Slider de largura + auto-fit">
      <label class="controle">largura do contêiner: <b>{{ larguraCont }}px</b> → <b>{{ colunas }} coluna(s)</b>
        <input type="range" min="200" max="1000" v-model.number="larguraCont" />
      </label>
      <div class="pista">
        <div class="grid-demo" :style="{ width: larguraCont + 'px' }">
          <div v-for="i in 6" :key="i" class="card">card {{ i }}</div>
        </div>
      </div>
      <p class="mono">O contêiner pode ficar maior que a tela: a pista tem rolagem própria, a página não.</p>
    </LabBox>

    <template #resposta>
      <p>Cada coluna precisa de no mínimo <code>14rem = 14 × 16 = 224px</code>. Duas colunas precisam de duas colunas mínimas <strong>mais um gap</strong> entre elas:</p>
      <p class="conta">224 + 16 + 224 = <strong>464px</strong></p>
      <p>Abaixo de 464px só cabe uma coluna; a partir de 464px o <code>auto-fit</code> cria a segunda. (Para 3 colunas: 3×224 + 2×16 = 704px.) Teste no slider acima.</p>
    </template>
  </SecaoGuia>
</template>

<style scoped>
.opcoes { display: grid; gap: 0 var(--esp-2); }
.flex-demo { display: flex; gap: var(--esp-1); min-height: 9rem; padding: var(--esp-1); background: var(--creme); border: 2px dashed var(--preto); overflow: hidden; }
.flex-demo span { background: var(--laranja); border: 2px solid var(--preto); min-width: 3.5rem; display: grid; place-items: center; font: 1.2rem var(--fonte-display); }
.pista { overflow-x: auto; background: var(--creme); padding: var(--esp-1); border: 2px dashed var(--preto); }
.grid-demo { display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 1rem; outline: 2px solid var(--laranja); }
.card { background: var(--preto); color: var(--branco); padding: var(--esp-2); font-family: var(--fonte-mono); }
.mono { font: 0.8rem var(--fonte-mono); }
.conta { font: 1.6rem var(--fonte-display); }
.conta strong { color: var(--laranja); }
@media (min-width: 36rem) { .opcoes { grid-template-columns: repeat(3, 1fr); } }
</style>
