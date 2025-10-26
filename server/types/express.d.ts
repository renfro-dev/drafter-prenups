import type { User } from "../storage";

declare global {
  namespace Express {
    interface Request {
      authUser?: User;
    }
  }
}
