<template>
  <div class="p-2">
    <form @submit.prevent>
      <div class="mb-6">
        <label class="block mb-1" for="email">이름을 알려주세요.</label>
        <input
          id="name"
          class="w-full border rounded p-2 text-sm focus:outline-none focus:border-blue-500 focus:shadow-sm"
          type="text"
          name="name"
        />
      </div>
      <div class="mb-6">
        <label class="block mb-1" for="password">군번을 입력해주세요.</label>
        <input
          id="soldier_id"
          class="w-full border rounded p-2 text-sm focus:outline-none focus:border-blue-500 focus:shadow-sm"
          type="text"
          name="soldier_id"
        />
      </div>
      <div class="mb-6">
        <div class="mb-4">휴대전화로 본인인증을 해주세요.</div>
        <div class="flex justify-center">
          <img class="w-16 h-16" src="~/assets/img/pass.png" alt="PASS" />
        </div>
      </div>
      <div class="flex justify-center">
        <button class="rounded bg-blue-500 text-white py-2 px-3">가입하기</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  transition: 'slide',
};
</script>

<style></style>
