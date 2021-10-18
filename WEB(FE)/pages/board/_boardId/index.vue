<template>
  <div>
    <!-- heading section -->
    <section class="container p-5">
      <!-- category selection -->
      <nav class="mb-4 ml-3">
        <div class="font-bold mb-1 tracking-wider">커뮤니티</div>
        <div class="flex flex-col items-start text-sm tracking-wide ml-4">
          <NuxtLink class="board-link font-semibold" to="/board/1">● 자유게시판</NuxtLink>
          <NuxtLink class="board-link font-semibold" to="/board/2">● 머리깎고 뭐하지?</NuxtLink>
        </div>
      </nav>
      <!-- controls -->
      <div class="flex justify-center items-end mb-4">
        <div class="flex-1 flex items-center">
          <img class="mr-1" src="@/assets/img/order.png" />
          <select class="bg-transparent text-sm" style="color: #838383" v-model="orderBy">
            <option value="time:desc">시간순</option>
            <option value="recommendation:desc">추천순</option>
          </select>
        </div>
        <CommonHeading>PROFILE</CommonHeading>
        <div class="flex-1 flex justify-end">
          <NuxtLink :to="`/board/${boardId}/create`">
            <img src="@/assets/img/write.png" />
          </NuxtLink>
        </div>
      </div>
    </section>
    <main class="container">
      <template v-if="articles.length === 0">
        <div class="px-4">
          게시글이 없습니다! <br />
          첫 번째 게시글을 작성해주세요!
        </div>
      </template>
      <ArticleListItem v-for="article in articles" :key="article._id" :article="article" :boardId="boardId" />
      <!-- todo: pagination ? -->
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderBy: 'time:desc',
      articles: [],
    };
  },
  computed: {
    boardId() {
      return this.$route.params.boardId;
    },
  },
  fetch() {
    const [orderBy, order] = this.orderBy.split(':');
    const { data } = this.$api.board.articles(this.boardId, orderBy, order);
    this.articles = data.posts;
  },
};
</script>

<style scoped>
a.board-link:not(.nuxt-link-active) {
  color: #c4c4c4;
  font-weight: normal;
}
</style>
