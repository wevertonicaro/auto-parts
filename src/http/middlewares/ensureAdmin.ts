import { NextFunction, Request, Response } from "express";
import AppError from "http/error/AppError";
import { UserRepository } from "modules/User/repositories/implementations/UserRepository";
import { logger } from "utils/logger";

const ADMIN_GROUP_IDS = [1, 2];
const ADMIN_PERMISSION_ERROR = 'Usuário não possui permissão de administrador';

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;

  const usersRepository = new UserRepository();
  const user = await usersRepository.findById(id);

  if (!ADMIN_GROUP_IDS.includes(user.groupUserId)) {
    logger.error(ADMIN_PERMISSION_ERROR);
    throw new AppError(ADMIN_PERMISSION_ERROR, 401);
  }

  return next();
}