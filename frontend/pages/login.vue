<template>
  <main class="h-screen w-screen flex flex-col items-center justify-center bg-auth p-3">
    <!-- logo -->
    <img src="@/assets/img/1_logo+title_figma.svg" width="203" alt="BarberForce" />
    <!-- form -->
    <div class="flex flex-col items-stretch w-3/4 max-w-md text-white text-center mt-20">
      <div class="mb-3">
        <input
          v-model="credentials.email"
          class="rounded text-black p-2 focus:outline-none focus:ring focus:ring-white focus:ring-opacity-30"
          type="text"
          placeholder="E-mail"
        />
      </div>
      <div class="mb-3">
        <input
          v-model="credentials.password"
          class="rounded text-black p-2 focus:outline-none focus:ring focus:ring-white focus:ring-opacity-30"
          type="password"
          placeholder="PW"
        />
      </div>
      <div class="flex flex-col items-center">
        <div class="mb-5">
          <input id="remember" v-model="remember" type="checkbox" />
          <label for="remember">로그인 유지</label>
        </div>
        <button class="rounded-lg border border-white text-white font-medium py-1 px-7 mb-7" @click="login">
          Login
        </button>
        <NuxtLink class="text-sm underline" to="/register/1">회원가입</NuxtLink>
      </div>
    </div>
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
.bg-auth {
  background-color: #406d96;
}
</style>
