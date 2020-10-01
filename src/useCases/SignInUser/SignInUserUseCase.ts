import { Service } from 'typedi'
import { UserRepository } from '@repositories/index'
import { SignInUserArgs } from './SignInUserArgs'
import { JwtService } from '@services/index'

@Service()
export class SignInUserUseCase {
  constructor (
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async execute (data: SignInUserArgs) {
    const user = await this.userRepository.validateUserPassword(data)

    if (!user) throw new Error('Seu e-mail e senha não são compatíveis')

    const { id, email, name } = user
    const accessToken = await this.jwtService.signIn({ id, email, name })

    return { accessToken }
  }
}
