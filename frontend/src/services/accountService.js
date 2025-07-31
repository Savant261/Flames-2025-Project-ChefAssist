import axiosInstance from '../api/axiosInstance.js';

// axios.defaults.withCredentials = true;

export const getUserSettings = async () => {
  const res = await axiosInstance.get('/auth/account-settings');
  return res.data;
};

export const updateEmail = async (email) => {
  const res = await axiosInstance.post('/auth/update-Email', { email });
  return res.data;
};

export const updatePhoneNumber = async (phoneNumber) => {
  const res = await axiosInstance.post('/auth/update-PhoneNumber', { phoneNo: phoneNumber });
  return res.data;
};

export const changePassword = async (oldPassword, newPassword) => {
  const res = await axiosInstance.post('/auth/change-Password', {
    oldPassword,
    newPassword
  });
  return res.data;
};

export const togglePublicProfile = async () => {
  const res = await axiosInstance.post('/auth/public-Profile-toogle');
  return res.data;
};

export const deleteAccount = async () => {
  const res = await axiosInstance.delete('/auth/delete-Account');
  return res.data;
};
