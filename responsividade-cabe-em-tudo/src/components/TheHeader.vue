<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGuiaStore } from '@/stores/guia'

const aberto = ref(false)
const route = useRoute()
const guia = useGuiaStore()
watch(() => route.path, () => (aberto.value = false)) // fecha o menu ao trocar de página

const links = [
  { to: '/por-que', label: 'Por quê' }, { to: '/unidades', label: 'Unidades' },
  { to: '/flex-grid', label: 'Flex/Grid' }, { to: '/imagens', label: 'Imagens' },
  { to: '/boas-praticas', label: 'Vue' }, { to: '/desafio', label: 'Desafio' },
]
</script>

<template>
  <header class="topo">
    <div class="wrap topo__linha">
      <RouterLink to="/" class="logo">TELA<span>CHEIA</span></RouterLink>
      <span class="contador" title="seções lidas">{{ guia.total }}/5 lidas</span>
      <button class="menu-btn" :aria-expanded="aberto" aria-controls="nav" @click="aberto = !aberto">
        {{ aberto ? 'FECHAR' : 'MENU' }}
      </button>
      <nav id="nav" class="nav" :class="{ 'nav--aberto': aberto }">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to">{{ l.label }}</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.topo { background: var(--preto); color: var(--branco); position: sticky; top: 0; z-index: 10; border-bottom: 0.25rem solid var(--laranja); }
.topo__linha { display: flex; flex-wrap: wrap; align-items: center; gap: var(--esp-2); padding-block: var(--esp-2); }
.logo { font-family: var(--fonte-display); font-size: 1.25rem; color: var(--branco); text-decoration: none; letter-spacing: -0.02em; }
.logo span { color: var(--laranja); }
.contador { font-family: var(--fonte-mono); font-size: 0.75rem; color: var(--cinza-claro); margin-left: auto; }
.menu-btn { font: 700 0.8rem var(--fonte-mono); background: var(--laranja); color: var(--preto); border: 0; padding: var(--esp-1) var(--esp-2); cursor: pointer; }
.nav { display: none; width: 100%; flex-direction: column; }
.nav--aberto { display: flex; }
.nav a { color: var(--branco); text-decoration: none; padding: var(--esp-2) 0; border-top: 1px solid var(--cinza-escuro); font-family: var(--fonte-mono); font-size: 0.9rem; }
.nav a.router-link-active { color: var(--laranja); }

/* A partir de 768px o menu aparece inteiro e o botão some */
@media (min-width: 48rem) {
  .menu-btn { display: none; }
  .contador { order: 3; margin-left: var(--esp-2); }
  .nav { display: flex; flex-direction: row; width: auto; margin-left: auto; gap: var(--esp-3); }
  .nav a { border: 0; padding: 0; }
  .nav a:hover { color: var(--laranja); }
}
</style>
