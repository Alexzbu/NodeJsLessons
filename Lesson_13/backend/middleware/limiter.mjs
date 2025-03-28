import rateLimit from 'express-rate-limit'

export const limiter = rateLimit({
   windowMs: 15 * 60 * 1000,
   limit: 100,
   message: "Too many requests, please try again in 15 minutes.",
   standardHeaders: true,
   legacyHeaders: false,
})