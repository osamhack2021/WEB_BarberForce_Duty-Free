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
  reservations: async (id, year, month) => {
    return await client.get(`/barbers/${id}/reservations/${year}/${month}`);
  },
  createReservation: async (id, data) => {
    return await client.post(`/barbers/${id}/reservations`, data);
  },
});

// reservations
const reservations = client => ({
  mine: async () => {
    return await client.get('/reservations');
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
  });
}
