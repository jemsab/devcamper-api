const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/error')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Connect to DB
connectDB()

// Route files
const bootcamps = require('./Routes/bootcamps')
const courses = require('./Routes/courses')
const auth = require('./Routes/auth')
const users = require('./Routes/users')

const app = express()

//Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(fileupload())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server started on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold
  )
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err}`.red)
  server.close(() => {
    process.exit(1)
  })
})
