export default function ({ $toast, route, store, redirect }) {
  if (!store.getters['auth/isLoggedIn']) {
    if (route.path !== '/') $toast.error('로그인한 상태에서만 접근 가능합니다!');
    return redirect('/auth');
  }
}
