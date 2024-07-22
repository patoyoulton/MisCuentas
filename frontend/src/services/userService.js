import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/users/';

const getUserProfile = (userId) => {
  const token = localStorage.getItem('token');
  console.log('Fetching user profile from URL:', `${API_URL}${userId}`);
  console.log('Token being sent:', token);
  return axios.get(`${API_URL}${userId}`, {
    headers: {
      'x-access-token': token
    }
  }).then(response => {
    console.log('Received user profile response:', response.data);
    return response.data;
  }).catch(error => {
    console.error('Error fetching user profile:', error);
    throw error;
  });
};

const updateUserProfile = (userId, profileData) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  for (const key in profileData) {
    formData.append(key, profileData[key]);
  }
  console.log('Updating user profile at URL:', `${API_URL}${userId}`);
  console.log('Profile data being sent:', profileData);
  return axios.put(`${API_URL}${userId}`, formData, {
    headers: {
      'x-access-token': token,
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    console.log('Received user profile update response:', response.data);
    return response.data;
  }).catch(error => {
    console.error('Error updating user profile:', error);
    throw error;
  });
};

export default {
  getUserProfile,
  updateUserProfile
};
