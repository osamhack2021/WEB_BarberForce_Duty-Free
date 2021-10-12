export default {
  state: () => ({
    email: '',
    password: '',
    password_confirm: '',
    name: '',
    soldier_id: '',
  }),
  getters: {
    email: state => state.email,
    password: state => state.password,
    password_confrim: state => state.password_confrim,
    name: state => state.name,
    soldier_id: state => state.soldier_id,
    // 현재 진행중인 회원가입 단계
    step: state => {
      if (!state.email || !state.password || !state.password_confirm) {
        return 2;
      } else if (!state.name || !state.soldier_id) {
        return 3;
      } else {
        return 1;
      }
    },
  },
  mutations: {
    setEmail: (state, payload) => {
      state.email = payload;
    },
    setPassword: (state, payload) => {
      state.password = payload;
    },
    setPasswordConfirm: (state, payload) => {
      state.password_confirm = payload;
    },
    setName: (state, payload) => {
      state.name = payload;
    },
    setSoldierId: (state, payload) => {
      state.soldier_id = payload;
    },
  },
  actions: {
    setEmail: ({ commit }, payload) => {
      commit('setEmail', payload);
    },
    setPassword: ({ commit }, payload) => {
      commit('setPassword', payload);
    },
    setPasswordConfirm: ({ commit }, payload) => {
      commit('setPasswordConfirm', payload);
    },
    setName: ({ commit }, payload) => {
      commit('setName', payload);
    },
    setSoldierId: ({ commit }, payload) => {
      commit('setSoldierId', payload);
    },
    clear: ({ commit }) => {
      commit('setEmail', '');
      commit('setPassword', '');
      commit('setPasswordConfirm', '');
      commit('setName', '');
      commit('setSoldierId', '');
    },
    async register({ dispatch, state }) {
      await this.$api.auth.register({
        email: state.email,
        password: state.password,
        password_confirm: state.password_confirm,
        name: state.name,
        soldier_id: state.soldier_id,
      });
      dispatch('clear');
    },
  },
};
