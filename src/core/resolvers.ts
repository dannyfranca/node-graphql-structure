import { NonEmptyArray } from 'type-graphql'
// import * as prismaRelationsResolvers from '@generated/typegraphql-prisma/resolvers/relations'
import * as useCaseResolvers from '@/useCases'

function generateResolversArray (entries: {[key: string] : Function}, endsWith: string) {
  const resolvers: Function[] = []

  Object.keys(entries).forEach(key => {
    if (key.endsWith(endsWith)) resolvers.push(entries[key])
  })

  return resolvers as NonEmptyArray<Function>
}

function mergeResolversArray (...arrays: NonEmptyArray<Function>[]) {
  let mergeArray = []

  for (const resolverArray of arrays) {
    mergeArray = [...resolverArray]
  }

  if (mergeArray.length === 0) throw new Error('Resolvers array is empty')

  return mergeArray as NonEmptyArray<Function>
}

export const resolvers = mergeResolversArray(
  // generateResolversArray(prismaRelationsResolvers, 'RelationsResolver'),
  generateResolversArray(useCaseResolvers, 'Resolver')
)
