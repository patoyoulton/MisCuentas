import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/accounts/';

const getAccounts = () => {
  const token = localStorage.getItem('token');
  return axios.get(API_URL, {
    headers: {
      'x-access-token': token
    }
  }).then(response => {
    return response.data;
  });
};

const addAccount = (account) => {
  const token = localStorage.getItem('token');
  return axios.post(API_URL, account, {
    headers: {
      'x-access-token': token
    }
  });
};

const deleteAccount = (id) => {
    const token = localStorage.getItem('token');
    return axios.delete(API_URL + id, {
      headers: {
        'x-access-token': token
      }
    });
};

const updateAccount = (id, account) => {
    const token = localStorage.getItem('token');
    return axios.put(API_URL + id, account, {
        headers: {
        'x-access-token': token
        }
    });
};

export default {
  getAccounts,
  addAccount,
  deleteAccount,
  updateAccount
};
