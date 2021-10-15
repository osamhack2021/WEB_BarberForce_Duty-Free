export default {
  state: () => ({
    opened: false,
  }),
  getters: {},
  mutations: {
    setOpened(state, value) {
      state.opened = value;
    },
  },
  actions: {
    open({ commit }, value) {
      commit('setOpened', true);
    },
    close({ commit }, value) {
      commit('setOpened', false);
    },
    toggle({ state, commit }, value) {
      commit('setOpened', !state.opened);
    },
  },
};
