declare namespace Express {
  export interface Request {
    user: {
      id: number;
      email: string;
      name: string;
      phone: string;
      active: boolean;
      groupUserId: number;
    }
  }
}