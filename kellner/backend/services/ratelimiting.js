const rateLimit = require('express-rate-limit');

// Create a rate limiter with desired configuration
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // Maximum 20 registration attempts per 5 minutes
  message: 'Too many registration attempts. Please try again later.',
});

module.exports = limiter;