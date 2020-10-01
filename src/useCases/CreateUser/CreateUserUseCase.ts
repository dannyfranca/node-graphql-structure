import { CreateUserArgs } from './CreateUserArgs'
import { Service } from 'typedi'
import * as bcrypt from 'bcrypt'
import { UserRepository } from '@repositories/index'

@Service()
export class CreateUserUseCase {
  constructor (
    private userRepository: UserRepository
  ) {}

  async execute (data: CreateUserArgs) {
    const userAlreadyExists = await this.userRepository.exists(data.email)

    if (userAlreadyExists) throw new Error(`User with e-mail ${data.email} already exists.`)

    return this.userRepository.create({
      ...data,
      salt: await this.generateSalt()
    })
  }

  private generateSalt () {
    return bcrypt.genSalt()
  }
}
