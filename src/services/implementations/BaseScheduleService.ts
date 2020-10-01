import { CronJob } from 'cron'

export abstract class BaseScheduleService {
    protected cron: CronJob

    protected abstract pattern: string
    abstract execute(): Promise<void>
    protected onCompleted?(): Promise<void>

    protected init () {
      this.cron = new CronJob(this.pattern, this.execute, this.onCompleted, true, 'America/Sao_Paulo', this)
    }

    start () {
      return this.cron.start()
    }

    stop () {
      return this.cron.stop()
    }
}
