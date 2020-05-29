const compression = require('compression')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/error')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const xssClean = require('xss-clean')
const cors = require('cors')
const expressRateLimit = require('express-rate-limit')
const hpp = require('hpp')
const mongoSanitize = require('express-mongo-sanitize')
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
const reviews = require('./Routes/reviews')

const app = express()

app.use(compression({}))
//Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(fileupload())

// Sanitize user login information
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS
app.use(xssClean())

// Rate limiter
/*app.use(
  expressRateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
  })
)*/

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

// Set static folder
//app.use(express.static(path.join(__dirname, 'public')))

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)
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
