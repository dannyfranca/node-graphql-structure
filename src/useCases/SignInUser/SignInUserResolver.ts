import { Resolver, Query, Args } from 'type-graphql'
import { Service } from 'typedi'
import { SignInUserArgs } from './SignInUserArgs'
import { SignInUserUseCase } from './SignInUserUseCase'
import { AccessTokenReturn } from '@services/IUserToken'

@Service()
@Resolver()
export class SignInUserResolver {
  constructor (
    private signInUserUseCase: SignInUserUseCase
  ) {}

  @Query(returns => AccessTokenReturn, { nullable: true })
  async signInUser (@Args() args: SignInUserArgs) {
    return this.signInUserUseCase.execute(args)
  }
}
