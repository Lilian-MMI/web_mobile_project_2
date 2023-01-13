import {
  userEditDto,
  userRegisterDto,
} from './../validations/user.validations';
import { User } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { userLoginDto } from '../validations/user.validations';
import validateOrRejectInstance from '../utils/validation-rejection';

const createToken = (id: string) => {
  if (!process.env.JWT_SECRET)
    throw new Error('JWT_SECRET is not defined in .env');

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const input = new userRegisterDto();
    await validateOrRejectInstance(input, req.body);

    const user = await User.create(input);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const input = new userLoginDto();
    await validateOrRejectInstance(input, req.body);

    const user = await User.findOne({
      where: {
        username: input.username,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(input.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const { password, ...userWithoutPassword } = user.toJSON();

    const token = createToken(userWithoutPassword.id);

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req['userId'], {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req['userId'], {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const input = new userEditDto();
    await validateOrRejectInstance(input, req.body);

    const updatedUser = await user.update(input);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
