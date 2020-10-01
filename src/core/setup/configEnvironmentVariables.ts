import { join } from 'path'

require('dotenv').config({ path: join(process.cwd(), `.env.${process.env.NODE_ENV}`) })
