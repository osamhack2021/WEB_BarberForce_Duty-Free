<template>
  <main class="h-screen w-screen flex flex-col items-center justify-center p-3">
    <!-- logo -->
    <img class="w-25 h-25" src="~/assets/img/logo.svg" alt="Barber Force" />
    <!-- form -->
    <div class="flex flex-col items-stretch w-3/4 max-w-md text-white text-center mt-20">
      <div class="mb-3">
        <input v-model="credentials.email" class="rounded text-black p-2" type="text" placeholder="E-mail" />
      </div>
      <div class="mb-3">
        <input v-model="credentials.password" class="rounded text-black p-2" type="password" placeholder="PW" />
      </div>
      <div class="flex flex-col items-center">
        <div class="mb-5">
          <input id="remember" v-model="remember" type="checkbox" />
          <label for="remember">로그인 유지</label>
        </div>
        <button class="rounded-xl border border-white text-white font-medium py-1 px-7 mb-7" @click="login">
          Login
        </button>
        <NuxtLink class="text-sm underline" to="/register/1">회원가입</NuxtLink>
      </div>
    </div>
    <!-- background -->
    <div class="absolute top-0 left-0 w-full h-full bg-auth-overlay"></div>
    <div class="absolute top-0 left-0 w-full h-full bg-auth"></div>
  </main>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      remember: false,
    };
  },
  methods: {
    login() {
      console.log(this.credentials, this.remember);
    },
  },
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
