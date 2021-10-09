<template>
  <div class="text-white p-2">
    <form @submit.prevent="submit">
      <div class="mb-6">
        <label class="block mb-1" for="email">이름을 알려주세요.</label>
        <input
          id="name"
          v-model="name"
          class="w-full border rounded p-2 text-black text-sm focus:outline-none focus:border-blue-500 focus:shadow-sm"
          type="text"
          name="name"
        />
      </div>
      <div class="mb-6">
        <label class="block mb-1" for="soldier_id">군번을 입력해주세요.</label>
        <input
          id="soldier_id"
          v-model="soldier_id"
          class="w-full border rounded p-2 text-black text-sm focus:outline-none focus:border-blue-500 focus:shadow-sm"
          type="text"
          name="soldier_id"
        />
      </div>
      <div class="mb-6">
        <div class="mb-4">휴대전화로 본인인증을 해주세요.</div>
        <div class="flex justify-center">
          <img class="w-16 h-16" src="~/assets/img/pass.png" alt="PASS" />
        </div>
      </div>
      <div class="flex justify-center">
        <button type="submit" class="rounded bg-blue-500 text-white py-2 px-3">가입하기</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  transition: 'slide',
  computed: {
    name: {
      get() {
        return this.$store.state.register.name;
      },
      set(value) {
        this.$store.dispatch('register/setName', value);
      },
    },
    soldier_id: {
      get() {
        return this.$store.state.register.soldier_id;
      },
      set(value) {
        this.$store.dispatch('register/setSoldierId', value);
      },
    },
  },
  mounted() {
    if (this.$store.getters['register/step'] < 3) {
      this.$toast.error('이전 페이지의 입력을 채워주세요!');
      this.$router.replace('/register/2');
    }
  },
  methods: {
    async submit() {
      console.log('submit!');
      try {
        await this.$store.dispatch('register/register');
        this.$toast.success('성공적으로 가입되었습니다!');
        this.$router.replace('/login');
      } catch (e) {
        console.log(e.response);
      }
    },
  },
};
</script>

<style></style>
