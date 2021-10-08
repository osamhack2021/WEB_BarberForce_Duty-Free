<template>
  <header class="shadow bg-brand">
    <div class="relative flex h-full px-4">
      <button class="focus:outline-none">
        <img src="@/assets/img/menu.svg" style="width: 23px" />
      </button>
      <NuxtLink class="absolute top-1/2 left-1/2" style="transform: translate(-50%, -50%)" to="/">
        <img class="block sm:hidden" src="@/assets/img/7_logo_white_small_figma.svg" alt="BarberForce" />
        <img class="hidden sm:block" src="@/assets/img/8_logo+title_white_small_horizontal.svg" alt="BarberForce" />
        <!--두번째 단계에서부터 title까지 보이도록 수정-->
      </NuxtLink>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  z-index: 99999;
}
</style>
