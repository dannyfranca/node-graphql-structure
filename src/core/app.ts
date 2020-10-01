import { ApolloServer } from 'apollo-server-express'
import { getSchema } from '@core/schema'
import { createContext as context } from '@core/context'
import { createExpressServer } from '@core/express/setup'
import { server as opts, isDev } from '@config/index'

export async function app () {
  const app = createExpressServer()

  const schema = await getSchema()

  const server = new ApolloServer({ schema, context, playground: isDev })
  server.applyMiddleware({ app })

  app.listen(opts, () => console.log(`🚀 Server ready at: http://localhost:${opts.port} ⭐️`))
}
