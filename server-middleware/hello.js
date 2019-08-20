import mongodb from './mongodb'
import { Router } from 'express'

const router = new Router()

router.get('/', (req, res) => {
  mongodb.connection()
    .then(async (connection) => {
      const users = await connection.collection('user').find({}).limit(5).toArray()
      res.status(200).json({ api: 'hello', apiId: global._apiId, users })
    })
    .catch(err => {
      console.error(err)
      return res.status(400).json({ message: 'failed'})
    })
})


export default router
