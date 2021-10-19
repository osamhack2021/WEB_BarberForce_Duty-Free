export default {
  state: () => ({
    email: '',
    password: '',
    password_confirm: '',
    name: '',
    soldier_id: '',
    nickname: '',
    phone: '',
    rank: '',
  }),
  getters: {
    // 현재 진행중인 회원가입 단계
    step: state => {
      if (!state.email || !state.password || !state.password_confirm) {
        return 2;
      } else {
        return 3;
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
    setNickname: (state, payload) => {
      state.nickname = payload;
    },
    setPhone: (state, payload) => {
      state.phone = payload;
    },
    setRank: (state, payload) => {
      state.rank = payload;
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
    setNickname: ({ commit }, payload) => {
      commit('setNickname', payload);
    },
    setPhone: ({ commit }, payload) => {
      commit('setPhone', payload);
    },
    setRank: ({ commit }, payload) => {
      commit('setRank', payload);
    },
    clear: ({ commit }) => {
      commit('setEmail', '');
      commit('setPassword', '');
      commit('setPasswordConfirm', '');
      commit('setName', '');
      commit('setSoldierId', '');
      commit('setNickname', '');
      commit('setPhone', '');
      commit('setRank', '');
    },
    async register({ dispatch, state }) {
      await this.$api.auth.register({
        email: state.email,
        password: state.password,
        password_confirm: state.password_confirm,
        name: state.name,
        soldier_id: state.soldier_id,
        nickname: state.nickname,
        phone: state.phone,
        rank: state.rank,
      });
    },
  },
};
