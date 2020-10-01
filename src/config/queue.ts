import { cpus } from 'os'

export const workerPoolNumber = cpus().length
