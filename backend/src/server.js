require('dotenv').config()
const express = require('express')
const notesRoutes = require('../routes/notesRoutes')
const app = express()
const rateLimitMiddleware = require('../middleware/rateLimiter')
const connectDB = require('../db/db')
const cors = require('cors')
const path = require('path')

//MIDDLEWARE
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  )
}

app.use(rateLimitMiddleware)

//ROUTES
app.use('/api/notes', rateLimitMiddleware, notesRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'dist'), 'index.html')
  })
}

//APP RUN
const PORT = process.env.PORT || 5001

//DATABASE CONNECTION
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})
