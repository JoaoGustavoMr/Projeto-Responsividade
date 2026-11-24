<script setup>
import { ref } from 'vue'
import SecaoGuia from '@/components/SecaoGuia.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import LabBox from '@/components/LabBox.vue'

// LAB: imagem com atraso, com e sem width/height
const comDimensoes = ref(false)
const carregada = ref(false)
const chave = ref(0)
const src = ref('')
const URL_IMG = 'https://picsum.photos/id/1062/800/450'
function recarregar() {
  carregada.value = false
  src.value = ''
  chave.value++ // :key novo força o Vue a recriar a <img>
  setTimeout(() => { src.value = `${URL_IMG}?v=${chave.value}` }, 1500) // atraso proposital
}
recarregar()

const fit = ref('cover')
const fontes = [
  { nome: 'web.dev — Optimize Cumulative Layout Shift', url: 'https://web.dev/articles/optimize-cls' },
  { nome: 'MDN — Responsive images', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images' },
  { nome: 'web.dev — Browser-level image lazy loading', url: 'https://web.dev/articles/browser-level-image-lazy-loading' },
]
const codigo = `<!-- width/height = proporção reservada antes de baixar -->
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
  sizes="(min-width: 48rem) 50vw, 100vw"
  width="800" height="450"
  loading="lazy"   <!-- NÃO use na imagem principal do topo (piora o LCP) -->
  alt="Montanhas ao pôr do sol">

img   { max-width: 100%; height: auto; }      /* nunca estoura o pai */
.capa { aspect-ratio: 16 / 9; object-fit: cover; } /* recorta sem distorcer */`
</script>

<template>
  <SecaoGuia numero="04" titulo="Imagens responsivas" id="imagens" :fontes="fontes"
    pergunta="O texto aparece primeiro e, quando a imagem carrega, empurra tudo para baixo. Por que isso acontece sem width e height? Qual métrica do Google mede isso?">
    <template #explicacao>
      <p>Imagem responsiva é aquela que <strong>encolhe junto com a tela</strong> (<code>max-width: 100%</code>), <strong>guarda seu espaço</strong> antes de chegar (<code>width</code>/<code>height</code> ou <code>aspect-ratio</code>) e, se possível, <strong>vem no tamanho certo</strong> para cada aparelho (<code>srcset</code>). <code>loading="lazy"</code> adia imagens fora da tela — mas não use na imagem principal, que deve aparecer logo.</p>
    </template>

    <CodeBlock linguagem="html + css" :codigo="codigo" />

    <LabBox titulo="O texto que pula">
      <label class="controle"><span><input type="checkbox" v-model="comDimensoes" @change="recarregar" /> img com width="800" height="450"</span></label>
      <button class="btn" @click="recarregar">recarregar imagem (1,5s de atraso)</button>
      <div class="artigo">
        <p class="mono">{{ carregada ? 'imagem chegou' : 'carregando…' }}</p>
        <img v-if="src" :key="chave" :src="src" alt="Paisagem de exemplo"
          v-bind="comDimensoes ? { width: 800, height: 450 } : {}" @load="carregada = true" />
        <div v-else-if="comDimensoes" class="reserva"></div>
        <p><strong>Este parágrafo</strong> é o texto que você estava lendo. Sem dimensões, ele pula quando a imagem chega. Com dimensões, o espaço já estava reservado e nada se mexe.</p>
      </div>
    </LabBox>

    <LabBox titulo="object-fit numa caixa 1:1">
      <label class="controle">object-fit<select v-model="fit"><option v-for="o in ['cover','contain','fill','none']" :key="o">{{ o }}</option></select></label>
      <img class="quadrado" :style="{ objectFit: fit }" src="https://picsum.photos/id/1025/800/450" width="800" height="450" alt="Cachorro" loading="lazy" />
    </LabBox>

    <template #resposta>
      <p>Sem <code>width</code> e <code>height</code>, o navegador não sabe o tamanho da imagem até baixá-la. Ele desenha o texto ocupando espaço zero no lugar dela; quando a imagem chega, ele recalcula o layout e empurra tudo para baixo.</p>
      <p>Com os dois atributos, o navegador calcula a proporção (800÷450) e reserva a altura certa desde o início — e o <code>height: auto</code> do CSS mantém isso responsivo. Esse "pulo" é medido pelo <strong>CLS (Cumulative Layout Shift)</strong>, uma das Core Web Vitals; o ideal é ficar abaixo de 0,1.</p>
    </template>
  </SecaoGuia>
</template>

<style scoped>
.artigo { margin-top: var(--esp-2); border-left: 0.3rem solid var(--laranja); padding-left: var(--esp-2); }
.reserva { aspect-ratio: 800 / 450; background: var(--creme); }
.quadrado { width: 100%; max-width: 18rem; aspect-ratio: 1; height: auto; border: 3px solid var(--preto); background: var(--creme); }
.mono { font: 0.8rem var(--fonte-mono); }
</style>
