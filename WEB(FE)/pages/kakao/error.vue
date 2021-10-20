<template>
  <main class="h-screen w-screen flex flex-col items-center justify-center bg-brand text-white p-3">
    <!-- logo -->
    <img class="mb-12" src="@/assets/img/2_logo+title_figma_embarrassed.svg" width="203" alt="BarberForce" />
    <div class="text-center">
      <div class="text-2xl font-bold mb-2">이메일은 필수입니다!</div>
      <div class="text-gray-100">
        카카오 로그인으로 저희 사이트에 접속하려면, <br class="md:hidden" />
        이메일을 필수로 제공하셔야 합니다.
      </div>
      <NuxtLink class="inline-block underline mt-8" to="/auth">다시 로그인하기</NuxtLink>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'empty',
};
</script>

<style></style>
