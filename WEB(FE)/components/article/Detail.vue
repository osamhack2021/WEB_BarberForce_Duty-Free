<template>
  <article class="bg-white border-t border-b sm:border border-gray-300 py-2 px-4">
    <div class="flex items-center mb-2">
      <span class="font-semibold">{{ article.title }}</span>
      <span class="text-gray-300 text-xs ml-auto">{{ createdAt }}</span>
    </div>
    <div class="flex items-center text-xs mb-2">
      <img class="mr-1" width="26" height="26" :src="avatar" />
      <span>{{ article.user.rank }} {{ article.user.name }}</span>
      <template v-if="mine">
        <NuxtLink
          :to="`/board/${boardId}/article/${article._id}/edit`"
          class="text-xs rounded bg-brand text-white py-1 px-2 ml-auto"
          >수정</NuxtLink
        >
        <button class="text-xs rounded bg-red-500 text-white py-1 px-2 ml-2" @click="remove">삭제</button>
      </template>
    </div>
    <template v-if="hasThumb">
      <div class="flex justify-center">
        <img :src="thumb" />
      </div>
    </template>
    <div class="text-sm text-gray-700 mb-2" v-html="proccesedBody"></div>
    <div class="flex items-center text-xs">
      <div class="flex items-center text-gray-300 ml-auto">
        <button class="flex items-center mr-4" @click="recommend">
          <img v-if="recommended" class="mr-1" src="@/assets/img/recommend.svg" />
          <img v-else class="mr-1" src="@/assets/img/recommend-empty.svg" />
          <span>{{ article.recommendation }}</span>
        </button>
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
    boardId: {
      type: String,
      required: true,
    },
    recommended: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async recommend() {
      try {
        await this.$api.board.recommend(this.article._id);
        this.$emit('refetch');
      } catch (e) {
        console.error(e);
        this.$toast.error('에러가 발생했습니다!');
      }
    },
    async remove() {
      try {
        if (confirm('정말 삭제하시겠습니까?')) {
          await this.$api.board.delete(this.article._id);
          this.$router.replace(`/board/${this.boardId}`);
        }
      } catch (e) {
        console.error(e);
        this.$toast.error('에러가 발생했습니다!');
      }
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
    hasThumb() {
      return !!this.article.thumb;
    },
    thumb() {
      return this.article.thumb || '/img/thumb-placeholder.png';
    },
    mine() {
      return this.article.user._id === this.$store.state.auth.user._id;
    },
  },
};
</script>

<style></style>
