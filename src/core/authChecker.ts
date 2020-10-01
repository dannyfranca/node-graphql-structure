import { AuthChecker } from 'type-graphql'
import { Context } from '@core/context'
import { isAuthenticated } from '@core/permissions'

export const authChecker: AuthChecker<Context> = async (resolverData, roles) => {
  return isAuthenticated(resolverData)
}
