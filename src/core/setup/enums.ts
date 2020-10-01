import { registerEnumType } from 'type-graphql'
import { Channel, MessageStatus } from '@generated/typegraphql-prisma'

registerEnumType(Channel, {
  name: 'Channel',
  description: 'Messaging Channels'
})

registerEnumType(MessageStatus, {
  name: 'SendStatus',
  description: 'Message Channels'
})
