import { Message } from '@/views/main/Channel.vue';
import { kyApi } from './api';
import { User } from '@/stores/user';

export interface PostMessageDto {
  content: string;
  type: string;
}

export const getMessagesByChannel = (
  channelId: string
): Promise<(Message & { User: User })[]> =>
  kyApi.get(`messages/${channelId}`).json();

export const postMessage = (
  channelId: string,
  postMessageDto: PostMessageDto
): Promise<Message> =>
  kyApi
    .post(`messages/${channelId}`, {
      body: JSON.stringify(postMessageDto),
    })
    .json();
