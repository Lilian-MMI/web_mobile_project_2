import { kyApi } from './api';

export const getMessagesByChannel = (channelId: string) =>
  kyApi.get(`messages/${channelId}`).json();

export const postMessage = (channelId: string, body: any) =>
  kyApi
    .post(`messages/${channelId}`, {
      body: JSON.stringify(body),
    })
    .json();
