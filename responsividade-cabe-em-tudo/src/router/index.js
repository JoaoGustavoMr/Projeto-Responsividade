import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// Só a Home é carregada de cara; as outras rotas viram arquivos separados (lazy loading)
const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: 'Início' } },
  { path: '/por-que', name: 'porque', component: () => import('@/views/PorQueView.vue'), meta: { title: '01 Por que importa', n: '01' } },
  { path: '/unidades', name: 'unidades', component: () => import('@/views/UnidadesView.vue'), meta: { title: '02 Unidades CSS', n: '02' } },
  { path: '/flex-grid', name: 'flexgrid', component: () => import('@/views/FlexGridView.vue'), meta: { title: '03 Flexbox e Grid', n: '03' } },
  { path: '/imagens', name: 'imagens', component: () => import('@/views/ImagensView.vue'), meta: { title: '04 Imagens', n: '04' } },
  { path: '/boas-praticas', name: 'praticas', component: () => import('@/views/PraticasView.vue'), meta: { title: '05 Boas práticas Vue', n: '05' } },
  { path: '/desafio', name: 'desafio', component: () => import('@/views/DesafioView.vue'), meta: { title: 'Desafio', n: '!!' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
router.afterEach((to) => { document.title = `${to.meta.title} — Tela Cheia` })
export default router
