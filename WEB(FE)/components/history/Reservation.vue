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
          <button class="rounded bg-red-500 text-white py-2 px-3 mr-1" @click="cancel">예약 취소하기</button>
          <button class="rounded bg-brand text-white py-2 px-3" @click="formOpened = true">예약 정정하기</button>
        </div>
      </template>
    </template>
    <CommonModal :opened="formOpened">
      <form class="p-3" @submit.prevent="submit">
        <div class="mb-2">
          <DatePicker v-model="editForm.time" mode="dateTime" is24hr />
        </div>
        <div class="mb-2">
          <ValidationObserver ref="description" class="block">
            <ValidationProvider v-slot="{ errors, classes }" class="block" name="용무" rules="max:140">
              <div class="font-bold text-left mb-1">
                사장님께 용무
                <span class="text-gray-500 text-sm font-light ml-3">{{ editForm.description.length }}/140</span>
              </div>
              <textarea
                v-model="editForm.description"
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
            </ValidationProvider>
          </ValidationObserver>
        </div>
        <div class="flex justify-end">
          <button class="rounded bg-red-500 text-white py-2 px-4 mr-1" @click.prevent="formOpened = false">
            나가기
          </button>
          <button class="rounded bg-brand text-white py-2 px-4">정정하기</button>
        </div>
      </form>
    </CommonModal>
  </div>
</template>

<script>
import moment from 'moment';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

export default {
  components: {
    DatePicker,
  },
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
      formOpened: false,
      editForm: {
        time: moment(this.reservation.time).toISOString(),
        description: '',
      },
    };
  },
  methods: {
    async submit() {
      const date = moment(this.editForm.time);

      const valid = await this.$refs.description.validate();
      if (!valid) {
        this.$toast.error(`'사장님께 용무' 입력을 확인해주세요!`);
        return;
      }

      if (date.isBefore(moment())) {
        this.$toast.error('현재 시각보다 전에 예약을 할 수는 없습니다!');
        return;
      }

      try {
        await this.$api.reservations.edit(this.reservation._id, this.editForm);
        this.$toast.success('정정되었습니다!');
        this.formOpened = false;
      } catch (e) {
        this.$toast.error('에러가 발생했습니다!');
      }
    },
    async cancel() {
      if (confirm('정말 취소하시겠습니까?')) {
        try {
          await this.$api.reservations.cancel(this.reservation._id);
          this.$toast.success('취소되었습니다!');
          location.reload();
        } catch (e) {
          this.$toast.error('에러가 발생했습니다!');
        }
      }
    },
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
