<template>
  <main class="container mx-auto p-3">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        v-for="barber in barbers"
        :key="barber.id"
        :style="`background: url(${barber.image}) center/cover no-repeat`"
      >
        <div class="aspect-w-1 aspect-h-1">
          <div class="flex flex-col justify-end bg-dummy1">
            <div class="bg-black bg-opacity-80 font-thin text-white text-sm py-3 px-5 pb-12">
              <div class="flex items-center">
                <span class="font-bold text-xl">{{ barber.title }}</span>
                <span class="flex items-center text-base ml-auto">
                  <img class="w-5 h-5 mr-1" src="~/assets/img/star.svg" />
                  {{ barber.rating }}
                </span>
              </div>
              <div class="flex items-center">
                <img class="w-4 h-4 mr-1" src="~/assets/img/place.svg" />
                {{ barber.location }}
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination"></div>
    </swiper>
  </main>
</template>

<script>
export default {
  // middleware: 'auth',
  data() {
    return {
      barbers: [],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        autoplay: {
          dealy: 5000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        },
      },
    };
  },
  fetch() {
    // dummy data
    this.barbers = [
      {
        id: 1,
        title: '주현바버샵',
        location: '송탄면',
        rating: '4.2',
        image: '/img/shop1.jpg',
      },
      {
        id: 2,
        title: '양현바버샵',
        location: '평택시',
        rating: '4.4',
        image: '/img/shop2.jpg',
      },
      {
        id: 3,
        title: '이세바버샵',
        location: '동성로',
        rating: '4.7',
        image: '/img/shop1.jpg',
      },
      {
        id: 4,
        title: '주현바버샵',
        location: '송탄면',
        rating: '4.2',
        image: '/img/shop1.jpg',
      },
      {
        id: 5,
        title: '양현바버샵',
        location: '평택시',
        rating: '4.4',
        image: '/img/shop2.jpg',
      },
      {
        id: 6,
        title: '이세바버샵',
        location: '동성로',
        rating: '4.7',
        image: '/img/shop1.jpg',
      },
      {
        id: 7,
        title: '이세바버샵',
        location: '동성로',
        rating: '4.7',
        image: '/img/shop1.jpg',
      },
    ];
  },
};
</script>

<style scoped></style>
