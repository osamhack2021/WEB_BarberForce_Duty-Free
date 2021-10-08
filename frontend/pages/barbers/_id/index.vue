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
    });
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
</style>
