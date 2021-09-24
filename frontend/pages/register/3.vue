<template>
  <div class="p-2">
    <form @submit.prevent>
      <div class="mb-6">
        <label class="block mb-1" for="email">이메일을 입력해주세요.</label>
        <input
          id="email"
          v-model="email"
          class="w-full border rounded p-2 text-sm focus:outline-none focus:border-blue-500 focus:shadow-sm"
          type="text"
          name="email"
        />
      </div>
      <div class="mb-6">
        <label class="block mb-1" for="password">비밀번호를 입력해주세요.</label>
        <input
          id="password"
          v-model="password"
          class="w-full border rounded p-2 text-sm focus:outline-none focus:border-blue-500 focus:shadow-sm"
          type="password"
          name="password"
        />
      </div>
      <div class="mb-6">
        <label class="block mb-1" for="password_confirm">비밀번호를 다시 입력해주세요.</label>
        <input
          id="password_confirm"
          v-model="password_confirm"
          class="w-full border rounded p-2 text-sm focus:outline-none focus:border-blue-500 focus:shadow-sm"
          type="password"
          name="password_confirm"
        />
      </div>
      <div class="flex justify-end">
        <NuxtLink class="rounded bg-blue-500 text-white py-2 px-3" to="/register/4">다음</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  transition: 'slide',
  computed: {
    email: {
      get() {
        return this.$store.state.register.email;
      },
      set(value) {
        this.$store.dispatch('register/setEmail', value);
      },
    },
    password: {
      get() {
        return this.$store.state.register.password;
      },
      set(value) {
        this.$store.dispatch('register/setPassword', value);
      },
    },
    password_confirm: {
      get() {
        return this.$store.state.register.password_confirm;
      },
      set(value) {
        this.$store.dispatch('register/setPasswordConfirm', value);
      },
    },
  },
};
</script>

<style></style>
