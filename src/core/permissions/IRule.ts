import { Context } from '@core/context'
import { ResolverData } from 'type-graphql'

export type IRule = (action: ResolverData<Context>) => Promise<boolean>
