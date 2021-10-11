<template>
  <swiper class="swiper mb-4" :options="swiperOption">
    <swiper-slide
      v-for="article in articles"
      :key="article.id"
      :style="`background: url(${article.thumb}) center/cover no-repeat`"
    >
      <!-- article card -->
      <div class="border shadow bg-white">
        <!-- thumb image section -->
        <div class="aspect-w-4 aspect-h-3">
          <img :src="article.thumb" />
        </div>
        <!-- content section -->
        <div class="p-2">
          <!-- article title -->
          <div class="text-sm font-bold mb-8">{{ article.title }}</div>
          <!-- content footer -->
          <div class="flex items-center text-xs">
            <!-- location -->
            <span class="flex items-center" style="color: #9c9c9c">
              <img class="mr-1" src="@/assets/img/place.svg" />
              {{ article.location }}
            </span>
            <!-- likes count -->
            <span class="flex items-center ml-auto" style="color: #e2474b">
              <img class="mr-1" src="@/assets/img/like.svg" />
              {{ article.likes }}
            </span>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: false,
        breakpoints: {
          640: {
            slidesPerView: 3,
          },
          880: {
            slidesPerView: 4,
          },
        },
      },
    };
  },
  fetch() {
    this.articles = [
      {
        id: 1,
        title: '사이버지식정보방',
        location: '보라매 사동',
        thumb: '/img/article1.png',
        likes: 52,
      },
      {
        id: 2,
        title: `양현's 댄스클럽`,
        location: '보호실',
        thumb: '/img/article2.png',
        likes: 47,
      },
      {
        id: 3,
        title: '그냥 미용실입니다',
        location: '집무실',
        thumb: '/img/article3.png',
        likes: 34,
      },
      {
        id: 4,
        title: '또 다른 곳',
        location: '집무실',
        thumb: '/img/article3.png',
        likes: 26,
      },
      {
        id: 5,
        title: '또 다른 곳 2',
        location: '집무실',
        thumb: '/img/article1.png',
        likes: 11,
      },
    ];
  },
};
</script>

<style></style>
