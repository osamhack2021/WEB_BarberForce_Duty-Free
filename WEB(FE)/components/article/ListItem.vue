<template>
  <NuxtLink
    class="block bg-white border-t last:border-b border-gray-300 py-2 px-4"
    :to="`/board/${boardId}/article/${article._id}`"
  >
    <div class="font-semibold mb-2">{{ article.title }}</div>
    <div class="text-sm text-gray-400 mb-2" v-html="proccesedBody"></div>
    <div class="flex items-center text-xs">
      <div class="text-gray-300">
        <span class="mr-1">{{ proccesedCreatedAt }}</span>
        <span>{{ article.user.rank }} {{ article.user.nickname }}</span>
      </div>
      <div class="flex items-center text-gray-300 ml-auto">
        <span class="flex item-center mr-4">
          <img class="mr-1" src="@/assets/img/recommend.svg" />
          <span>{{ article.recommendation }}</span>
        </span>
        <span class="flex item-center">
          <img class="mr-1" src="@/assets/img/comment.svg" />
          <span>{{ article.comment.length }}</span>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    boardId: {
      type: String,
      required: true,
    },
  },
  computed: {
    proccesedBody() {
      const html = this.article.body.replace(/(\n|\r\n)/g, '<br>');
      const sliced = html.substr(0, 50);
      return sliced;
    },
    proccesedCreatedAt() {
      const created = moment(this.article.createdAt);
      if (moment().startOf('day').isBefore(created)) {
        return created.format('HH:mm');
      } else {
        return created.format('YYYY-MM-DD');
      }
    },
  },
};
</script>

<style></style>
