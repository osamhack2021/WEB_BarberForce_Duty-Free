<template>
  <div class="bg-white border-b border-gray-300 sm:border-l sm:border-r py-2 px-4">
    <div class="flex items-center text-xs mb-1">
      <span class="flex items-center">
        <img class="mr-1" width="26" height="26" :src="avatar" />
        <span>{{ comment.user.rank }} {{ comment.user.name }}</span>
      </span>
      <span class="text-gray-300 ml-auto">
        {{ createdAt }}
      </span>
    </div>
    <div class="text-sm mb-1">{{ comment.body }}</div>
    <div class="flex items-center text-xs">
      <template v-if="mine">
        <button class="text-xs rounded bg-brand text-white py-1 px-2 mr-2" @click="openEditModal">수정</button>
        <button class="text-xs rounded bg-red-500 text-white py-1 px-2" @click="remove">삭제</button>
        <CommonModal :opened="editModal">
          <div class="p-2">
            <textarea
              class="rounded border border-gray-300 p-2 text-sm"
              type="text"
              v-model="this.commentForm.body"
            ></textarea>
            <div class="flex justify-end items-center">
              <button class="text-xs rounded bg-red-500 text-white py-1 px-2 mr-2" @click="closeEditModal">취소</button>
              <button class="text-xs rounded bg-brand text-white py-1 px-2" @click="editSubmit">수정</button>
            </div>
          </div>
        </CommonModal>
      </template>
      <div class="flex items-center text-gray-300 ml-auto">
        <button class="flex items-center" @click="recommend">
          <img v-if="recommended" class="mr-1" src="@/assets/img/recommend.svg" />
          <img v-else class="mr-1" src="@/assets/img/recommend-empty.svg" />
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
  data() {
    console.log(this.comment.body);
    return {
      commentForm: {
        body: this.comment.body,
      },
      editModal: false,
    };
  },
  computed: {
    avatar() {
      return this.comment.user.avatar || '/img/avatar-placeholder.svg';
    },
    createdAt() {
      return moment(this.comment.createdAt).format('YYYY-MM-DD HH:mm');
    },
    recommended() {
      return !!this.comment.recommend_user.find(user => user._id === this.$store.state.auth.user._id);
    },
    mine() {
      return this.comment.user._id === this.$store.state.auth.user._id;
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
    openEditModal() {
      this.editModal = true;
    },
    closeEditModal() {
      this.editModal = false;
      this.commentForm.body = this.comment.body;
    },
    async editSubmit() {
      try {
        await this.$api.comment.update(this.comment._id, this.commentForm);
        this.closeEditModal();
        this.$toast.success('댓글을 수정했습니다!');
        this.$emit('reload');
      } catch (e) {
        console.error(e);
        this.$toast.error('에러가 발생했습니다!');
      }
    },
    async remove() {
      try {
        if (confirm('정말 삭제하시겠습니까?')) {
          await this.$api.comment.delete(this.comment._id);
          this.$emit('reload');
        }
      } catch (e) {
        console.error(e);
        this.$toast.error('에러가 발생했습니다!');
      }
    },
  },
};
</script>

<style></style>
