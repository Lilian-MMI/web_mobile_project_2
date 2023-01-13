import { API_URI } from '~/config';
import { io } from 'socket.io-client';

export const useSocketIO = () => {
  const socket = io(API_URI);
  return {
    socket,
  };
};
