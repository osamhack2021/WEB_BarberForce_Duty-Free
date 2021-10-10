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
            <div class="border bg-white p-2">
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
    const year = this.$route.query.year;
    const month = this.$route.query.month;
    const day = this.$route.query.day;
    const time = this.$route.query.time;
    const description = this.$route.query.description;
    return {
      barber: null,
      date: moment(`${year}-${month}-${day} ${time.substr(1, 2)}:${time.substr(3, 2)}`),
      year,
      month,
      day,
      time,
      description,
    };
  },
  mounted() {
    this.$api.barbers.show(this.$route.params.id).then(({ data }) => {
      this.barber = data;
    });

    console.log(this.$store.state.auth.user);
  },
  computed: {
    dateString() {
      const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
      return this.date.format('YYYY/MM/DD') + `(${weekdays[this.date.day()]})`;
    },
    timeString() {
      return this.date.format('A hh:mm');
    },
  },
  methods: {
    async submit() {
      const reservation = {
        year: this.year,
        month: this.month,
        day: this.day,
        time: this.time,
        description: this.description,
      };
      try {
        await this.$api.barbers.createReservation(this.barber.id, reservation);
        this.$toast.success('예약되었습니다!');
        this.$router.replace('/');
      } catch (e) {
        console.error(e);
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
