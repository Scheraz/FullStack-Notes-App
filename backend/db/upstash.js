require('dotenv').config()
const { Ratelimit } = require('@upstash/ratelimit')
const { Redis } = require('@upstash/redis')

// Create a new Redis instance using environment variables
const redis = Redis.fromEnv()

// Create rate limiter: 10 requests every 20 seconds
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '20 s'),
  analytics: true, // optional but recommended
})

module.exports = ratelimit
