<template>
  <div class="rounded border shadow bg-white cursor-pointer" @click="toggle">
    <div class="flex p-2">
      <div class="barber-thumb">
        <img class="rounded object-cover w-full h-full" :src="barber.thumb" />
      </div>
      <div class="relative flex-1 px-2">
        <div class="flex items-center p-1 sm:p-2 md:p-4">
          <span class="text-lg font-bold">{{ barber.title }}</span>
          <span class="flex items-center text-base ml-auto">
            <img class="w-5 h-5 mr-1" src="~/assets/img/star.svg" />
            {{ barber.rating }}
          </span>
        </div>
        <hr class="" />
        <div class="flex items-center text-sm p-1 sm:p-2 md:p-4">
          <span class="flex items-center">
            <img class="w-4 h-4 mr-1" src="~/assets/img/place.svg" />
            {{ barber.location }}
          </span>
          <span class="flex items-center ml-auto">
            <img class="w-4 h-4 mr-1" src="~/assets/img/phone.svg" />
            {{ barber.phone }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="opened">
      <hr />
      <!-- reviews -->
      <template v-if="reviews.length === 0">
        <div class="text-sm md:text-base p-2">리뷰가 아직 없습니다!</div>
      </template>
      <ReviewListItem v-for="review in reviews" :key="review._id" :review="review" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    barber: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      reviews: [],
      opened: false,
    };
  },
  async fetch() {
    const { data } = await this.$api.barbers.reviews(this.barber.id);
    this.reviews = data.reviews;
  },
  methods: {
    toggle() {
      this.opened = !this.opened;
    },
  },
};
</script>

<style lang="scss" scoped>
.barber-thumb {
  width: 75px;
}

@media (min-width: 640px) {
  .barber-thumb {
    width: 100px;
  }
}

@media (min-width: 768px) {
  .barber-thumb {
    width: 125px;
  }
}

@media (min-width: 1024px) {
  .barber-thumb {
    width: 150px;
  }
}
</style>
