<template>
  <div>
    <LayoutHeader ref="header" class="fixed top-0 left-0 w-full" />
    <Nuxt class="mt-8" :style="`margin-top: ${headerHeight}px;`" />
    <!-- <LayoutFooter /> -->
  </div>
</template>

<script>
export default {
  computed: {
    headerHeight() {
      // [TODO] 서버사이드 렌더링때 header의 height을 가져올 순 없나..?
      // console.log(this.$refs.header.clientHeight);
      return 72;
    },
  },
};
</script>

<style></style>
