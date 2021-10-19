<template>
  <div class="text-white px-12 w-full max-w-sm">
    <div class="sm:text-lg mb-8">어떤 방법으로 가입하시겠습니까?</div>
    <div class="flex flex-col items-stretch">
      <a class="flex mb-2" :href="kakaoLoginURL">
        <img class="h-full w-auto mr-2" src="~/assets/img/kakao.png" alt="Kakao talk" />
        <span class="rounded bg-kakao text-black flex-1 flex items-center justify-center">카카오톡으로 가입</span>
      </a>
      <NuxtLink class="flex mb-2" to="/register/2">
        <img class="h-full w-auto mr-2" src="~/assets/img/email.png" alt="E-mail" />
        <span class="rounded bg-email text-white flex-1 flex items-center justify-center">이메일로 가입</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'slide',
  computed: {
    kakaoLoginURL() {
      return `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.kakaoRestKey}&redirect_uri=${process.env.kakaoRedirectURI}&response_type=code`;
    },
  },
};
</script>

<style></style>
