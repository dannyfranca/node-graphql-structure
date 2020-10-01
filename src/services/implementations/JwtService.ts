import { Service } from 'typedi'
import { verify, sign } from 'jsonwebtoken'
import { jwtSecret, expiresIn } from '@config/auth'
import { IUserToken } from '@services/IUserToken'

@Service()
export class JwtService {
  verify (token: string) {
    return verify(token, jwtSecret) as IUserToken
  }

  signIn (payload: IUserToken): string {
    return sign(payload, jwtSecret, { expiresIn })
  }
}
