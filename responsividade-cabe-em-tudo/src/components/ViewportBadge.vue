<script setup>
// LAB 3: indicador fixo com a largura da janela e o breakpoint ativo
import { useViewport } from '@/composables/useViewport'
const { largura, breakpoint } = useViewport()
</script>

<template>
  <div class="badge" aria-live="polite">
    <b>{{ breakpoint }}</b> {{ largura }}px
  </div>
</template>

<style scoped>
.badge { position: fixed; right: var(--esp-2); bottom: var(--esp-2); background: var(--laranja); color: var(--preto); font: 0.75rem var(--fonte-mono); padding: 0.35rem 0.6rem; border: 2px solid var(--preto); box-shadow: 3px 3px 0 var(--preto); z-index: 20; }
b { text-transform: uppercase; margin-right: 0.3rem; }
</style>
