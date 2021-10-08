const storagePrefix = 'bf_auth_';

export default {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isLoggedIn(state) {
      return !!state.user && !!state.token;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem(storagePrefix + 'user', JSON.stringify(user));
      // [] Axios에 Authorization 헤더 추가 => 이 부분 plugin에서 자동 되는지 확인
    },
    clearUser(state) {
      localStorage.removeItem(storagePrefix + 'user');
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(storagePrefix + 'token', token);
    },
    clearToken(state) {
      localStorage.removeItem(storagePrefix + 'token');
    },
  },
  actions: {
    async load(context) {
      const token = localStorage.getItem(storagePrefix + 'token');
      context.commit('setToken', token);
      const userJSON = localStorage.getItem(storagePrefix + 'user');
      context.commit('setUser', null);
      if (userJSON) {
        const user = JSON.parse(userJSON);
        context.commit('setUser', user);
      }

      try {
        const user = await this.$api.auth.me();
        context.commit('setUser', user);
      } catch (error) {
        if (error.response.status === 401) {
          context.commit('clearToken');
          context.commit('clearUser');
          location.reload();
        }
      }
    },
    async login(context, credentials) {
      const { data: loginData } = await this.$api.auth.login(credentials);
      context.commit('setToken', loginData.token);
      const { data: meData } = await this.$api.auth.me();
      context.commit('setUser', meData);
    },
    logout(context) {
      context.commit('clearToken');
      context.commit('clearUser');
      location.reload();
    },
  },
};
