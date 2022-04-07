const router = require('express').Router();

// API routes
router.use('/api', require('./api/index'));

// Admin route
router.use('/admin', require('./admin/main'));

module.exports = router;