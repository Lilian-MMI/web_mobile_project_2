import { kyApi } from './api';

export interface UserLoginDto {
  username: string;
  password: string;
}

export interface UserRegisterDto {
  email: string;
  password: string;
  username: string;
}

export interface UserEditDto {
  email: string;
  username: string;
}

export const loginUser = (userLoginDto: UserLoginDto) =>
  kyApi.post(`users/login`, { json: userLoginDto }).json();

export const registerUser = (userRegisterDto: UserRegisterDto) =>
  kyApi.post(`users/register`, { json: userRegisterDto }).json();

export const getCurrentUser = () => kyApi.get(`users/me`).json();

export const editUser = (userEditDto: UserEditDto) =>
  kyApi.put(`users/me`, { json: userEditDto }).json();
