import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_HOST;

export async function requestNewUser() {
  return axios.get(`${backendUrl}/auth/newUser`, { withCredentials: true });
}

export async function requestCheckUser() {
  return axios.get(`${backendUrl}/auth/checkUser`);
}
