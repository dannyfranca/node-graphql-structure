import { IRule } from './IRule'
import { isDev } from '@config/index'

export const isAuthenticated: IRule = async ({ context }) => {
  return Boolean(context.user)
}
