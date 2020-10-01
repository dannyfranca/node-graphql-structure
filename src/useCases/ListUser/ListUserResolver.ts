import { Resolver, Query, Args, Authorized, Int } from 'type-graphql'
import { Service } from 'typedi'
import { User } from '@generated/typegraphql-prisma'
import { ListUserArgs } from './ListUserArgs'
import { ListUserUseCase } from './ListUserUseCase'

@Service()
@Resolver()
export class ListUserResolver {
  constructor (
    private listUserUseCase: ListUserUseCase
  ) {}

  @Authorized()
  @Query(returns => [User], { nullable: true })
  async listUser (@Args() args: ListUserArgs) {
    return this.listUserUseCase.execute(args)
  }

  @Authorized()
  @Query(returns => Int, { nullable: true })
  async countUser (@Args() args: ListUserArgs) {
    return this.listUserUseCase.count(args)
  }
}
