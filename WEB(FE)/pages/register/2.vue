<template>
  <div class="text-white p-2">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(next)">
        <div class="mb-6">
          <label class="block mb-1" for="email">이메일을 입력해주세요.</label>
          <ValidationProvider v-slot="{ errors, classes }" name="이메일" rules="required|email">
            <input
              id="email"
              v-model="email"
              class="
                w-60
                border
                rounded
                p-2
                text-black text-sm
                focus:outline-none focus:border-blue-500 focus:shadow-sm
              "
              type="text"
              name="email"
            />
            <transition name="fade">
              <div v-if="errors.length > 0" class="w-60 text-left text-xs md:text-sm text-red-400" :class="classes">
                {{ errors[0] }}
              </div>
            </transition>
          </ValidationProvider>
        </div>
        <div class="mb-6">
          <label class="block mb-1" for="password">비밀번호를 입력해주세요.</label>
          <ValidationProvider v-slot="{ errors, classes }" vid="password" name="비밀번호" rules="required|min:6">
            <input
              id="password"
              v-model="password"
              class="
                w-60
                border
                rounded
                p-2
                text-black text-sm
                focus:outline-none focus:border-blue-500 focus:shadow-sm
              "
              type="password"
              name="password"
            />
            <transition name="fade">
              <div v-if="errors.length > 0" class="w-60 text-left text-xs md:text-sm text-red-400" :class="classes">
                {{ errors[0] }}
              </div>
            </transition>
          </ValidationProvider>
        </div>
        <div class="mb-6">
          <label class="block mb-1" for="password_confirm">비밀번호를 다시 입력해주세요.</label>
          <ValidationProvider v-slot="{ errors, classes }" name="비밀번호 확인" rules="required|confirmed:password">
            <input
              id="password_confirm"
              v-model="password_confirm"
              class="
                w-60
                border
                rounded
                p-2
                text-black text-sm
                focus:outline-none focus:border-blue-500 focus:shadow-sm
              "
              type="password"
              name="password_confirm"
            />
            <transition name="fade">
              <div v-if="errors.length > 0" class="w-60 text-left text-xs md:text-sm text-red-400" :class="classes">
                {{ errors[0] }}
              </div>
            </transition>
          </ValidationProvider>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="rounded bg-blue-500 text-white py-2 px-3">다음</button>
        </div>
      </form>
    </ValidationObserver>
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
  methods: {
    next() {
      this.$router.push('/register/3');
    },
  },
};
</script>

<style scoped></style>
