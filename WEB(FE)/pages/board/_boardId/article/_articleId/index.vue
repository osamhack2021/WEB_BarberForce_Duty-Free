<template>
  <div class="w-full max-w-lg mx-auto mb-32">
    <section class="flex items-center p-5">
      <NuxtLink class="flex-1" :to="`/board/${boardId}`">
        <img src="@/assets/img/left-arrow.svg" />
      </NuxtLink>
      <CommonHeading>POST</CommonHeading>
      <div class="flex-1"></div>
    </section>
    <main>
      <ArticleDetail
        v-if="article"
        :article="article"
        :board-id="boardId"
        :recommended="recommend_flag"
        @refetch="$fetch()"
      />
      <template v-if="article">
        <CommentListItem v-for="comment in article.comment" :key="comment._id" :comment="comment" @reload="$fetch()" />
      </template>
      <form class="w-full max-w-lg mx-auto mt-3" @submit.prevent="createComment">
        <textarea
          class="w-full rounded border border-gray-300 bg-white p-2 mb-1 focus:border-brand focus:outline-none"
          rows="3"
          v-model="newComment"
        ></textarea>
        <div class="flex justify-end">
          <button class="rounded bg-brand text-white py-2 px-5" type="submit">댓글 작성</button>
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
      this.article = data.posts;
      this.recommend_flag = data.recommend_flag;
    } catch (e) {
      console.error(e);
      this.$toast.error('에러가 발생했습니다!');
    }
  },
  methods: {
    async createComment() {
      try {
        if (this.newComment.trim() === '') {
          this.$toast.error('댓글 내용을 입력해주세요!');
          return;
        }
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
