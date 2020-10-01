import { Service } from 'typedi'
import * as bcrypt from 'bcrypt'
import { UserDelegate, PrismaClient } from '@prisma/client'
import { UserCreateInput, User } from '@generated/typegraphql-prisma'
import { FindManyUserArgs } from '../../generated/typegraphql-prisma/resolvers/crud/User/args/FindManyUserArgs'

@Service()
export class UserRepository {
    public readonly db: UserDelegate

    constructor (private readonly prisma: PrismaClient) {
      this.db = this.prisma.user
    }

    findById (id: User['id']) {
      return this.db.findOne({ where: { id } })
    }

    findByEmail (email: string) {
      return this.db.findOne({
        where: { email }
      })
    }

    list (args: FindManyUserArgs) {
      return this.db.findMany(args)
    }

    count (args: Omit<FindManyUserArgs, 'select' | 'include'>) {
      return this.db.count(args)
    }

    async create (data: UserCreateInput) {
      data.password = await this.hashPassword(data.password, data.salt)
      return this.db.create({ data })
    }

    exists (email: string) {
      return this.db.findOne({ where: { email }, select: { id: true } })
    }

    async validateUserPassword (authCredentialDto: IAuthCredential) {
      const { email, password } = authCredentialDto
      const user = await this.findByEmail(email)
      const hash = await this.hashPassword(password, user.salt)

      if (user && hash === user.password) return user

      return null
    }

    private hashPassword (password: string, salt: string) {
      return bcrypt.hash(password, salt)
    }
}

export class IAuthCredential {
    email: string
    password: string
}
