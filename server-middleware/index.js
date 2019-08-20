const consola = require('consola')
const mongodb = require('./mongodb').default
const Redis = require('./redis').default
const helloRoute = require('./hello').default

consola.ready({ message: `Server Middleware was called`, badge: true })

const express = require('express')
const app = express()

global._apiId = null

app.get('/', async (req, res, next) => {
  if (global._apiId == null) {
    global._apiId = Math.floor(Math.random() * 100)
  }
  try {
    const db = await mongodb.connection()
    const users = await db.collection('user').find({}).limit(5).toArray()

    const redis = await Redis.connection()
    redis.set('connection', new Date())
    const connectionDate = await redis.get('connection')
    res.status(200).json({ api: 'root', apiId: global._apiId, users, cache: connectionDate })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'error' })
  }
})

app.use('/hello', helloRoute)

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
