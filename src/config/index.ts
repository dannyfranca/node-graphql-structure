export const isDev = process.env.NODE_ENV === 'development'
export const mainUserMail = 'danny_vcf@hotmail.com'
export const batchNumber = 300

export * as queue from './queue'
export * as schedule from './schedules'
export * as server from './server'
export * as auth from './auth'
export * as mail from './mail'
