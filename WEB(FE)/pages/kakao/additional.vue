<template>
  <div class="container">
    당신의 토큰: {{ token }}<br />
    입니다 허허허허허허허허<br />
    <br />
    여기는 처음 카카오로그인 하는 사람이 오는 페이지<br />
    여기서 추가데이터 입력 받을거임
  </div>
</template>

<script>
export default {
  computed: {
    token() {
      return this.$route.query.token;
    },
  },
};
</script>

<style></style>
