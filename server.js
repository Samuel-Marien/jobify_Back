import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

// db and authUser
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// middlewares
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-hanldler.js'

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome home!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 6000

const start = async () => {
  try {
    await connectDB(process.env.MONGODB)
    app.listen(port, () => {
      console.log(
        `server is running on port : ${port}\n🥭 successfully connected to MongoDB 🥭`
      )
    })
  } catch (error) {
    console.log(error)
  }
}

start()
