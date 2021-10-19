<template>
  <main>
    <template v-if="barber">
      <!-- title section -->
      <div class="barbershop-heading flex justify-center items-center font-bold">
        {{ barber.title }}
      </div>
      <!-- page contents -->
      <div class="container pt-3 px-4 pb-20">
        <!-- reservation section -->
        <div class="mb-12">
          <!-- section heading -->
          <CommonHeading class="mb-2">RESERVATION</CommonHeading>
          <!-- selected info -->
          <div class="flex justify-center items-center mb-6">
            <!-- icon -->
            <!-- <img src="" alt=""> -->
            <!-- text -->
            <div class="text-center font-bold tracking-wide text-lg">
              <div>{{ dateString }}</div>
              <div>{{ timeString }}</div>
            </div>
          </div>
          <!-- description -->
          <div class="text-center w-full max-w-md mx-auto">
            <div class="font-bold">사장님께 용무</div>
            <div class="border bg-white break-all py-2 px-4">
              {{ description || '내용이 없습니다.' }}
            </div>
          </div>
          <hr class="mx-auto max-w-md my-3" />
          <!-- my info -->
          <div class="md:flex md:flex-col md:items-center">
            <div class="mb-8 w-full max-w-md">
              <div class="font-bold text-lg mb-2">내 정보</div>
              <div class="w-full flex items-center">
                <span>
                  <span class="text-sm">이름</span>
                  <span class="text-lg font-bold">{{ $store.state.auth.user.name }}</span>
                </span>
                <span class="ml-auto">
                  <span class="text-sm">이메일</span>
                  <span class="text-lg font-bold">{{ $store.state.auth.user.email }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- info section -->
        <div class="mb-6">
          <CommonHeading class="mb-2">INFO</CommonHeading>
          <div class="flex flex-col md:flex-row">
            <div class="mb-4 md:w-1/2 md:pr-1">
              <div class="font-bold ml-4 mb-1 md:hidden">위치</div>
              <div ref="map" class="w-full kakao-map"></div>
            </div>
            <div class="p-4 md:flex md:flex-col md:flex-1 md:py-6 md:px-4">
              <div class="font-bold mb-2 md:text-xl">영업정보</div>
              <div class="mb-8">
                <div class="mb-2">
                  <div class="mb-2 md:text-lg">평일</div>
                  <div class="flex items-center">
                    <span class="flex items-center mr-8">
                      <img class="mr-2 w-7" src="@/assets/img/clock.svg" />
                      {{ weekdayDuration }}
                    </span>
                    <span class="items-center hidden md:flex">
                      <img class="mr-2 w-7" src="@/assets/img/phone.svg" />
                      {{ barber.phone }}
                    </span>
                  </div>
                </div>
                <div class="mb-2">
                  <div class="mb-2 md:text-lg">주말</div>
                  <span class="flex items-center mr-8">
                    <img class="mr-2 w-7" src="@/assets/img/clock.svg" />
                    {{ weekendDuration }}
                  </span>
                </div>
              </div>
              <div class="">매주 월요일은 정기휴무입니다.</div>
              <span class="flex items-center mt-3 md:hidden">
                <img class="mr-2 w-7" src="@/assets/img/phone.svg" />
                {{ barber.phone }}
              </span>
              <!-- submit button -->
              <div class="justify-end mt-auto hidden md:flex">
                <button class="w-full rounded bg-brand text-white text-xl py-4 px-8" @click="submit">예약</button>
              </div>
            </div>
          </div>
        </div>
        <!-- submit button -->
        <div class="flex justify-center md:hidden">
          <button class="w-full max-w-xs rounded bg-brand text-white text-xl py-4 px-8" @click="submit">예약</button>
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
    const time = moment(decodeURIComponent(this.$route.query.time));
    const description = this.$route.query.description;
    return {
      barber: null,
      time,
      description,
    };
  },
  computed: {
    dateString() {
      const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
      return this.time.format('YYYY/MM/DD') + `(${weekdays[this.time.day()]})`;
    },
    timeString() {
      return this.time.format('A hh:mm');
    },
    weekdayDuration() {
      const start = moment()
        .set('hour', this.barber.weekday.start.hour)
        .set('minute', this.barber.weekday.start.minute);
      const end = moment().set('hour', this.barber.weekday.end.hour).set('minute', this.barber.weekday.end.minute);

      console.log(start.toISOString(), end.toISOString());
      return `${start.format('HH:mm')} ~ ${end.format('HH:mm')}`;
    },
    weekendDuration() {
      const start = moment()
        .set('hour', this.barber.weekend.start.hour)
        .set('minute', this.barber.weekend.start.minute);
      const end = moment().set('hour', this.barber.weekend.end.hour).set('minute', this.barber.weekend.end.minute);
      return `${start.format('HH:mm')} ~ ${end.format('HH:mm')}`;
    },
  },
  watch: {
    barber(val) {
      this.$nextTick(() => {
        this.drawMap(val.title, val.location_detail);
      });
    },
  },
  mounted() {
    this.$api.barbers.show(this.$route.params.id).then(({ data }) => {
      this.barber = data;
    });
  },
  methods: {
    async submit() {
      const reservation = {
        time: this.time,
        description: this.description,
      };
      try {
        await this.$api.barbers.createReservation(this.barber._id, reservation);
        this.$toast.success('예약되었습니다!');
        this.$router.replace('/');
      } catch (e) {
        this.$toast.error('에러가 발생했습니다!');
      }
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
