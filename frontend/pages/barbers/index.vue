<template>
  <main class="container px-2 pt-2 pb-20">
    <CommonHeading class="mb-2">BARBERSHOP</CommonHeading>
    <!-- barbershop component -->
    <BarberListItem v-for="barber in barbers" :key="barber.id" :barber="barber" class="mb-3" />
  </main>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      barbers: [],
    };
  },
  async fetch() {
    const { data } = await this.$api.barbers.list();
    this.barbers = data;
  },
};
</script>

<style lang="scss" scoped></style>
