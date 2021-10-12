<template>
  <div>
    <!-- mobile -->
    <template v-if="barber">
      <div class="aspect-w-1 aspect-h-1 sm:hidden" :style="`background: url(${barber.thumb}) center/cover no-repeat`">
        <div class="flex flex-col justify-end">
          <div class="relative bg-black bg-opacity-80 font-thin text-white text-sm py-3 px-5">
            <div class="flex items-center">
              <span class="font-bold text-xl">{{ barber.title }}</span>
              <span class="flex items-center ml-auto">
                <img class="w-6 mr-2" src="~/assets/img/clock_white.svg" />
                <div class="text-xs">
                  <div>{{ reservation.year }}. {{ reservation.month }}. {{ reservation.day }}</div>
                  <div>18:00 ~ 19:30</div>
                </div>
              </span>
            </div>
            <div class="flex items-center mb-3">
              <img class="w-4 h-4 mr-1" src="~/assets/img/place.svg" />
              {{ barber.location }}
            </div>
            <NuxtLink class="underline mt-auto" to="/">예약 수정/취소하기</NuxtLink>
            <template v-if="timeover">
              <div class="absolute top-full" style="right: 5%; transform: translate(0, -75%)">
                <div class="text-sm text-center mb-2">이발이 끝나셨나요?</div>
                <div class="flex justify-center items-center">
                  <button class="w-16 text-center rounded bg-brand text-white py-2 mr-2">예</button>
                  <button class="w-16 text-center rounded bg-red-500 text-white py-2 mr-2">아니오</button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
    <!-- pc -->
    <template v-if="barber">
      <div class="hidden sm:flex">
        <div class="w-1/2">
          <div class="aspect-w-1 aspect-h-1" :style="`background: url(${barber.thumb}) center/cover no-repeat`">
            <div class="flex flex-col justify-end">
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
        </div>
        <div class="flex flex-col bg-gray-600 text-white w-1/2 py-3 px-5">
          <div class="flex items-center">
            <span class="font-bold text-2xl">{{ barber.title }}</span>
            <span class="text-lg ml-auto">나의 예약</span>
          </div>
          <div class="mb-3">
            <span class="flex items-center text-sm">
              <img class="w-4 mr-1" src="~/assets/img/place.svg" />
              {{ barber.location }}
            </span>
          </div>
          <div>
            <div class="flex items-center mr-2 mb-3">
              <img class="w-6 mr-2" src="~/assets/img/clock_white.svg" />
              <div>
                <div>{{ reservation.year }}. {{ reservation.month }}. {{ reservation.day }}</div>
                <div>18:00 ~ 19:30</div>
              </div>
            </div>
            <div>
              <NuxtLink class="underline" to="/">예약 수정/취소하기</NuxtLink>
            </div>
          </div>
          <template v-if="timeover">
            <div class="mt-auto">
              <div class="text-sm text-center mb-2">이발이 끝나셨나요?</div>
              <div class="flex justify-center items-center">
                <button class="flex-1 text-center rounded bg-brand text-white py-3 mr-2">예</button>
                <button class="flex-1 text-center rounded bg-red-500 text-white py-3 mr-2">아니오</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
    <!-- review form -->
    <template v-if="timeover">
      <div class="mt-4 mb-2 p-3">
        <div class="font-bold text-center">미용실의 서비스를 평가해주세요.</div>
        <div class="flex justify-center">
          <div class="inline-flex flex-col">
            <StarRating v-model="review.rating" :increment="0.5" :show-rating="false" />
            <span class="ml-auto mr-2">
              <span class="font-bold text-lg">{{ review.rating }}</span>
              /5
            </span>
          </div>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submitReview)">
            <div class="flex items-end font-bold mb-1">
              간단 리뷰 작성하기 <span class="text-gray-400 text-xs font-light ml-2">5/140</span>
            </div>
            <ValidationProvider name="리뷰" rules="required" v-slot="{ errors }">
              <textarea
                v-model="review.body"
                class="w-full rounded border p-2 focus:outline-none"
                :class="{ 'border-red-400': errors.length > 0, 'focus:border-brand': errors.length === 0 }"
                rows="3"
              ></textarea>
              <transition name="fade">
                <div v-if="errors.length > 0" class="w-60 text-left text-xs md:text-sm text-red-400">
                  {{ errors[0] }}
                </div>
              </transition>
            </ValidationProvider>
            <div class="flex items-start mt-1">
              <span class="flex items-center">
                <input id="onlyBarber" v-model="review.onlyBarber" class="mr-1" type="checkbox" />
                <label for="onlyBarber" class="text-sm">사장님께만 보이게</label>
              </span>
              <button type="submit" class="rounded bg-brand text-white py-2 px-5 ml-auto">작성하기</button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </template>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  components: {
    StarRating,
  },
  props: {
    reservation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      barber: null,
      review: {
        body: '',
        rating: 5,
        onlyBarber: false,
      },
    };
  },
  computed: {
    timeover() {
      const now = new Date();
      now.setDate(15);
      return (
        this.reservation.year <= now.getFullYear() &&
        this.reservation.month <= now.getMonth() + 1 &&
        this.reservation.day <= now.getDate()
      );
    },
  },
  methods: {
    async submitReview() {
      try {
        console.log(this.barber);
        await this.$api.barbers.createReview(this.barber.id, this.review);
        this.$toast.success('리뷰를 작성했습니다!');
      } catch (e) {
        console.error(e);
        this.$toast.error('에러가 발생했습니다!');
      }
    },
  },
  async fetch() {
    const { data } = await this.$api.barbers.show(this.reservation.barbers_id);
    this.barber = data;
  },
};
</script>

<style></style>
