<template>
  <!-- heading section -->
  <main class="container p-5">
    <!-- category selection -->
    <nav class="mb-4 ml-3">
      <div class="font-bold mb-1 tracking-wider">커뮤니티</div>
      <div class="flex flex-col items-start text-sm tracking-wide ml-4">
        <NuxtLink class="font-semibold" to="/board/1">● 자유게시판</NuxtLink>
        <NuxtLink class="font-semibold" to="/board/2">● 머리깎고 뭐하지?</NuxtLink>
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
  </main>
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
    const articles = this.$api.board.articles(this.boardId);
    this.articles = articles;
  },
};
</script>

<style scoped>
a:not(.nuxt-link-active) {
  color: #c4c4c4;
  font-weight: normal;
}
</style>
