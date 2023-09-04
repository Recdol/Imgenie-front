import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_HOST;

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

function saveAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

function saveRefreshToken(refreshToken) {
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export async function newAccessAndRefreshToken() {
  return axios
    .post(`${backendUrl}/auth/signin`, null)
    .then((res) => res.data)
    .then(({ access_token: accessToken, refresh_token: refreshToken }) => {
      saveAccessToken(accessToken);
      saveRefreshToken(refreshToken);

      return { accessToken, refreshToken };
    })
    .catch();
}

export async function renewAccessToken(refreshToken) {
  return axios
    .post(`${backendUrl}/auth/relogin`, {
      refresh_token: refreshToken,
    })
    .then();
}

export async function resolveAuthProblem(error) {
  const refreshToken = getRefreshToken();

  if (error.response?.status !== 401) {
    throw error;
  }

  if (!refreshToken) {
    return newAccessAndRefreshToken();
  }

  return renewAccessToken(refreshToken).catch((error2) => {
    if (error2.response?.status !== 401) {
      throw error2;
    }

    return newAccessAndRefreshToken();
  });
}

export async function requestWithResolvingAuthProblem(callback) {
  return callback().catch((error) =>
    resolveAuthProblem(error).then(() => callback())
  );
}
