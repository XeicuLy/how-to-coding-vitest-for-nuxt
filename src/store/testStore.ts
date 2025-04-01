export const useTestStore = defineStore('test', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    incrementCount() {
      this.count++;
    },
  },
});
