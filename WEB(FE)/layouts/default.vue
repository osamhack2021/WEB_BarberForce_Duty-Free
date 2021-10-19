<template>
  <div class="flex flex-col" style="min-height:100vh">
    <LayoutHeader ref="header" class="fixed top-0 left-0 w-full" :style="`height: ${headerHeight}px`" />
    <Nuxt class="mt-8" :style="`margin-top: ${headerHeight}px;`" />
    <LayoutFooter class="mt-auto" />
  </div>
</template>

<script>
export default {
  middleware({ store }) {
    store.dispatch('menubar/close');
  },
  computed: {
    headerHeight() {
      return 69;
    },
  },
};
</script>

<style></style>
