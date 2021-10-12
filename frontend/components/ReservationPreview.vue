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
            <div class="absolute top-full" style="right: 5%; transform: translate(0, -75%)">
              <div class="text-sm text-center mb-2">이발이 끝나셨나요?</div>
              <div class="flex justify-center items-center">
                <button class="w-16 text-center rounded bg-brand text-white py-2 mr-2">예</button>
                <button class="w-16 text-center rounded bg-red-500 text-white py-2 mr-2">아니오</button>
              </div>
            </div>
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
          <div class="mt-auto">
            <div class="text-sm text-center mb-2">이발이 끝나셨나요?</div>
            <div class="flex justify-center items-center">
              <button class="flex-1 text-center rounded bg-brand text-white py-3 mr-2">예</button>
              <button class="flex-1 text-center rounded bg-red-500 text-white py-3 mr-2">아니오</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    reservation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      barber: null,
    };
  },
  async fetch() {
    const { data } = await this.$api.barbers.show(this.reservation.barbers_id);
    this.barber = data;
  },
};
</script>

<style></style>
