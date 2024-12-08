import { environment as env } from '../../environments/environment';

export const API_ENDPOINT = {
  AUTH: {
    LOGIN: env.apiUrl + '/auth/login',
    LOGOUT: env.apiUrl + '/auth/logout',
    REGISTER: env.apiUrl + '/auth/register',
    ME: env.apiUrl + '/auth/me',
  },
  USERS: {
    ALL: env.apiUrl + '/users',
  },
  MESSAGES: {
    ALL: env.apiUrl + '/message',
    CREATE: env.apiUrl + '/message',
    GET: env.apiUrl + '/message',
    DELETE: env.apiUrl + '/message',
    READ: env.apiUrl + '/message',
  },
};
