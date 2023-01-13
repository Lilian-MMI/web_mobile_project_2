import { Request, Response } from 'express';
import { Channel } from '../models/channel.model';
import validateOrRejectInstance from '../utils/validation-rejection';
import { createChannelDto } from '../validations/channel.validation';

export const createChannel = async (req: Request, res: Response) => {
  try {
    const input = new createChannelDto();
    await validateOrRejectInstance(input, req.body);

    const channel = await Channel.create(req.body);
    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteChannel = async (req: Request, res: Response) => {
  try {
    const channel = await Channel.findByPk(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    await channel.destroy();
    res.status(200).json({ message: 'Channel deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getChannels = async (req: Request, res: Response) => {
  try {
    const channels = await Channel.findAll();
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getChannel = async (req: Request, res: Response) => {
  try {
    const channel = await Channel.findByPk(req.params.id);
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json(error);
  }
};
