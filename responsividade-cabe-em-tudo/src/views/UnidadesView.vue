<script setup>
import { ref, computed } from 'vue'
import SecaoGuia from '@/components/SecaoGuia.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import LabBox from '@/components/LabBox.vue'
import { useViewport } from '@/composables/useViewport'

// LAB: conversor de unidades → px
const valor = ref(1.5)
const unidade = ref('rem')
const fonteRaiz = ref(16)
const fontePai = ref(20)
const larguraPai = ref(600)
const { largura } = useViewport()

const emPx = computed(() => {
  const v = Number(valor.value)
  switch (unidade.value) {
    case 'rem': return v * fonteRaiz.value
    case 'em': return v * fontePai.value
    case '%': return (v / 100) * larguraPai.value
    case 'vw': return (v / 100) * largura.value
    case 'vh': return (v / 100) * window.innerHeight
    default: return v
  }
})
const explicacao = {
  rem: 'multiplica pela fonte do <html>', em: 'multiplica pela fonte do elemento pai',
  '%': 'porcentagem da largura do pai', vw: '1vw = 1% da largura da janela', vh: '1vh = 1% da altura da janela', px: 'px é px',
}

const tabela = [
  ['px', 'absoluta', 'bordas finas, sombras'],
  ['rem', 'relativa ao <html>', 'fontes e espaçamentos (padrão!)'],
  ['em', 'relativa ao pai', 'padding de botão que cresce com o texto dele'],
  ['%', 'relativa ao pai', 'larguras fluidas'],
  ['fr', 'fração do espaço livre (Grid)', 'colunas'],
  ['vw / vh', '% da janela', 'títulos gigantes, seções de tela cheia'],
  ['dvh', 'altura "dinâmica" da janela', 'tela cheia no celular sem a barra do navegador cortar'],
  ['ch', 'largura do caractere "0"', 'limitar linhas de texto: max-width: 65ch'],
]
const fontes = [
  { nome: 'MDN — CSS values and units', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units' },
  { nome: 'web.dev — Learn CSS: Sizing units', url: 'https://web.dev/learn/css/sizing' },
  { nome: 'Josh Comeau — The surprising truth about pixels and accessibility', url: 'https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/' },
]
const codigo = `html { font-size: 100%; }      /* = 16px, ou o que a pessoa escolheu */
h1   { font-size: 2.5rem; }      /* 2.5 × 16 = 40px */
.btn { padding: 0.5em 1em; }     /* cresce junto com a fonte do botão */
.texto { max-width: 65ch; }      /* ~65 letras por linha */
.hero  { min-height: 100dvh; }   /* tela cheia de verdade no celular */
.grade { grid-template-columns: 1fr 2fr; } /* 1 parte + 2 partes */`
</script>

<template>
  <SecaoGuia numero="02" titulo="Unidades CSS" id="unidades" :fontes="fontes"
    pergunta="Uma pessoa com baixa visão aumenta a fonte no navegador. O texto em px não muda e o em rem aumenta. Por quê?">
    <template #explicacao>
      <p><strong>Absolutas</strong> (px) não dependem de nada. <strong>Relativas</strong> são calculadas a partir de outra coisa: a fonte da raiz, a fonte do pai, a largura do pai ou o tamanho da janela. Responsividade é, em boa parte, escolher a referência certa.</p>
    </template>

    <div class="tabela-wrap">
      <table>
        <thead><tr><th>Unidade</th><th>Relativa a</th><th>Uso típico</th></tr></thead>
        <tbody><tr v-for="l in tabela" :key="l[0]"><td><code>{{ l[0] }}</code></td><td>{{ l[1] }}</td><td>{{ l[2] }}</td></tr></tbody>
      </table>
    </div>

    <CodeBlock :codigo="codigo" />

    <LabBox titulo="Conversor de unidades → px">
      <div class="conv">
        <label class="controle">valor<input type="number" step="0.1" v-model="valor" /></label>
        <label class="controle">unidade
          <select v-model="unidade"><option v-for="u in ['rem', 'em', '%', 'vw', 'vh', 'px']" :key="u">{{ u }}</option></select>
        </label>
        <label v-if="unidade === 'rem'" class="controle">fonte do html: {{ fonteRaiz }}px<input type="range" min="10" max="32" v-model.number="fonteRaiz" /></label>
        <label v-if="unidade === 'em'" class="controle">fonte do pai: {{ fontePai }}px<input type="range" min="10" max="40" v-model.number="fontePai" /></label>
        <label v-if="unidade === '%'" class="controle">largura do pai: {{ larguraPai }}px<input type="range" min="100" max="1200" v-model.number="larguraPai" /></label>
      </div>
      <p class="resultado">{{ valor }}{{ unidade }} = <strong>{{ emPx.toFixed(1) }}px</strong></p>
      <p class="mono" v-html="explicacao[unidade]"></p>
    </LabBox>

    <template #resposta>
      <p>Quando a pessoa aumenta a fonte nas configurações, o navegador muda o tamanho base do <code>&lt;html&gt;</code> (de 16px para, por exemplo, 24px). <code>rem</code> significa "root em": é sempre um múltiplo dessa fonte raiz, então <code>1.5rem</code> vai de 24px para 36px automaticamente.</p>
      <p><code>px</code> é um valor fixo, que não consulta a fonte raiz. Escrever <code>font-size: 16px</code> passa por cima da escolha da pessoa — por isso fontes em rem são uma questão de acessibilidade.</p>
    </template>
  </SecaoGuia>
</template>

<style scoped>
.tabela-wrap { overflow-x: auto; margin-block: var(--esp-3); border: 2px solid var(--preto); }
table { border-collapse: collapse; width: 100%; min-width: 30rem; background: var(--branco); font-size: 0.9rem; }
th { background: var(--preto); color: var(--branco); text-align: left; }
th, td { padding: 0.6rem; border-bottom: 1px solid var(--cinza-claro); }
.conv { display: grid; gap: 0 var(--esp-2); }
.resultado { font: 1.6rem var(--fonte-display); margin-bottom: 0; }
.resultado strong { color: var(--laranja); }
.mono { font: 0.85rem var(--fonte-mono); }
@media (min-width: 36rem) { .conv { grid-template-columns: repeat(3, 1fr); align-items: end; } }
</style>
