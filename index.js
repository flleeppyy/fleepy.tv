const fastify = require('fastify')
const fastifyStatic = require('fastify-static')
const fs = require('fs')
const path = require('path')

const port = 8080
const app = fastify({
  trustProxy: true,
})

app.addHook("onRequest", (req, _, next) => {
  console.log(`IP: ${req.headers['cf-connecting-ip'] || req.ip} Requested ${req.url}`) // just do some logging
  next()
})

// app.setNotFoundHandler((req, res) => {
//   res.sendFile('fuckywucky.html')
// })

app.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  // wildcard: "/*",
})

app.listen(port, '0.0.0.0', () => console.log(`listening at http://localhost:${port}`))
