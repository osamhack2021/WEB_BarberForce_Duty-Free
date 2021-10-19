<template>
  <div class="container pb-20">
    <section class="flex items-center p-5">
      <NuxtLink class="flex-1" :to="`/board/${boardId}/article/${articleId}`">
        <img src="@/assets/img/left-arrow.svg" />
      </NuxtLink>
      <CommonHeading>EDIT POST</CommonHeading>
      <div class="flex-1"></div>
    </section>
    <main class="w-full px-4 max-w-md mx-auto">
      <template v-if="article">
        <form @submit.prevent="submit">
          <div class="mb-2">
            <ValidationProvider v-slot="{ errors, classes }" name="제목" rules="required">
              <input
                v-model="article.title"
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
                v-model="article.body"
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
            <NuxtLink
              :to="`/board/${boardId}/article/${articleId}`"
              type="submit"
              class="rounded bg-red-500 text-white py-2 px-3 mr-2"
              >취소</NuxtLink
            >
            <button type="submit" class="rounded bg-brand text-white py-2 px-3">수정</button>
          </div>
        </form>
      </template>
    </main>
  </div>
</template>

<script>
export default {
  middleware: [
    'auth',
    async ({ store, app, route }) => {
      try {
        const { data } = await app.$api.board.article(route.params.articleId);
        const post = data.posts;
        if (post.user._id !== store.state.auth.user._id) {
          app.$toast.error('자신의 글만 편집할 수 있습니다!');
          app.router.back();
        }
      } catch (e) {
        console.error(e);
        app.router.back();
      }
    },
  ],
  data() {
    return {
      article: null,
    };
  },
  computed: {
    boardId() {
      return this.$route.params.boardId;
    },
    articleId() {
      return this.$route.params.articleId;
    },
  },
  async fetch() {
    try {
      const { data } = await this.$api.board.article(this.articleId);
      this.article = data.posts;
    } catch (e) {
      console.error(e);
      this.$toast.error('에러가 발생했습니다!');
    }
  },
  methods: {
    async submit() {
      try {
        await this.$api.board.update(this.articleId, this.article);
        this.$toast.success('글을 수정했습니다!');
        this.$router.replace(`/board/${this.boardId}/article/${this.articleId}`);
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
