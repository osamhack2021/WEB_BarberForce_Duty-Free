<template>
  <div class="relative rounded border bg-white py-2 px-4">
    <!-- toggle button -->
    <button class="absolute top-0 right-0 py-1 px-2" @click="opened = !opened">▼</button>
    <!-- heading -->
    <div class="flex items-center mb-2">
      <!-- time -->
      <div class="text-right font-bold text-lg mr-3">
        {{ dateString.date }} <br />
        {{ dateString.time }}
      </div>
      <!-- info -->
      <template v-if="reservation.barber">
        <div class="flex-1">
          <!-- title -->
          <div class="text-lg font-bold">{{ reservation.barber.title }}</div>
          <!-- separator -->
          <hr class="my-1" />
          <!-- phone -->
          <div class="flex items-center text-xs">
            <img class="w-4" src="@/assets/img/phone.svg" />
            <span class="ml-1">{{ reservation.barber.phone }}</span>
          </div>
        </div>
      </template>
    </div>
    <template v-if="opened">
      <!-- description (사장님께 용무) -->
      <div class="text-sm">
        <div class="text-gray-400 ml-4">요청사항(사장님께 용무)</div>
        <div class="h-32 break-all">{{ reservation.description }}</div>
      </div>
      <!-- 정정/취소 버튼 -->
      <template v-if="upcomming">
        <div class="flex justify-end text-sm">
          <button class="rounded bg-gray-500 text-white py-2 px-3 mr-1">요청사항 정정하기</button>
          <button class="rounded bg-brand text-white py-2 px-3">예약 정정하기</button>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    reservation: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      opened: this.active,
    };
  },
  computed: {
    dateString() {
      const date = moment(this.reservation.time);
      return {
        date: date.format('YYYY/MM/DD'),
        time: date.format('HH:mm'),
      };
    },
    upcomming() {
      const now = moment();
      const reservedTime = moment(this.reservation.time);
      return now.isBefore(reservedTime);
    },
  },
};
</script>

<style></style>
