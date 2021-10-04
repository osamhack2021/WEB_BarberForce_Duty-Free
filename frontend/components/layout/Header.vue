<template>
  <header class="shadow bg-brand">
    <div class="relative flex h-full px-4">
      <button class="focus:outline-none">
        <img src="@/assets/img/menu.svg" style="width: 23px" />
      </button>
      <NuxtLink class="absolute top-1/2 left-1/2" style="transform: translate(-50%, -50%)" to="/">
        <img class="block md:hidden" src="@/assets/img/5_logo_white_figma.svg" alt="BarberForce" height="60"/>
        <img class="hidden md:block" src="@/assets/img/logo_with_title.png" alt="BarberForce" />
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
