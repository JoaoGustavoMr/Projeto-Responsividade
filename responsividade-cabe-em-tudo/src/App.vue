<script setup>
import TheHeader from '@/components/TheHeader.vue'
import ViewportBadge from '@/components/ViewportBadge.vue'
</script>

<template>
  <TheHeader />
  <main class="wrap">
    <RouterView />
  </main>
  <footer class="rodape wrap">
    <span>TELA CHEIA © 2026</span><span>feito com Vue 3 + Vite, mobile-first</span>
  </footer>
  <ViewportBadge />
</template>
