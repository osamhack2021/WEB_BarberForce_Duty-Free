<template>
  <main class="h-screen w-screen flex flex-col items-center justify-center bg-auth p-3">
    <!-- logo -->
    <img class="mb-12" src="@/assets/img/logo_set_white_bg_error.png" alt="Barber Force" />
    <!-- errors -->
    <div class="text-center text-white">
      <h1 class="text-3xl font-bold mb-1">{{ error.statusCode }}</h1>
      <div class="mb-6">{{ message }}</div>
      <NuxtLink class="underline" to="/">홈페이지로 가기</NuxtLink>
    </div>
  </main>
</template>

<script>
export default {
  props: ['error'],
  layout: 'empty',
  computed: {
    message() {
      if (this.error.statusCode === 404) {
        return '해당 페이지를 찾을 수 없습니다!';
      } else {
        return '에러가 발생했습니다. 다시 시도해주세요.';
      }
    },
  },
};
</script>

<style scoped>
.bg-auth {
  background-color: #406d96;
}
</style>
