import { kyApi } from './api';

export const addChannel = (body: { name: string }) =>
  kyApi
    .post(`channels`, {
      body: JSON.stringify(body),
    })
    .json();

export const getChannels = () => kyApi.get(`channels`).json();
