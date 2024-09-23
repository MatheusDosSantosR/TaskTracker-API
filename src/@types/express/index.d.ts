import { IUser } from '../../interfaces/IUser';

declare namespace Express {
  export interface Request {
    user?: IUser;
  }
}
