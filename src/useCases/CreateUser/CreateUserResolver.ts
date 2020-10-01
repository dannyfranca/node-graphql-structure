import { Resolver, Mutation, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { User } from '@generated/typegraphql-prisma'
import { CreateUserArgs } from './CreateUserArgs'
import { CreateUserUseCase } from './CreateUserUseCase'

@Service()
@Resolver(of => User)
export class CreateUserResolver {
  constructor (
    private createUserUseCase: CreateUserUseCase
  ) {}

  // @Authorized()
  @Mutation(returns => User)
  async createUser (
    @Arg('data') data: CreateUserArgs
  ): Promise<User> {
    return this.createUserUseCase.execute(data)
  }
}
