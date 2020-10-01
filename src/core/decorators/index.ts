import { createParamDecorator } from 'type-graphql'
import { Context } from '@core/context'
import { User } from '@generated/typegraphql-prisma'

export function CurrentUser () {
  return createParamDecorator<Context>(async ({ context }): Promise<User | undefined> => context.user)
}
