export default function ({ $toast, store, redirect }) {
  if (!store.getters['auth/isLoggedIn']) {
    $toast.error('로그인한 상태에서만 접근 가능합니다!');
    return redirect('/login');
  }
}
