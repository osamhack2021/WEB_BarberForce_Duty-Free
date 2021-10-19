<template>
  <article class="bg-white border-t border-b sm:border border-gray-300 py-2 px-4">
    <div class="flex items-center mb-2">
      <span class="font-semibold">{{ article.title }}</span>
      <span class="text-gray-300 text-xs ml-auto">{{ createdAt }}</span>
    </div>
    <div class="flex items-center text-xs mb-2">
      <img class="mr-1" width="26" height="26" :src="avatar" />
      <span>{{ article.user.rank }} {{ article.user.name }}</span>
    </div>
    <div class="flex justify-center">
      <img :src="thumb" />
    </div>
    <div class="text-sm text-gray-700 mb-2" v-html="proccesedBody"></div>
    <div class="flex items-center text-xs">
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
  </article>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    proccesedBody() {
      const html = this.article.body.replace(/(\n|\r\n)/g, '<br>');
      return html;
    },
    avatar() {
      return this.article.user.avatar || '/img/avatar-placeholder.svg';
    },
    createdAt() {
      return moment(this.article.createdAt).format('YYYY-MM-DD HH:mm');
    },
    thumb() {
      return this.article.thumb || '/img/thumb-placeholder.png';
    },
  },
};
</script>

<style></style>
