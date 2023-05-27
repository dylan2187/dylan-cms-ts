import { defineStore } from 'pinia'

const useCountStore = defineStore('count', {
  state() {
    return {
      count: 100,
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
  },
  actions: {
    changeCountAction(newCount: number) {
      this.count = newCount
    },
    countPlusOneAction() {
      this.count++
    },
  },
})

export default useCountStore
