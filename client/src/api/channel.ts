import { Channel } from '@/views/main/Channels.vue';
import { kyApi } from './api';

export const addChannel = (body: { name: string }): Promise<Channel> =>
  kyApi
    .post(`channels`, {
      body: JSON.stringify(body),
    })
    .json();

export const getChannels = (): Promise<Channel[]> =>
  kyApi.get(`channels`).json();
