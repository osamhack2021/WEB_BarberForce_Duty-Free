<template>
  <swiper class="swiper mb-4" :options="swiperOption">
    <swiper-slide v-for="(article, idx) in articles" :key="article._id">
      <!-- article card -->
      <NuxtLink :to="`/board/2/article/${article._id}`" class="block border shadow bg-white">
        <!-- thumb image section -->
        <div class="aspect-w-4 aspect-h-3">
          <img class="object-cover" :src="getThumb(idx)" />
        </div>
        <!-- content section -->
        <div class="p-2">
          <!-- article title -->
          <div class="text-sm font-bold mb-8 w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
            {{ article.title }}
          </div>
          <!-- content footer -->
          <div class="flex items-center text-xs">
            <!-- likes count -->
            <span class="flex items-center ml-auto" style="color: #e2474b">
              <img class="mr-1" src="@/assets/img/like.svg" />
              {{ article.recommendation }}
            </span>
            <!-- comments count -->
            <span class="flex items-center ml-4" style="color: #000000">
              <img class="mr-1" src="@/assets/img/comment.svg" />
              {{ article.comment.length }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </swiper-slide>
    <!-- <swiper-slide v-if="articles.length < 4">
      <NuxtLink :to="`/board/2/create`" class="block border shadow bg-white">
        <div class="aspect-w-4 aspect-h-3">
          <div class="flex justify-center items-center">
            <img width="48" src="@/assets/img/write-main.svg" />
          </div>
        </div>
        <div class="p-2 border-t">
          <div class="font-bold mb-1">새로운 글</div>
          <div class="text-gray-600 text-sm">새 글을 작성하러 가보세요!</div>
        </div>
      </NuxtLink>
    </swiper-slide> -->
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
  methods: {
    getThumb(idx) {
      return this.articles[idx].thumb || '/img/thumb-placeholder.png';
    },
  },
  async fetch() {
    try {
      const { data } = await this.$api.board.articles(2, 'recommendation', 'desc');
      this.articles = data.posts;
    } catch (e) {
      console.error(e);
      this.$toast.error('에러가 발생했습니다!');
    }
  },
};
</script>

<style></style>
