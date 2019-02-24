import * as dotenv from 'dotenv'
dotenv.config()
import * as Debug from 'debug'
import app from './app.js'

const debug = Debug('starter:server')

const host: string = process.env.HOST || 'localhost'
const port: string = process.env.PORT || '8080'

app.listen(Number(port), host, () => {
  debug(`listening on ${host}:${port}`)
})
