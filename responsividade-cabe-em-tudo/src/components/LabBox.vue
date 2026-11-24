<script setup>
defineProps({ titulo: { type: String, required: true } })
</script>
<template>
  <section class="lab">
    <p class="lab__tag">LABORATÓRIO</p>
    <h3>{{ titulo }}</h3>
    <slot />
  </section>
</template>
<style scoped>
.lab { border: 3px solid var(--preto); background: var(--branco); padding: var(--esp-3); margin-block: var(--esp-4); box-shadow: 0.5rem 0.5rem 0 var(--laranja); }
.lab__tag { display: inline-block; background: var(--laranja); font: 700 0.7rem var(--fonte-mono); padding: 0.2rem 0.5rem; margin: 0; }
h3 { font: 1.4rem var(--fonte-display); margin-block: var(--esp-2); }
</style>
