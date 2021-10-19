<template>
  <div class="text-white p-2">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
        <div class="mb-6">
          <label class="block mb-1" for="email">이름을 알려주세요.</label>
          <ValidationProvider v-slot="{ errors, classes }" name="이름" rules="required">
            <input
              id="name"
              v-model="name"
              class="
                w-60
                border
                rounded
                p-2
                text-black text-sm
                focus:outline-none focus:border-blue-500 focus:shadow-sm
              "
              type="text"
              name="name"
            />
            <transition name="fade">
              <div v-if="errors.length > 0" class="w-60 text-left text-xs md:text-sm text-red-400" :class="classes">
                {{ errors[0] }}
              </div>
            </transition>
          </ValidationProvider>
        </div>
        <div class="mb-6">
          <label class="block mb-1" for="nickname">닉네임을 알려주세요.</label>
          <ValidationProvider v-slot="{ errors, classes }" name="닉네임" rules="required">
            <input
              id="nickname"
              v-model="nickname"
              class="
                w-60
                border
                rounded
                p-2
                text-black text-sm
                focus:outline-none focus:border-blue-500 focus:shadow-sm
              "
              type="text"
            />
            <transition name="fade">
              <div v-if="errors.length > 0" class="w-60 text-left text-xs md:text-sm text-red-400" :class="classes">
                {{ errors[0] }}
              </div>
            </transition>
          </ValidationProvider>
        </div>
        <div class="mb-6">
          <label class="block mb-1" for="phone">전화번호 입력해주세요.</label>
          <ValidationProvider v-slot="{ errors, classes }" name="전화번호" rules="required">
            <input
              id="phone"
              v-model="phone"
              class="
                w-60
                border
                rounded
                p-2
                text-black text-sm
                focus:outline-none focus:border-blue-500 focus:shadow-sm
              "
              type="text"
            />
            <transition name="fade">
              <div v-if="errors.length > 0" class="w-60 text-left text-xs md:text-sm text-red-400" :class="classes">
                {{ errors[0] }}
              </div>
            </transition>
          </ValidationProvider>
        </div>
        <div class="mb-6">
          <label class="block mb-1" for="soldier_id">군번을 입력해주세요.</label>
          <ValidationProvider v-slot="{ errors, classes }" name="군번" rules="required">
            <input
              id="soldier_id"
              v-model="soldier_id"
              class="
                w-60
                border
                rounded
                p-2
                text-black text-sm
                focus:outline-none focus:border-blue-500 focus:shadow-sm
              "
              type="text"
              name="soldier_id"
            />
            <transition name="fade">
              <div v-if="errors.length > 0" class="w-60 text-left text-xs md:text-sm text-red-400" :class="classes">
                {{ errors[0] }}
              </div>
            </transition>
          </ValidationProvider>
        </div>
        <div class="mb-6">
          <label class="block mb-1" for="rank">계급을 입력해주세요.</label>
          <ValidationProvider v-slot="{ errors, classes }" name="계급" rules="required">
            <input
              id="rank"
              v-model="rank"
              class="
                w-60
                border
                rounded
                p-2
                text-black text-sm
                focus:outline-none focus:border-blue-500 focus:shadow-sm
              "
              type="text"
            />
            <transition name="fade">
              <div v-if="errors.length > 0" class="w-60 text-left text-xs md:text-sm text-red-400" :class="classes">
                {{ errors[0] }}
              </div>
            </transition>
          </ValidationProvider>
        </div>
        <div class="flex items-center">
          <NuxtLink to="/register/2" class="rounded bg-yellow-500 text-white text-sm py-2 px-3 mr-2">이전으로</NuxtLink>
          <button type="submit" class="rounded bg-blue-500 text-white py-2 px-3 ml-auto">가입하기</button>
        </div>
      </form>
    </ValidationObserver>
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
    nickname: {
      get() {
        return this.$store.state.register.nickname;
      },
      set(value) {
        this.$store.dispatch('register/setNickname', value);
      },
    },
    phone: {
      get() {
        return this.$store.state.register.phone;
      },
      set(value) {
        this.$store.dispatch('register/setPhone', value);
      },
    },
    rank: {
      get() {
        return this.$store.state.register.rank;
      },
      set(value) {
        this.$store.dispatch('register/setRank', value);
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
      try {
        await this.$auth.register();
        await this.$store.dispatch('register/clear');
      } catch (e) {
        const errorType = e.response.data.error;
        if (errorType === 'EXISTING_EMAIL') {
          this.$toast.error('이미 사용중인 이메일입니다!');
          this.$router.replace('/register/2');
        } else if (errorType === 'EXISTING_SOLDIER_ID') {
          this.$toast.error('이미 사용중인 군번입니다!');
        } else if (errorType === 'INVALID_SOLDIER_ID') {
          this.$toast.error('등록되어 있지 않은 군번입니다!');
        } else {
          this.$toast.error(`에러가 발생했습니다!`);
        }
      }
    },
  },
};
</script>

<style></style>
