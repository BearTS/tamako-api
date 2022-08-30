const router = require('express').Router();

// /api
router.get('/', async (req, res) => {
    res.status(404).json({
        message: 'Welcome to Tamako API!',
        base_url: `${req.protocol}://${req.get('host')}/api/v1`,
        documentation: 'https://tamako.tech/docs/api/chatapi',
        endpoints: [
            'GET: /api/v1/joke',
            'GET: /api/v1/animalfact',
            'GET: /api/v1/images',
            'GET: /api/v1/roleplay',
            'GET: /api/v1/chat',
            'GET: /api/v1/randomizer',
            'GET: /api/v1/edit-avatar/:type',
            'GET: /api/v1/edit-image/:type',
            'GET: /api/v1/edit-meme/:type',
            'GET: /api/v1/events/:type',
            'GET: /api/v1/search:type'
        ],
        owner: [
            {
                author: 'BearTS',
                github: 'https://github.com/BearTS'
            }
        ]
    });
});

// API Version 1
router.use('/v1', require('./v1/main'));

// API Version 2 (soon lol)
// router.use('/v2', require('./v2/main'));

module.exports = router;