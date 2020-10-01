import { Service, Container } from 'typedi'
import { SendMessageSchedule } from '@useCases/SendMessage/SendMessageSchedule'
import { GenerateMessagesSchedule } from '@/useCases/GenerateMessages'
import { GenerateSearchBatchToMessageContactsSchedule } from '@/useCases/GenerateSearchBatchToMessageContacts'

@Service()
export class ScheduleCollection {
  constructor (
        public generateSearchBatchToMessageContactsSchedule: GenerateSearchBatchToMessageContactsSchedule,
        public generateMessageSchedule: GenerateMessagesSchedule,
        public sendMessageSchedule: SendMessageSchedule
  ) {}
}

export const schedules = Container.get(ScheduleCollection)
