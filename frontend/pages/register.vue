<template>
  <main class="h-screen w-screen flex items-center justify-center p-3 overflow-hidden">
    <NuxtChild />
  </main>
</template>

<script>
export default {
  layout: 'empty',
  middleware({ redirect }) {
    // 부모 페이지로 들어오면 잘못된 접근. 회원가입 첫번째 페이지로 보내기
    return redirect('/register/1');
  },
};
</script>

<style>
.slide-enter-active {
  animation: slide-in 0.5s;
}
.slide-leave-active {
  animation: slide-out 0.5s;
}
@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(100vw);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes slide-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100vw);
  }
}
</style>
