import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt'
import { Service } from 'typedi'
import { jwtSecret } from '@config/auth'
import { UserRepository } from '@repositories/index'

@Service()
export class AuthService {
  constructor (
    private userRepository: UserRepository
  ) {
    passport.use(this.makeStrategy())
  }

  authenticate () {
    return passport.authenticate('jwt', { session: false })
  }

  private makeStrategy () {
    return new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      ignoreExpiration: false
    }, this.verify)
  }

  async verify (jwtPayload, done) {
    const user = await this.userRepository.findByEmail(jwtPayload.email)

    if (!user) done(null, false, { message: 'user not found' })

    done(null, user)
  }
}
