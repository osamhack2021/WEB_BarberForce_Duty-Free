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
  });
}
