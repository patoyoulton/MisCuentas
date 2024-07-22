import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/auth/';

const register = (username, password, email) => {
  return axios.post(API_URL + 'register', {
    username,
    password,
    email
  });
};

const login = async (username, password) => {
  const response = await axios.post(API_URL + 'login', {
    username,
    password
  });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export default {
  register,
  login,
  logout
};
