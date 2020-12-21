import createClientAxios from './axios';

export function setHeaderAuthorizationComToken(token) {
  if (token) {
    createClientAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export function removerHeaderAuthorization() {
  delete createClientAxios.defaults.headers.common.Authorization;
}
