import { ref, computed, onMounted, onUnmounted } from 'vue'

// Mesmos breakpoints usados no main.css (em px, pois window.innerWidth é em px)
export const BREAKPOINTS = [ { nome: 'xs', min: 0 }, { nome: 'sm', min: 576 }, { nome: 'md', min: 768 }, { nome: 'lg', min: 1024 }, { nome: 'xl', min: 1280 } ]

export function useViewport() {
  const largura = ref(window.innerWidth)
  const atualizar = () => (largura.value = window.innerWidth)
  onMounted(() => window.addEventListener('resize', atualizar))
  onUnmounted(() => window.removeEventListener('resize', atualizar))
  const breakpoint = computed(() => [...BREAKPOINTS].reverse().find((b) => largura.value >= b.min).nome)
  return { largura, breakpoint }
}
