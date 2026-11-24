<script setup>
defineProps({ codigo: { type: String, required: true }, linguagem: { type: String, default: 'css' } })
</script>
<template>
  <figure class="code"><figcaption>{{ linguagem }}</figcaption><pre><code>{{ codigo }}</code></pre></figure>
</template>
<style scoped>
.code { margin-block: var(--esp-3); border: 2px solid var(--preto); }
figcaption { background: var(--preto); color: var(--laranja); font: 0.7rem var(--fonte-mono); padding: 0.3rem var(--esp-2); text-transform: uppercase; }
pre { margin: 0; padding: var(--esp-2); overflow-x: auto; background: var(--creme); font: 0.85rem/1.55 var(--fonte-mono); }
</style>
