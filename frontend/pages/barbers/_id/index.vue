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
              <input class="rounded border py-1 px-2 w-full max-w-md" type="datetime-local" v-model="date" />
            </div>
          </div>
          <!-- additional message input -->
          <div class="flex flex-col items-center mb-2">
            <div class="font-bold">사장님께 용무</div>
            <textarea class="rounded border py-1 px-2 w-full max-w-md" rows="5" v-model="description"></textarea>
          </div>
          <!-- submit button -->
          <div class="flex justify-end">
            <button class="rounded bg-brand text-white py-2 px-4" @click="book">에약하기</button>
          </div>
        </div>
        <!-- reviews section -->
        <div class="mb-6">
          <CommonHeading class="mb-2">REVIEWS</CommonHeading>
          <div class="rounded border w-full bg-gray-50 text-center py-3 px-6">구현 준비중</div>
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
                      031-669-6660
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
                031-669-6660
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

export default {
  middleware: 'auth',
  data() {
    return {
      barber: null,
      date: new Date().toISOString(),
      description: '',
      map: null,
    };
  },
  mounted() {
    this.$api.barbers.show(this.$route.params.id).then(({ data }) => {
      this.barber = data;
      console.log(data);
    });
  },
  watch: {
    barber(val) {
      this.$nextTick(() => {
        const container = this.$refs.map;
        const options = {
          center: new window.kakao.maps.LatLng(val.location_detail.latitude, val.location_detail.longitude),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch('역촌동 85-46', (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            const marker = new window.kakao.maps.Marker({
              map,
              position: coords,
            });

            const infoWindow = new window.kakao.maps.InfoWindow({
              content: `<div style="width: 150px; text-align:center; padding: 0.5rem 0.25rem">${val.title}</div>`,
              // content: `<div style="width: 150px; text-align:center; padding: 0.5rem 0.25rem">${val.title}</div>`,
            });
            infoWindow.open(map, marker);

            map.setCenter(coords);
          }
        });
      });
    },
  },
  methods: {
    book() {
      const date = moment(this.date);
      const year = date.year();
      const month = date.month() + 1;
      const day = date.date();
      const time = date.format('_HHmm');
      const description = this.description;
      this.$router.push(
        `/barbers/${this.barber.id}/book?year=${year}&month=${month}&day=${day}&time=${time}&description=${description}`
      );
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
