import { use } from 'typescript-mix'
import { BaseScheduleService, BaseQueueService } from '@services/index'

export interface ScheduledQueueService<T> extends BaseQueueService<T>, BaseScheduleService {}

export abstract class ScheduledQueueService<T> {
    @use(BaseQueueService, BaseScheduleService) this

    constructor () {
      this.initQueue()
      this.initSchedule()
    }

    async execute () {
      await this.process()
    }
}
