<template>
  <span class="inline-block rounded-full text-white text-sm py-1 px-3" :class="classes">{{ text }}</span>
</template>

<script>
export default {
  props: {
    not: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      if (!this.not) {
        return 'bg-blue-500';
      } else {
        return 'bg-red-500';
      }
    },
    text() {
      if (!this.not) {
        return '방역/소독';
      } else {
        return '방역/소독 X';
      }
    },
  },
};
</script>
