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

// board
const board = client => ({
  articles: async (boardId, orderBy, order) => {
    const flag = boardId === '1';
    return await client.get(`/boards?board=${flag}&orderBy=${orderBy}&order=${order}`);
  },
  article: async articleId => {
    return await client.get(`/boards/${articleId}`);
  },
  create: async (boardId, data) => {
    return await client.post(`/boards/register?board=${boardId === '1'}`, data);
  },
  update: async (articleId, data) => {
    return await client.post(`/boards/${articleId}/update`, data);
  },
  delete: async articleId => {
    return await client.post(`/boards/${articleId}/delete`);
  },
  recommend: async articleId => {
    return await client.post(`/boards/${articleId}/recommendation`);
  },
});

// comment
const comment = client => ({
  recommend: async commentId => {
    return await client.post(`/comments/${commentId}/recommendation`);
  },
  update: async (commentId, body) => {
    return await client.post(`/comments/${commentId}/update`, body);
  },
  delete: async commentId => {
    return await client.post(`/comments/${commentId}/delete`);
  },
  create: async (articleId, body) => {
    return await client.post(`/boards/${articleId}/comments`, body);
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
    board: board(client),
    comment: comment(client),
  });
}
