import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import {
  getChannels,
  createChannel,
  getChannel,
  deleteChannel,
} from '../controllers/channel.controller';

const channelRouter = Router();

channelRouter.post('/', verifyToken, createChannel);
channelRouter.get('/', verifyToken, getChannels);
channelRouter.get('/:id', verifyToken, getChannel);
channelRouter.delete('/:id', verifyToken, deleteChannel);

export default channelRouter;
