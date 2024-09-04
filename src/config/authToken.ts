import { sign } from "jsonwebtoken";
import { UserMap } from "modules/User/mapper/UserMap";

export const secret: string = process.env.JWT_SECRET;
export const expiresToken: string = process.env.EXPIRES_TOKEN;
export const expiresTokenRefresh: string = process.env.EXPIRES_REFRESH_TOKEN;
export const expiresTokenRefreshTime: number = Number(process.env.EXPIRES_REFRESH_TOKEN_TIME);


export const generateAccessToken = (
  user: UserMap,
): string => {
  const accessToken = sign(
    {
      user
    },
    secret,
    { expiresIn: expiresToken },
  );
  return accessToken;
};