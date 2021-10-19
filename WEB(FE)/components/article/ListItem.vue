<template>
  <NuxtLink
    class="flex bg-white border-t last:border-b sm:border-l sm:border-r border-gray-300 py-2 pr-4 pl-2"
    :to="`/board/${boardId}/article/${article._id}`"
  >
    <img class="block rounded object-cover article-thumb mr-3" :src="thumb" />
    <div class="flex flex-col flex-1">
      <div class="font-semibold mb-2 overflow-hidden overflow-ellipsis" style="max-height:24px;">{{ article.title }}</div>
      <div
        class="text-sm text-gray-400 overflow-hidden overflow-ellipsis mb-2"
        style="max-height: 40px"
        v-html="proccesedBody"
      ></div>
      <div class="flex items-center text-xs mt-auto">
        <div class="text-gray-300">
          <span class="mr-1">{{ proccesedCreatedAt }}</span>
          <span>{{ article.user.rank }} {{ article.user.name }}</span>
        </div>
        <div class="flex items-center text-gray-300 ml-auto">
          <span class="flex item-center mr-4">
            <img width="14" class="mr-1" src="@/assets/img/recommend.svg" />
            <span>{{ article.recommendation }}</span>
          </span>
          <span class="flex item-center">
            <img width="14" class="mr-1" src="@/assets/img/comment.svg" />
            <span>{{ article.comment.length }}</span>
          </span>
        </div>
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
    thumb() {
      return this.article.thumb || '/img/thumb-placeholder.png';
    },
  },
};
</script>

<style scoped>
.article-thumb {
  width: 100px;
  height: 100px;
}
@media (min-width: 640px) {
  .article-thumb {
    width: 150px;
    height: 150px;
  }
}
@media (min-width: 850px) {
  .article-thumb {
    width: 200px;
    height: 200px;
  }
}
</style>
