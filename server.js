import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connect.js'

// middlewares
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-hanldler.js'

app.get('/', (req, res) => {
  res.send('Welcome home!')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 6000

const start = async () => {
  try {
    await connectDB(process.env.MONGODB)
    app.listen(port, () => {
      console.log(
        `server is running on port : ${port}\n🥭 successfully coonected to MongoDB 🥭`
      )
    })
  } catch (error) {
    console.log(error)
  }
}

start()
