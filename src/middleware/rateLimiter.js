const { RateLimiterMemory } = require('rate-limiter-flexible');
const { getClientIp } = require('request-ip');
const moment = require('moment');
const { handleRateLimit } = require('./errorHandler');

// Rate limit options
const opts = {
    points: 90, // 90 requests
    duration: 60, // per 60 second by IP,
    blockDuration: 60 * 15 // Block for 15 minutes after reaching the limit
};

const limiter = new RateLimiterMemory(opts);

const rateLimiter = async (req, res, next) => {
    limiter.consume(getClientIp(req))
        .then((rateLimiterRes) => {
            res.set({
                'X-RateLimit-Limit': opts.points,
                'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext)
            });
            next();
        })
        .catch((rateLimiterRes) => {
            res.set('Retry-After', moment.utc((rateLimiterRes.msBeforeNext / 1000) * 1000).format('mm:ss')); 
            res.set({
                'X-RateLimit-Limit': opts.points,
                'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext)
            });
            handleRateLimit(req, res); // Send an rate limited message
        });
};

module.exports = rateLimiter;