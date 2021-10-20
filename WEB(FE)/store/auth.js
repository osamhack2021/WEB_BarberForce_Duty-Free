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
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(storagePrefix + 'token', token);
    },
  },
  actions: {
    async load(context) {
      let token = localStorage.getItem(storagePrefix + 'token');
      if (token === 'null') {
        token = JSON.parse(token);
      }
      context.commit('setToken', token);

      const userJSON = localStorage.getItem(storagePrefix + 'user');
      context.commit('setUser', null);
      if (userJSON) {
        const user = JSON.parse(userJSON);
        context.commit('setUser', user);
      }

      if (context.state.token) {
        try {
          const { data: user } = await this.$api.auth.me();
          context.commit('setUser', user);
        } catch (error) {
          if (error.response && error.response.data.error === 'NO_SOCIAL_ID') {
            await $nuxt.$router.replace('/kakao/additional');
          }
          context.commit('setToken', null);
          context.commit('setUser', null);
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
      context.commit('setToken', null);
      context.commit('setUser', null);
      location.reload();
    },
  },
};
