import { Field, ArgsType } from 'type-graphql'
import { IsEmail } from 'class-validator'

@ArgsType()
export class SignInUserArgs {
  @Field()
  @IsEmail({}, { message: 'Precisa ser um e-mail' })
  email: string

  @Field()
  password: string
}
