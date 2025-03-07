import axios from '../utils/axios';

export const authService = {
  async login(username, password) {
    const response = await axios.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(username, password) {
    const response = await axios.post('/auth/register', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },
};
