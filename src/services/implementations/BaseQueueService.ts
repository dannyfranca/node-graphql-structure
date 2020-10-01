import { Queue, QueueScheduler, Worker, Job, WorkerOptions } from 'bullmq'

export abstract class BaseQueueService<T> {
    protected queue: Queue
    protected queueScheduler: QueueScheduler

    protected readonly abstract queueName: string
    protected readonly workerOptions: WorkerOptions = {}
    protected abstract processor(job: Job<T>): Promise<any>
    protected onCompleted?(job: Job<T>): Promise<any>
    protected onFailed?(job: Job<T>, error: Error): Promise<any>

    protected init () {
      this.queue = new Queue(this.queueName)
      this.queueScheduler = new QueueScheduler(this.queueName)
    }

    add (data: T, name: string = 'main') {
      return this.queue.add(name, data)
    }

    process () {
      const worker = new Worker(this.queueName, (job: Job<T>) => this.processor(job), this.workerOptions)

      if (this.onCompleted) worker.on('completed', this.onCompleted)
      if (this.onFailed) worker.on('failed', this.onFailed)

      return worker
    }
}
