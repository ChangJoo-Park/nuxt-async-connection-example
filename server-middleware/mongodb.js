import myPlugin from '../plugins/my-plugin.server'
import { MongoClient } from 'mongodb'
import consola from 'consola'

console.log(myPlugin)
let _connection = null

const connect = () => {
  consola.ready({ message: `[MONGODB] Request connect`, badge: true })
  return new Promise((resolve, reject) => {
    if (_connection) {
      consola.ready({ message: `[MONGODB] Connection exists`, badge: true })
      return resolve(_connection)
    }
    MongoClient.connect('mongodb://localhost:27017/sori', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },(err, db) => {
      if (err) {
        console.log('connection failed')
        consola.error({ message: `[MONGODB] Connection failed`, badge: true })
        _connection = null
        return reject(err)
      }
      consola.ready({ message: `[MONGODB]Return connection`, badge: true })
      _connection = db.db('sori')
      return resolve(_connection)
    })
  })
}

const connection = () => {
  if (_connection) {
    consola.ready({ message: `[MONGODB] Connection exists in connection`, badge: true })
    return Promise.resolve(_connection)
  }
  consola.ready({ message: `[MONGODB] Create new connection in connection`, badge: true })
  return connect()
}

export default {
  connection
}
