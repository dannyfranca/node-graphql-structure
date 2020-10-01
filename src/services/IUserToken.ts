import { Field, ObjectType } from 'type-graphql'
import { User } from '@generated/typegraphql-prisma'

export interface IUserToken {
    id: User['id']
    name: string
    email: string
}

@ObjectType()
export class AccessTokenReturn {
    @Field(type => String)
    accessToken!: string
}
