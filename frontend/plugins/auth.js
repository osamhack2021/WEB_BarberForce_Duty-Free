export default function ({ $toast, store, redirect }, inject) {
  const redirectTo = {
    login: '/',
    register: '/login',
    logout: '/auth',
  };

  const auth = {
    async login(data) {
      await store.dispatch('auth/login', data);
      $toast.success(`환영합니다! "${store.state.auth.user.name}" 님!`);
      redirect(redirectTo.login);
    },
    async register() {
      await store.dispatch('register/register');
      $toast.success(`가입되었습니다! 가입하신 아이디로 로그인해주세요!`);
      redirect(redirectTo.register);
    },
    logout() {
      store.dispatch('auth/logout');
      $toast.success(`로그아웃되었습니다!`);
      redirect(redirectTo.logout);
    },
  };

  inject('auth', auth);
}
