<template>
  <div class="text-white p-2">
    <div class="text-lg mb-8">어떤 방법으로 가입하시겠습니까?</div>
    <div class="flex flex-col items-stretch">
      <NuxtLink class="flex mb-2" to="/register/3">
        <img class="h-full w-auto mr-2" src="~/assets/img/kakao.png" alt="Kakao talk" />
        <span class="rounded bg-kakao text-black flex-1 flex items-center justify-center">카카오톡으로 로그인</span>
      </NuxtLink>
      <NuxtLink class="flex mb-2" to="/register/3">
        <img class="h-full w-auto mr-2" src="~/assets/img/email.png" alt="Kakao talk" />
        <span class="rounded bg-email text-white flex-1 flex items-center justify-center">이메일로 로그인</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'slide',
};
</script>

<style></style>
