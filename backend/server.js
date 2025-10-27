require('dotenv').config()
const express = require('express')
const notesRoutes = require('./routes/notesRoutes')
const app = express()
const rateLimitMiddleware = require('./middleware/rateLimiter')
const connectDB = require('./db/db')

//MIDDLEWARE
app.use(express.json())
app.use(rateLimitMiddleware)

//ROUTES
app.use('/api/notes', rateLimitMiddleware, notesRoutes)

//APP RUN
const PORT = process.env.PORT || 5001

//DATABASE CONNECTION
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})
