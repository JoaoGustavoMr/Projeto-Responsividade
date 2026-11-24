import { defineStore } from 'pinia'

// Estado global: quais seções a pessoa já marcou como lidas (salvo no localStorage)
export const useGuiaStore = defineStore('guia', {
  state: () => ({ lidas: JSON.parse(localStorage.getItem('lidas') || '[]') }),
  getters: { total: (s) => s.lidas.length },
  actions: {
    alternar(nome) {
      this.lidas = this.lidas.includes(nome) ? this.lidas.filter((n) => n !== nome) : [...this.lidas, nome]
      localStorage.setItem('lidas', JSON.stringify(this.lidas))
    },
  },
})
