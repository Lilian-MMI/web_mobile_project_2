import {
  getChannelMessages,
  postMessage,
} from './../controllers/message.controller';
import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware';

const messageRouter = Router();

messageRouter.post('/:channelId', verifyToken, postMessage);
messageRouter.get('/:channelId', verifyToken, getChannelMessages);

export default messageRouter;
