import { Service } from 'typedi'
import { UserRepository } from '@repositories/index'
import { User } from '@generated/typegraphql-prisma'

@Service()
export class GetUserUseCase {
  constructor (
    private userRepository: UserRepository
  ) {}

  async execute (id: User['id']) {
    return this.userRepository.findById(id)
  }
}
