<template>
  <main>
    <template v-if="barber">
      <!-- title section -->
      <div class="barbershop-heading flex justify-center items-center font-bold">
        {{ barber.title }}
      </div>
      <!-- page contents -->
      <div class="container pt-3 px-4">
        <!-- reservation section -->
        <div class="mb-6">
          <!-- section heading -->
          <CommonHeading class="mb-2">RESERVATION</CommonHeading>
          <!-- calender (지금은 그냥 input으로 대체) -->
          <!-- time selector -->
          <div class="flex flex-col items-center mb-2">
            <div class="mb-2">
              <!-- <DatePicker v-model="date" :disabled-dates="disabledDates" /> -->
              <DatePicker v-model="date" mode="dateTime" :minute-increment="30" is24hr />
            </div>
          </div>
          <!-- additional message input -->
          <div class="mb-2">
            <ValidationObserver class="block w-full" ref="description">
              <ValidationProvider
                class="flex justify-center w-full"
                v-slot="{ errors, classes }"
                name="용무"
                rules="required|min:5|max:140"
              >
                <div class="w-full max-w-md">
                  <div class="font-bold text-left mb-1">
                    사장님께 용무
                    <span class="text-gray-500 text-sm font-light ml-3">{{ description.length }}/140</span>
                  </div>
                  <textarea
                    v-model="description"
                    class="rounded border py-1 px-2 w-full max-w-md focus:outline-none focus:border-brand"
                    rows="5"
                  ></textarea>
                  <transition name="fade">
                    <div
                      v-if="errors.length > 0"
                      class="max-w-md text-left text-xs md:text-sm text-red-400"
                      :class="classes"
                    >
                      {{ errors[0] }}
                    </div>
                  </transition>
                </div>
              </ValidationProvider>
            </ValidationObserver>
          </div>
          <!-- submit button -->
          <div class="flex justify-end">
            <button class="rounded bg-brand text-white py-2 px-4" @click="book">에약하기</button>
          </div>
        </div>
        <!-- reviews section -->
        <div class="mb-6">
          <CommonHeading class="mb-2">REVIEWS</CommonHeading>
          <template v-if="reviews.length === 0">
            <div class="text-sm text-center md:text-base">아직 리뷰가 없습니다!</div>
          </template>
          <ReviewListItem v-for="review in reviews" :key="review._id" :review="review" />
        </div>
        <!-- info section -->
        <div class="mb-6">
          <CommonHeading class="mb-2">INFO</CommonHeading>
          <div class="flex flex-col md:flex-row">
            <div class="mb-4 md:w-1/2 md:pr-1">
              <div class="font-bold ml-4 mb-1 md:hidden">위치</div>
              <div ref="map" class="w-full kakao-map"></div>
            </div>
            <div class="p-4 md:py-6 md:px-4">
              <div class="font-bold mb-2 md:text-xl">영업정보</div>
              <div class="mb-8">
                <div class="mb-2">
                  <div class="mb-2 md:text-lg">화~금</div>
                  <div class="flex items-center">
                    <span class="flex items-center mr-8">
                      <img class="mr-2 w-7" src="@/assets/img/clock.svg" />
                      10:00 ~ 18:30
                    </span>
                    <span class="items-center hidden md:flex">
                      <img class="mr-2 w-7" src="@/assets/img/phone.svg" />
                      {{ barber.phone }}
                    </span>
                  </div>
                </div>
                <div class="mb-2">
                  <div class="mb-2 md:text-lg">공휴일</div>
                  <span class="flex items-center mr-8">
                    <img class="mr-2 w-7" src="@/assets/img/clock.svg" />
                    13:00 ~ 15:00
                  </span>
                </div>
              </div>
              <div class="">매주 월요일은 정기휴무입니다.</div>
              <span class="flex items-center mt-3 md:hidden">
                <img class="mr-2 w-7" src="@/assets/img/phone.svg" />
                {{ barber.phone }}
              </span>
              <!-- <div class="rounded border w-full bg-gray-50 text-center py-3 px-6">구현 준비중</div> -->
            </div>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import moment from 'moment';
// import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

export default {
  middleware: 'auth',
  components: {
    // Calendar,
    DatePicker,
  },
  data() {
    return {
      barber: null,
      reservations: null,
      reviews: [],
      date: moment().add(1, 'd').set('h', 18).set('m', 0).toString(),
      description: '',
      map: null,
    };
  },
  watch: {
    barber(val) {
      this.$nextTick(() => {
        this.drawMap(val.title, val.location_detail);
      });
    },
  },
  async fetch() {
    const { data: barber } = await this.$api.barbers.show(this.$route.params.id);
    this.barber = barber;

    const { data: reviewResponse } = await this.$api.barbers.reviews(this.$routes.params.id);
    this.reviews = reviewResponse.reviews;
  },
  methods: {
    async book() {
      const date = moment(this.date);

      if (date.hours() < 18 || date.hours() >= 21) {
        this.$toast.error('예약 시간은 18시 00분부터 20시 30분까지만 가능합니다.');
        return;
      }

      const valid = await this.$refs.description.validate();
      if (!valid) {
        this.$toast.error(`'사장님께 용무' 입력을 확인해주세요!`);
        return;
      }

      const year = date.year();
      const month = date.month() + 1;
      const day = date.date();
      const time = date.format('_HHmm');
      const description = this.description;
      this.$router.push(
        `/barbers/${this.barber.id}/book?year=${year}&month=${month}&day=${day}&time=${time}&description=${description}`
      );
    },
    drawMap(title, location) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(location, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          const container = this.$refs.map;
          const options = {
            center: coords,
            draggable: false,
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          const marker = new window.kakao.maps.Marker({
            map,
            position: coords,
          });

          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div style="width: 150px; text-align:center; padding: 0.5rem 0.25rem">${title}</div>`,
            // content: `<div style="width: 150px; text-align:center; padding: 0.5rem 0.25rem">${val.title}</div>`,
          });
          infoWindow.open(map, marker);
        }
      });
    },
  },
};
</script>

<style scoped>
.barbershop-heading {
  height: 230px;
  font-size: 1.75rem;
  color: white;
  background: url(/img/shop1.jpg) center/cover no-repeat;
}

.kakao-map {
  height: 200px;
}
@media (min-width: 640px) {
  .kakao-map {
    height: 350px;
  }
}
@media (min-width: 768px) {
  .kakao-map {
    height: 450px;
  }
}
</style>
