import { Queue, QueueScheduler, Worker, Job, WorkerOptions } from 'bullmq'

export abstract class BaseQueueService<T> {
    protected queue: Queue
    protected queueScheduler: QueueScheduler

    protected readonly abstract queueName: string
    protected readonly workerOptions: WorkerOptions = {}
    protected abstract processor(job: Job<T>): Promise<any>
    protected onJobCompleted?(job: Job<T>): Promise<any>
    protected onJobFailed?(job: Job<T>, error: Error): Promise<any>

    protected initQueue () {
      this.queue = new Queue(this.queueName)
      this.queueScheduler = new QueueScheduler(this.queueName)
    }

    add (data: T, name: string = 'main') {
      return this.queue.add(name, data)
    }

    process () {
      const worker = new Worker(this.queueName, (job: Job<T>) => this.processor(job), this.workerOptions)

      if (this.onJobCompleted) worker.on('completed', this.onJobCompleted)
      if (this.onJobFailed) worker.on('failed', this.onJobFailed)

      return worker
    }
}
