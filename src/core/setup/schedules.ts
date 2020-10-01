import { Service, Container } from 'typedi'

@Service()
export class ScheduleCollection {
  constructor () {}
}

export const schedules = Container.get(ScheduleCollection)
