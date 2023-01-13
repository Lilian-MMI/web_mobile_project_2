import { Request, Response } from 'express';
import { Message, User } from '../models';
import validateOrRejectInstance from '../utils/validation-rejection';
import { postMessageDto } from '../validations/message.validation';

export const postMessage = async (req: Request, res: Response) => {
  try {
    const input = new postMessageDto();
    await validateOrRejectInstance(input, {
      ...req.body,
      UserId: req['userId'],
      ChannelId: req.params.channelId,
    });

    const message = await Message.create(input);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getChannelMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.findAll({
      where: {
        ChannelId: req.params.channelId,
      },
      include: [User],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
