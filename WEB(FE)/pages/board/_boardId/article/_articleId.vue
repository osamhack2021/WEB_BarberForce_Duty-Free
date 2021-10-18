<template>
  <div class="container">
    <section class="flex items-center p-5">
      <NuxtLink class="flex-1" :to="`/board/${boardId}`">
        <img src="@/assets/img/left-arrow.svg" />
      </NuxtLink>
      <CommonHeading>POST</CommonHeading>
      <div class="flex-1"></div>
    </section>
    <main>
      <ArticleDetail v-if="article" :article="article" />
      <CommentListItem v-for="comment in article.comment" :key="comment._id" :comment="comment" @reload="$fetch()" />
    </main>
    <form class="comment-form text-sm border-t" @submit.prevent="createComment">
      <div class="container p-1">
        <input class="rounded border w-full border-gray-300 bg-white text-sm mb-1" v-model="newComment" type="text" />
        <div class="flex justify-end">
          <button class="rounded bg-brand text-white py-2 px-3" type="submit">작성</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      article: null,
      newComment: '',
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
      this.article = data.post;
    } catch (e) {
      console.error(e);
      this.$toast.error('에러가 발생했습니다!');
    }
  },
  methods: {
    async createComment() {
      try {
        await this.$api.comment.create(this.articleId, { body: this.newComment });
        this.$toast.success('댓글을 등록했습니다!');
        this.$fetch();
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
