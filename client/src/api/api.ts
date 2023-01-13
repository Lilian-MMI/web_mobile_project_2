import router from '@/router';
import ky from 'ky';
import { Input } from 'ky/distribution/types/options';
import { API_URI } from '~/config';

const hooks = {
  beforeRequest: [
    (request: any) => {
      const token = localStorage.getItem('token');
      request.headers.set('x-access-token', token);
    },
  ],

  afterResponse: [
    (_request: Input, _options: any, response: any) => {
      if (response.status === 401) {
        localStorage.removeItem('token');
        router.replace('/login');
      }

      return response;
    },
  ],
};

export const kyApi = ky
  .create({
    prefixUrl: API_URI,
    headers: {
      'content-type': 'application/json',
    },
  })
  .extend({
    hooks,
  });
