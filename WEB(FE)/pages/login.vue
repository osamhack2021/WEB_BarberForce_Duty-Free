<template>
  <main class="h-screen w-screen flex flex-col items-center justify-center bg-brand p-3">
    <!-- logo -->
    <img src="@/assets/img/1_logo+title_figma.svg" width="203" alt="BarberForce" />
    <!-- form -->
    <div class="flex flex-col items-stretch w-3/4 max-w-md text-white text-center mt-16">
      <div class="mb-3">
        <input
          v-model="credentials.email"
          class="rounded text-black p-2 focus:outline-none focus:ring focus:ring-white focus:ring-opacity-30"
          type="text"
          placeholder="E-mail"
        />
      </div>
      <div class="mb-8">
        <input
          v-model="credentials.password"
          class="rounded text-black p-2 focus:outline-none focus:ring focus:ring-white focus:ring-opacity-30"
          type="password"
          placeholder="PW"
        />
      </div>
      <div class="flex flex-col items-center">
        <div class="mb-8">
          <input id="remember" v-model="remember" type="checkbox" />
          <label for="remember">로그인 유지</label>
        </div>
        <button class="rounded-lg border border-white text-white font-medium py-1 px-7 mb-8" @click="login">
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
  middleware: 'guest',

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
    async login() {
      try {
        await this.$auth.login(this.credentials);
      } catch (e) {
        if (e.response && e.response.data && e.response.data.message) {
          const message = e.response.data.message;
          if (message === 'Unvalid email') {
            this.$toast.error('해당 이메일과 일치하는 계정이 없습니다!');
          } else if (message === 'Wrong password') {
            this.$toast.error('비밀번호가 맞지 않습니다!');
          }
        } else {
          this.$toast.error('알 수 없는 에러가 발생했습니다!');
        }
        this.credentials.password = '';
      }
    },
  },
};
</script>
