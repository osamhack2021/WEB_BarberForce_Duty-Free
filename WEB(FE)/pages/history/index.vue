<template>
  <main class="container px-2 pt-2 pb-20">
    <CommonHeading class="mb-2">HISTORY</CommonHeading>
    <!-- upcomming resevation -->
    <div class="mb-3">
      <div class="font-bold text-sm text-gray-600 mb-1">다가오는 예약</div>
      <template v-if="upcomming.length === 0">
        <div class="text-sm">- 다가오는 예약이 없습니다.</div>
      </template>
      <HistoryReservation v-for="reservation in upcomming" :key="reservation._id" :reservation="reservation" />
    </div>
    <!-- reservation history -->
    <hr class="mb-3" />
    <div>
      <div class="font-bold text-sm text-gray-600 mb-1">과거 예약 내역</div>
      <template v-if="previous.length === 0">
        <div class="text-sm">- 예약 내역이 없습니다.</div>
      </template>
      <HistoryReservation v-for="reservation in previous" :key="reservation._id" :reservation="reservation" />
    </div>
    <!-- <HistoryReservation
      :reservation="{
        _id: '123',
        year: 2021,
        month: 10,
        day: 15,
        time: new Date('2021-10-15 18:30').toString(),
        description: '더어미~',
        barber_id: '61651be8291eaee7ab8635e6',
      }"
    /> -->
  </main>
</template>

<script>
import moment from 'moment';

export default {
  middleware: 'auth',
  data() {
    return {
      reservations: [],
    };
  },
  async fetch() {
    const { data } = await this.$api.reservations.list();
    this.reservations = data.reservations;
  },
  computed: {
    upcomming() {
      return this.reservations.filter(reservation => moment().isBefore(moment(reservation.time)));
    },
    previous() {
      return this.reservations.filter(reservation => moment(reservation.time).isBefore(moment()));
    },
  },
};
</script>

<style lang="scss" scoped></style>
