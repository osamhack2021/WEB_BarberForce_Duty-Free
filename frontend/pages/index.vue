<template>
  <main class="container pb-20">
    <swiper class="swiper md:mb-3" :options="barbersSwiper">
      <swiper-slide
        v-for="barber in barbers"
        :key="barber.id"
        :style="`background: url(${barber.thumb}) center/cover no-repeat`"
      >
        <NuxtLink :to="`/barbers/${barber.id}`">
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
        </NuxtLink>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination"></div>
    </swiper>
    <div class="p-3">
      <!-- '머리깎고 뭐하지?' section -->
      <section class="mb-12">
        <CommonHeading class="mb-2">머리깎고 뭐하지?</CommonHeading>
        <swiper class="swiper mb-4" :options="articlesSwiper">
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
        <!-- view more link -->
        <div class="flex justify-center">
          <NuxtLink class="flex justify-center rounded bg-brand font-bold text-white w-full max-w-md p-1" to="/">
            더보기
          </NuxtLink>
        </div>
      </section>
      <!-- quick menu icons -->
      <section class="flex justify-center items-center mb-8">
        <!-- 미용실 정보 -->
        <NuxtLink class="flex flex-col items-center mx-3 md:mx-8" to="/">
          <!-- 원형 이미지 or 아이콘 -->
          <!-- || dummy placeholder || -->
          <div class="rounded-full bg-gray-500 border-2 border-gray-400 w-16 md:w-20 h-16 md:h-20 mb-2"></div>
          <!-- text -->
          <span class="font-bold">미용실 정보</span>
        </NuxtLink>
        <!-- 맛집 리스트 -->
        <NuxtLink class="flex flex-col items-center mx-3 md:mx-8" to="/">
          <!-- 원형 이미지 or 아이콘 -->
          <!-- || dummy placeholder || -->
          <div class="rounded-full bg-gray-500 border-2 border-gray-400 w-16 md:w-20 h-16 md:h-20 mb-2"></div>
          <!-- text -->
          <span class="font-bold">맛집 리스트</span>
        </NuxtLink>
        <!-- 커뮤니티 -->
        <NuxtLink class="flex flex-col items-center mx-3 md:mx-8" to="/">
          <!-- 원형 이미지 or 아이콘 -->
          <!-- || dummy placeholder || -->
          <div class="rounded-full bg-gray-500 border-2 border-gray-400 w-16 md:w-20 h-16 md:h-20 mb-2"></div>
          <!-- text -->
          <span class="font-bold">커뮤니티</span>
        </NuxtLink>
      </section>
      <!-- search form section -->
      <div class="flex justify-center">
        <div class="relative w-full max-w-md">
          <img
            class="absolute left-3 top-1/2 w-5 h-auto"
            style="transform: translate(0, -50%)"
            src="@/assets/img/search.svg"
          />
          <input
            class="
              w-full
              rounded
              border
              bg-white
              font-semibold
              text-lg text-gray-400
              placeholder-gray-200
              py-2
              pl-12
              pr-4
              focus:outline-none focus:ring focus:ring-white focus:ring-opacity-30
            "
            placeholder="찾으시는 것이 있나요?"
            type="text"
          />
        </div>
      </div>
    </div>

    <button class="rounded bg-brand text-white font-bold py-2 px-4" @click="logout">로그아웃(테스트용)</button>
  </main>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      barbers: [],
      barbersSwiper: {
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
          640: {
            slidesPerView: 2,
          },
        },
      },
      articles: [],
      articlesSwiper: {
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
  async fetch() {
    // dummy data
    const { data: barbers } = await this.$api.barbers.list();
    this.barbers = barbers;
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
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },
};
</script>

<style scoped></style>
