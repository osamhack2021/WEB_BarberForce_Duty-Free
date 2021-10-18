<template>
  <div class="container pb-20">
    <section class="flex items-center p-5">
      <NuxtLink class="flex-1" :to="`/board/${boardId}`">
        <img src="@/assets/img/left-arrow.svg" />
      </NuxtLink>
      <CommonHeading>CREATE POST</CommonHeading>
      <div class="flex-1"></div>
    </section>
    <main class="w-full px-4 max-w-md mx-auto">
      <form action="" @submit.prevent="submit">
        <div class="mb-2">
          <ValidationProvider v-slot="{ errors, classes }" name="제목" rules="required">
            <input
              v-model="newArticle.title"
              class="w-full border rounded p-2 focus:outline-none focus:border-blue-500 focus:shadow-sm"
              type="text"
              placeholder="제목을 입력해주세요."
            />
            <transition name="fade">
              <div v-if="errors.length > 0" class="w-60 text-left text-xs md:text-sm text-red-400" :class="classes">
                {{ errors[0] }}
              </div>
            </transition>
          </ValidationProvider>
        </div>
        <div class="mb-5">
          <ValidationProvider v-slot="{ errors, classes }" name="내용" rules="required">
            <textarea
              v-model="newArticle.body"
              class="w-full border rounded p-2 focus:outline-none focus:border-blue-500 focus:shadow-sm"
              rows="10"
              placeholder="내용을 입력해주세요."
            ></textarea>
            <transition name="fade">
              <div v-if="errors.length > 0" class="w-60 text-left text-xs md:text-sm text-red-400" :class="classes">
                {{ errors[0] }}
              </div>
            </transition>
          </ValidationProvider>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="rounded bg-brand text-white py-2 px-3">작성</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      newArticle: {
        title: '',
        body: '',
      },
    };
  },
  computed: {
    boardId() {
      return this.$route.params.boardId;
    },
  },
  methods: {
    async submit() {
      try {
        await this.$api.board.create(this.boardId, this.newArticle);
        this.$toast.success('새 글을 작성했습니다!');
        this.$router.replace(`/board/${this.boardId}`);
      } catch (e) {
        console.error(e);
        this.$toast.error('에러가 발생했습니다!');
      }
    },
  },
};
</script>

<style scoped>
.comment-form {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fffff5;
}
</style>
