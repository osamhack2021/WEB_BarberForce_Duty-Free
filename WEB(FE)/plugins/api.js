// auth module
const auth = client => ({
  login: async data => {
    return await client.post('/login', data);
  },
  register: async data => {
    return await client.post('/register', data);
  },
  me: async () => {
    return await client.get('/me');
  },
  additional: async data => {
    return await client.post('/kakao/register', data);
  },
});

// barbers
const barbers = client => ({
  list: async () => {
    return await client.get('/barbers');
  },
  show: async id => {
    return await client.get(`/barbers/${id}`);
  },
  reviews: async id => {
    return await client.get(`/barbers/${id}/reviews`);
  },
  createReview: async (id, data) => {
    return await client.post(`/barbers/${id}/reviews`, data);
  },
  reservations: async (id, year, month) => {
    return await client.get(`/barbers/${id}/reservations/${year}/${month}`);
  },
  createReservation: async (id, data) => {
    return await client.post(`/barbers/${id}/reservations`, data);
  },
});

// reservations
const reservations = client => ({
  list: async () => {
    return await client.get('/reservations');
  },
  markAsDone: async id => {
    return await client.post(`/reservations/${id}/done`);
  },
  edit: async (id, data) => {
    return await client.post(`/reservations/${id}/update`, data);
  },
  cancel: async id => {
    return await client.post(`/reservations/${id}/cancel`);
  },
});

// profile
const profile = client => ({
  edit: async data => {
    return await client.post('/profiles/update', data);
  },
  withdraw: async () => {
    return await client.post('/profiles/withdrawal');
  },
});

export default function ({ $axios, store }, inject) {
  const client = $axios.create({
    baseURL: process.env.backendURL,
  });
  client.interceptors.request.use(
    config => {
      const token = store.state.auth.token;
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  inject('api', {
    auth: auth(client),
    barbers: barbers(client),
    reservations: reservations(client),
    profile: profile(client),
  });
}
