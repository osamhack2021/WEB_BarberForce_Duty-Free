<template>
  <div class="flex p-2">
    <!-- thumb section -->
    <div class="review-thumb mr-2">
      <img class="rounded object-cover w-full h-full" :src="review.thumb" />
    </div>
    <!-- content section -->
    <div class="flex-1">
      <div class="flex items-start mb-2">
        <span class="flex items-center text-lg">
          <img class="w-7 h-7 mr-1" src="~/assets/img/star.svg" />
          {{ review.rating.toFixed(1) }}
        </span>
        <span class="text-sm text-gray-300 ml-auto">{{ review.createdAt }}</span>
      </div>
      <div class="text-sm mb-6">{{ review.body }}</div>
      <div class="text-sm">리뷰 남긴이: {{ review.reviewer }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.review-thumb {
  width: 100px;
}

@media (min-width: 768px) {
  .review-thumb {
    width: 105px;
  }
}

@media (min-width: 1024px) {
  .review-thumb {
    width: 110px;
  }
}
</style>
