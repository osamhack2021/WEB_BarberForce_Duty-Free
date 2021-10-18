<template>
  <main class="container px-2 pt-2 pb-20">
    <CommonHeading class="mb-4">PROFILE</CommonHeading>

    <div class="w-full mx-auto px-6 max-w-sm md:max-w-lg">
      <div class="text-center mb-6">
        <span class="tracking-widest font-bold text-lg">{{ $store.state.auth.user.name }}</span>
        님,
      </div>
      <div class="flex items-center">
        <span class="flex items-center" style="color: #9c9c9c">
          <img src="@/assets/img/edit.png" />
          이름
        </span>
        <span class="ml-auto text-lg">{{ $store.state.auth.user.name }}</span>
      </div>
      <hr class="my-4" style="border-color: #c4c4c4" />
      <div class="flex items-center">
        <span class="flex items-center" style="color: #9c9c9c">
          <img src="@/assets/img/edit.png" />
          닉네임
        </span>
        <span class="ml-auto text-lg">{{ $store.state.auth.user.nickname }}</span>
      </div>
      <hr class="my-4" style="border-color: #c4c4c4" />
      <div class="flex items-center">
        <span class="flex items-center" style="color: #9c9c9c">
          <img src="@/assets/img/edit.png" />
          이메일
        </span>
        <span class="ml-auto sm:text-lg">{{ $store.state.auth.user.email }}</span>
      </div>
      <hr class="my-4" style="border-color: #c4c4c4" />
      <div class="flex items-center">
        <span class="flex items-center" style="color: #9c9c9c">
          <img src="@/assets/img/edit.png" />
          전화번호
        </span>
        <span class="ml-auto text-lg">{{ $store.state.auth.user.phone }}</span>
      </div>
      <hr class="my-4" style="border-color: #c4c4c4" />
      <div class="flex items-center">
        <span class="flex items-center" style="color: #9c9c9c">
          <img src="@/assets/img/edit.png" />
          계급
        </span>
        <span class="ml-auto text-lg">{{ $store.state.auth.user.grade }}</span>
      </div>
      <hr class="my-4" style="border-color: #c4c4c4" />
      <div class="flex justify-end mt-6">
        <NuxtLink to="/profile/edit" class="rounded bg-brand text-white py-2 px-4">수정하기</NuxtLink>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  middleware: 'auth',
};
</script>

<style lang="scss" scoped></style>
