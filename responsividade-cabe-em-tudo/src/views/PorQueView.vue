<script setup>
import { ref } from 'vue'
import SecaoGuia from '@/components/SecaoGuia.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import LabBox from '@/components/LabBox.vue'

const comViewport = ref(true)
const fontes = [
  { nome: 'MDN — Viewport meta tag', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag' },
  { nome: 'web.dev — Responsive web design basics', url: 'https://web.dev/articles/responsive-web-design-basics' },
]
const codigo = `<!-- No <head> do index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- width=device-width → a largura da "tela virtual" = largura real do aparelho -->
<!-- initial-scale=1     → começa sem zoom -->`
</script>

<template>
  <SecaoGuia numero="01" titulo="Por que responsividade importa" id="porque" :fontes="fontes"
    pergunta="O site tem media queries, mas não tem a meta viewport. No celular ele aparece como a versão de computador, minúscula. Por quê?">
    <template #explicacao>
      <p>Hoje a maioria das visitas chega pelo celular. Um site responsivo é o <strong>mesmo</strong> site se reorganizando para caber na tela que estiver na frente: colunas viram pilha, menu vira botão, texto continua legível sem zoom.</p>
    </template>

    <CodeBlock linguagem="html" :codigo="codigo" />

    <LabBox titulo="Celular com e sem viewport">
      <label class="controle"><span><input type="checkbox" v-model="comViewport" /> meta viewport ligada</span></label>
      <div class="fone">
        <div class="fone__tela">
          <div class="site" :class="{ 'site--encolhido': !comViewport }">
            <strong>Loja do Zé</strong>
            <p>{{ comViewport ? 'Texto legível, layout de celular.' : 'Renderizado em 980px e encolhido…' }}</p>
            <div class="site__cols"><span></span><span></span><span></span></div>
          </div>
        </div>
      </div>
    </LabBox>

    <template #resposta>
      <p>Sem a meta tag, o navegador do celular finge ter uma tela de cerca de <strong>980px</strong> (o "viewport de layout" padrão, pensado para sites antigos). Ele desenha a página nessa largura e depois encolhe tudo para caber nos ~390px reais. Como 980px é maior que os <code>min-width</code> das media queries, o CSS de computador é aplicado — por isso aparece a versão desktop em miniatura.</p>
      <p><code>width=device-width</code> diz: "use a largura real do aparelho como viewport". Aí as media queries passam a enxergar ~390px e o layout de celular funciona.</p>
    </template>
  </SecaoGuia>
</template>

<style scoped>
.fone { width: 12rem; margin-inline: auto; border: 0.6rem solid var(--preto); border-radius: 1.5rem; padding-block: 1rem; background: var(--preto); }
.fone__tela { background: var(--branco); height: 18rem; overflow: hidden; }
.site { padding: 0.8rem; font-size: 0.9rem; transform-origin: top left; transition: transform 0.3s; }
.site--encolhido { width: 980px; transform: scale(0.18); font-size: 1rem; }
.site__cols { display: grid; grid-template-columns: 1fr; gap: 0.4rem; }
.site--encolhido .site__cols { grid-template-columns: repeat(3, 1fr); }
.site__cols span { height: 3rem; background: var(--laranja); }
</style>
