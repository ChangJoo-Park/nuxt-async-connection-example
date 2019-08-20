import Redis from 'ioredis'

let _connection = null

const connect = () => {
  return new Promise((resolve, reject) => {
    if (_connection) {
      return resolve(_connection)
    }

    const redis = new Redis()

    redis.on('ready', () => {
      consola.ready({ message: `[REDIS] Connection Ready`, badge: true })
      _connection = redis
      return resolve(_connection)
    })
    redis.on('connect', () => {})
  })
}

const connection = () => {
  if (_connection) {
    consola.ready({ message: `[REDIS] Connection exists in connection`, badge: true })
    return Promise.resolve(_connection)
  }
  consola.ready({ message: `[REDIS] Create new connection in connection`, badge: true })
  return connect()
}

export default {
  connection
}
