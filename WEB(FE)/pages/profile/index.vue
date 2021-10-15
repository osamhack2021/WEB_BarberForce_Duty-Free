<template>
  <main class="container px-2 pt-2 pb-20">
    <CommonHeading class="mb-4">PROFILE</CommonHeading>
    <div class="mb-1">
      <div class="font-bold text-lg mb-1">내 정보</div>
      <div class="rounded white border p-2">
        <div class="flex">
          <div class="mr-6">
            <div class="font-bold">이름</div>
            <div class="font-bold">이메일</div>
          </div>
          <div class="flex-1">
            <div>{{ $store.state.auth.user.name }}</div>
            <div>{{ $store.state.auth.user.email }}</div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="$store.state.auth.user.social">
      <div class="mt-2">
        <span class="inline-block rounded bg-kakao text-white font-semibold py-1 px-2 mr-1">카카오톡</span>으로 로그인한
        계정입니다!
      </div>
    </template>
  </main>
</template>

<script>
export default {
  middleware: 'auth',
};
</script>

<style lang="scss" scoped></style>
