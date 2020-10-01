import { Service } from 'typedi'
import { UserRepository } from '@repositories/index'
import { ListUserArgs } from './ListUserArgs'

@Service()
export class ListUserUseCase {
  constructor (
    private userRepository: UserRepository
  ) {}

  async execute (data: ListUserArgs) {
    return this.userRepository.list(data)
  }

  async count (data: ListUserArgs) {
    return this.userRepository.count(data)
  }
}
