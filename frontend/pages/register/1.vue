<template>
  <div class="text-white p-2">
    <div class="text-lg mb-8"><span class="font-bold">Barber Force</span>에 가입하시겠습니까?</div>
    <div class="flex justify-center items-center">
      <NuxtLink class="text-center mx-3" to="/register/2">
        <img class="w-24 h-24 mb-1" src="@/assets/img/soldier.png" alt="Soldier" />
        <div class="font-medium">군 장병</div>
      </NuxtLink>
      <NuxtLink class="text-center mx-3" to="/register/2">
        <img class="w-24 h-24 mb-1" src="@/assets/img/barber.png" alt="Barber" />
        <div class="font-medium">이발사</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'slide',
};
</script>

<style></style>
