import axios from '../utils/axios';

export const authService = {
  async login(username, password) {
    const response = await axios.post('/auth/login', { username, password });
    if (response.data) {
      localStorage.setItem('username', response.data.user.username);
    }
    return response.data;
  },

  async logout() {
    localStorage.removeItem('username');
    try {
      const response = await axios.post('/auth/logout');
      if (response.data.token) {
        localStorage.removeItem('username');
      }
    } catch (error) {
      console.log('Logout failed', error);
    }
  },
};
