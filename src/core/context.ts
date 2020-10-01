import { Request, Response } from 'express'
import { Container } from 'typedi'
import { AuthService } from '@services/index'
import { User } from '@generated/typegraphql-prisma'
import { UserRepository } from '@repositories/index'
import { isDev } from '@config/index'
import { mainUserMail } from '../config/index'

const authService = Container.get(AuthService)

export async function createContext (ctx: BaseContext): Promise<Context> {
  return {
    ...ctx,
    user: await getUser(ctx)
  }
}

async function getUser (ctx: BaseContext) {
  return isDev ? await Container.get(UserRepository).findByEmail(mainUserMail) : await authService.getUserFromContext(ctx)
}

export interface Context extends BaseContext {
  user: User
}

export interface BaseContext {
  req: Request
  res: Response
}
