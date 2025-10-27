const ratelimit = require('../db/upstash.js')

const rateLimitMiddleware = async (req, res, next) => {
  try {
    const identifier = req.ip // track requests per IP
    const { success } = await ratelimit.limit(identifier)

    if (!success) {
      return res.status(429).json({ msg: 'Too many requests' })
    }

    next()
  } catch (err) {
    console.error('Rate limiter error:', err)
    next() // do not block requests if ratelimiter fails
  }
}

module.exports = rateLimitMiddleware
