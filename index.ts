// Copyright (C) 2021 Flleeppyy (Micah Jinkerson)
// https://github.com/flleeppyy/fleepy.tv/blob/master/LICENSE
import fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import * as fs from 'fs'
import path from 'path'

const port = Number(process.env.PORT) ?? 8001
const app = fastify({
  trustProxy: true,
})

app.addHook("onRequest", (req, _, next) => {
  console.log(`IP: ${req.headers['cf-connecting-ip'] || req.ip} Requested ${req.url}`)
  next()
})

app.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  wildcard: true,
})

app.setNotFoundHandler((req, res) => {
  res.header('Content-Type', 'text/html')
  res.type('text/html')
  return res.status(404).send(fs.readFileSync(path.join(__dirname, 'errors/404.html')))
})
app.listen(port, '0.0.0.0', () => console.log(`listening at http://localhost:${port}`))
 