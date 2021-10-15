<template>
  <swiper class="swiper md:mb-3" :options="swiperOption">
    <swiper-slide v-for="reservation in reservations" :key="reservation._id">
      <ReservationPreview :reservation="reservation" />
    </swiper-slide>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </swiper>
</template>

<script>
export default {
  props: {
    reservations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        autoplay: {
          dealy: 5000,
        },
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        },
      },
    };
  },
};
</script>

<style></style>
