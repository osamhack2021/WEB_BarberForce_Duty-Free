<template>
  <div>
    <LayoutHeader ref="header" class="fixed top-0 left-0 w-full" :style="`height: ${headerHeight}px`" />
    <Nuxt class="mt-8" :style="`margin-top: ${headerHeight}px;`" />
    <!-- <LayoutFooter /> -->
  </div>
</template>

<script>
export default {
  computed: {
    headerHeight() {
      return 69;
    },
  },
};
</script>

<style></style>
