<template>
  <div class="menubar bg-brand text-white py-6 px-5" :class="{ closed: !opened }">
    <div class="flex items-end">
      <div class="flex items-end">
        <span class="text-2xl font-bold tracking-widest">{{ $store.state.auth.user.name }}</span>
        <span class="ml-1">님, 환영합니다!</span>
      </div>
      <button class="rounded bg-red-500 text-white text-sm py-1 px-3 ml-auto" @click="logout">로그아웃</button>
    </div>
    <hr class="border-opacity-20 my-3" />
    <div class="flex items-center">
      <NuxtLink class="flex items-center text-lg" to="/profile">
        <img class="mr-2" width="28" src="@/assets/img/user.svg" />
        마이페이지
      </NuxtLink>
      <NuxtLink class="flex items-center text-lg ml-auto" to="/history">
        <img class="mr-2" width="28" src="@/assets/img/history.svg" />
        내 예약
      </NuxtLink>
    </div>
    <hr class="border-opacity-20 my-5" />
    <div>
      <NuxtLink class="flex px-2 py-3 transition-colors hover:bg-black hover:bg-opacity-10" to="/">
        <img class="mr-2" width="22" src="@/assets/img/home.svg" />
        홈페이지
      </NuxtLink>
      <NuxtLink class="flex px-2 py-3 transition-colors hover:bg-black hover:bg-opacity-10" to="/barbers">
        <img class="mr-2" width="22" src="@/assets/img/partnership.svg" />
        우리부대 제휴미용실
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: '메인페이지',
          to: '/',
        },
        {
          title: '우리부대 제휴미용실',
          to: '/barbers',
        },
      ],
    };
  },
  computed: {
    opened() {
      return this.$store.state.menubar.opened;
    },
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>

<style scoped>
.menubar {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: calc(100vh - 69px);
  transition: transform 0.5s;
  z-index: -1;
}
.menubar.closed {
  transform: translate(-100%, 0);
}

@media (min-width: 400px) {
  .menubar {
    max-width: 360px;
  }
}
</style>
