<template>
  <main class="h-screen w-screen flex items-center justify-center p-3 bg-auth overflow-hidden">
    <NuxtChild />
  </main>
</template>

<script>
export default {
  layout: 'empty',
  middleware: 'guest',
};
</script>

<style scoped>
.bg-auth {
  background-color: #406d96;
}
</style>

<style>
.slide-enter-active {
  animation: slide-in 0.25s;
}
.slide-leave-active {
  animation: slide-out 0.25s;
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
