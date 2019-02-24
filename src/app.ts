import * as Debug from 'debug'
import * as path from 'path'
import * as morgan from 'morgan'
import * as express from 'express'

// debug logger
const debug = Debug('starter:index')

// app init
var app: express.Application = express()
app.set('env', process.env.NODE_ENV)

// logger
const morganLogPreset: string = app.get('env') === 'development' ? 'dev' : 'combined'
app.use(morgan(morganLogPreset))

// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// AWS status endpoint
app.get('/status', function handleStatusCheck (req: express.Request, res: express.Response) {
  res.send('ok')
})

// Static server
app.use(express.static(path.join(__dirname, 'public')))

// Render index.pug
app.get('/', function handleMain (req: express.Request, res: express.Response) {
  res.render('index')
})

// Not found handler
app.use(function handleNotFound (req: express.Request, res: express.Response) {
  res.sendStatus(404)
})

// Error handler
app.use(function (err: Error, req: express.Request, res: express.Response) {
  debug(err)
  res.status(500)
  if (app.get('env') === 'development') {
    res.type('text/plain')
    return res.send(err.stack)
  }
  res.end()
})

export default app
