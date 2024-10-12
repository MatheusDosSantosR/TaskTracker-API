import { IUser } from '../../interfaces/IUser';
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      userLogged: any;
    }
  }
}