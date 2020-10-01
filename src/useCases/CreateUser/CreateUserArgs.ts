import { Field, InputType } from 'type-graphql'
import { IsEmail, MinLength } from 'class-validator'

@InputType()
export class CreateUserArgs {
  @Field()
  name: string

  @Field()
  @IsEmail({}, { message: 'O e-mail não é válido' })
  email: string

  @Field()
  @MinLength(8, { message: 'As senha deve ter no mínimo 8 caracteres' })
  password: string
}
