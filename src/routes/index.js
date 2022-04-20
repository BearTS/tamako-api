const router = require('express').Router();

// Main route
router.get('/', async (req, res) => {
    res.status(200).render('index.html');
});

// API routes
router.use('/api', require('./api/index'));

// Admin route
router.use('/admin', require('./admin/main'));

module.exports = router;