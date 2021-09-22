<template>
  <main class="h-screen w-screen flex flex-col items-center justify-center p-3">
    <!-- logo -->
    <img class="w-25 h-25" src="~/assets/img/logo.svg" alt="Barber Force" />
    <!-- links -->
    <div class="flex flex-col items-stretch w-3/4 max-w-md text-white text-center mt-20">
      <!-- login via kakao -->
      <NuxtLink class="flex mb-2" to="/">
        <img class="h-full w-auto mr-2" src="~/assets/img/kakao.png" alt="Kakao talk" />
        <span class="rounded bg-kakao text-black flex-1 flex items-center justify-center">카카오톡으로 로그인</span>
      </NuxtLink>
      <!-- login via email -->
      <NuxtLink class="flex mb-2" to="/">
        <img class="h-full w-auto mr-2" src="~/assets/img/email.png" alt="Kakao talk" />
        <span class="rounded bg-email text-white flex-1 flex items-center justify-center">이메일로 로그인</span>
      </NuxtLink>
      <!-- register -->
      <NuxtLink class="rounded border border-white p-3" to="/register">회원 가입</NuxtLink>
    </div>
    <!-- background -->
    <div class="absolute top-0 left-0 w-full h-full bg-auth-overlay"></div>
    <div class="absolute top-0 left-0 w-full h-full bg-auth"></div>
  </main>
</template>

<script>
export default {
  layout: 'empty',
};
</script>

<style scoped>
.bg-auth-overlay {
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
}
.bg-auth {
  background: url(~/assets/img/auth_bg.jpg) center/cover no-repeat;
  z-index: -2;
}
</style>
