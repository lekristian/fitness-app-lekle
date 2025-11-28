import { UserModel } from "../../db/models/user";

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}
