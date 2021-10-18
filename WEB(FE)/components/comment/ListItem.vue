<template>
  <div class="bg-white border-b border-gray-300 sm:border-l sm:border-r py-2 px-4">
    <div class="flex items-center text-xs">
      <span class="flex items-center">
        <img class="mr-1" width="26" height="26" :src="avatar" />
        <span>{{ comment.user.rank }} {{ comment.user.name }}</span>
      </span>
      <span class="text-gray-400 ml-auto">
        {{ createdAt }}
      </span>
    </div>
    <div>{{ comment.body }}</div>
    <div class="flex items-center text-xs">
      <div class="flex items-center text-gray-300 ml-auto">
        <button class="flex item-center" @click="recommend">
          <img class="mr-1" src="@/assets/img/recommend.svg" />
          <span>{{ comment.recommendation }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      return this.comment.user.avatar || '/img/avatar-placeholder.svg';
    },
    createdAt() {
      return moment(this.comment.createdAt).format('YYYY-MM-DD HH:mm');
    },
  },
  methods: {
    async recommend() {
      try {
        await this.$api.comment.recommend(this.comment._id);
        this.$emit('reload');
      } catch (e) {
        this.$toast.error('에러가 발생했습니다!');
      }
    },
  },
};
</script>

<style></style>
