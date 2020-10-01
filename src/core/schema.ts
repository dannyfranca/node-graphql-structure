import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { resolvers } from '@core/resolvers'
import { authChecker } from '@core/authChecker'

export async function getSchema () {
  return buildSchema({
    resolvers,
    container: Container,
    authChecker,
    emitSchemaFile: true
  })
}
