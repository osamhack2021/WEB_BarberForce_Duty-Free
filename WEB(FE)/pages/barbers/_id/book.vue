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
          <div class="text-center">
            <div class="font-bold">사장님께 용무</div>
            <div class="border bg-white break-all p-2">
              {{ description || '내용이 없습니다.' }}
            </div>
          </div>
          <hr class="my-3" />
          <!-- my info -->
          <div class="mb-8">
            <div class="font-bold text-lg">내 정보</div>
            <div class="flex items-center">
              <span>
                <span class="font-bold">이름</span>
                <span class="text-sm">{{ $store.state.auth.user.name }}</span>
              </span>
              <span class="ml-auto">
                <span class="text-sm">{{ $store.state.auth.user.email }}</span>
              </span>
            </div>
          </div>
          <!-- submit button -->
          <div class="flex justify-center">
            <button class="rounded bg-brand text-white text-xl py-4 px-8" @click="submit">예약</button>
          </div>
        </div>
        <!-- info section -->
        <div class="mb-6">
          <CommonHeading class="mb-2">INFO</CommonHeading>
          <div class="mb-2">
            <div class="font-bold">위치</div>
            <div class="rounded border w-full bg-gray-50 text-center py-3 px-6">구현 준비중</div>
          </div>
          <div class="font-bold">영업정보</div>
          <div class="rounded border w-full bg-gray-50 text-center py-3 px-6">구현 준비중</div>
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
</style>
