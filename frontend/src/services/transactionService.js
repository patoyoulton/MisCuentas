import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/transactions/';

const getTransactions = () => {
  const token = localStorage.getItem('token');
  return axios.get(API_URL, {
    headers: {
      'x-access-token': token
    }
  }).then(response => {
    return response.data;
  });
};

const addTransaction = (transaction) => {
  const token = localStorage.getItem('token');
  return axios.post(API_URL, transaction, {
    headers: {
      'x-access-token': token
    }
  });
};

const deleteTransaction = (id) => {
    const token = localStorage.getItem('token');
    return axios.delete(API_URL + id, {
        headers: {
        'x-access-token': token
        }
    });
};

const updateTransaction = (id, transaction) => {
    const token = localStorage.getItem('token');
    return axios.put(API_URL + id, transaction, {
        headers: {
        'x-access-token': token
        }
    });
};

export default {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction
};
