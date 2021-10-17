<template>
  <transition name="fade">
    <div v-if="opened" class="modal flex justify-center items-center">
      <div class="rounded shadow border bg-white">
        <slot :close="close"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: String,
      default: '',
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 8501;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
