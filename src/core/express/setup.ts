import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import { json } from 'body-parser'
import { router } from './routes'
import { setJsonHeader } from './middlewares'

export function createExpressServer () {
  const app = express()

  app.use(compression())
  app.use(helmet())
  app.use(setJsonHeader())
  app.use(json())
  app.use(router)

  return app
}
