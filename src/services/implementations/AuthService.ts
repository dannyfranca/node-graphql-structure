import { Service } from 'typedi'
import { UserRepository } from '@repositories/index'
import { JwtService } from '@services/index'
import { User } from '@generated/typegraphql-prisma'
import { BaseContext } from '@core/context'

@Service()
export class AuthService {
  constructor (
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async getUserFromContext (ctx: BaseContext): Promise<User | undefined> {
    const auth = ctx.req.get('Authorization')
    if (!auth) return

    const verifiedToken = this.getVerifiedToken(auth)
    if (!verifiedToken) return

    return this.userRepository.findByEmail(verifiedToken.email)
  }

  private getVerifiedToken (authHeader: string) {
    const token = authHeader.replace(/(bearer|Bearer)/g, '').trim()
    try {
      return this.jwtService.verify(token)
    } catch (error) {
      return ''
    }
  }
}
