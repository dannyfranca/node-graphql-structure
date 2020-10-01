import { Resolver, Query, Arg, Int, Authorized } from 'type-graphql'
import { Service } from 'typedi'
import { User } from '@generated/typegraphql-prisma'
import { GetUserUseCase } from './GetUserUseCase'

@Service()
@Resolver(of => User)
export class GetUserResolver {
  constructor (
    private getUserUseCase: GetUserUseCase
  ) {}

  @Authorized()
  @Query(returns => User, { nullable: true })
  async getUser (@Arg('id', type => String) id: User['id']): Promise<User> {
    return this.getUserUseCase.execute(id)
  }
}
