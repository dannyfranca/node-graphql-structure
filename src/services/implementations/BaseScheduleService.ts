import { CronJob } from 'cron'

export abstract class BaseScheduleService {
    protected cron: CronJob

    protected abstract cronPattern: string
    abstract execute(): Promise<void>
    protected onScheduleCompleted?(): Promise<void>

    protected initSchedule () {
      this.cron = new CronJob(this.cronPattern, this.execute, this.onScheduleCompleted, true, 'America/Sao_Paulo', this)
    }

    start () {
      return this.cron.start()
    }

    stop () {
      return this.cron.stop()
    }
}
