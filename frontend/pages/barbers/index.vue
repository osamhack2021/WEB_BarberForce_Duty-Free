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
      barbers: [
        {
          id: 1,
          title: 'THE JJONDEUK',
          thumb: '/img/shop1.jpg',
          rating: 2.1,
          location: '송탄면',
          phone: '031-669-6000',
          reviews: [
            {
              id: 1,
              thumb: '/img/article1.png',
              reviewer: 'sally***',
              rating: 5.0,
              createdAt: '2021/09/21 18:12',
              body: '더미 리뷰',
            },
            {
              id: 2,
              thumb: '/img/article2.png',
              reviewer: 'an***',
              rating: 4.0,
              createdAt: '2021/09/21 21:53',
              body: '더미 리뷰',
            },
            {
              id: 3,
              thumb: '/img/article3.png',
              reviewer: 'byeon***',
              rating: 2.0,
              createdAt: '2021/09/21 22:12',
              body: '더미 리뷰',
            },
          ],
        },
        {
          id: 2,
          title: '주현바버샵',
          thumb: '/img/shop2.jpg',
          rating: 4.7,
          location: '작무사령관',
          phone: '031-669-5000',
          reviews: [
            {
              id: 4,
              thumb: '/img/article2.png',
              reviewer: 'park***',
              rating: 4.5,
              createdAt: '2021/09/22 06:45',
              body: '더미 리뷰',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
