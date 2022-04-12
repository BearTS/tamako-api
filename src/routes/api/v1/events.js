const router = require('express').Router();
const {
    animeAiring, apod
} = require('../../../controllers/events');
const { authorizeUser } = require('../../../middleware/authorize');

router.get('/anime-airing', authorizeUser, async (req, res) => {
    try {
        const result = await animeAiring();
        if (!result) return res.status(200).json({ response: 'No anime airing today' });
        res.status(200).json({ response: result });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/apod', authorizeUser, async (req, res) => {
    try {
        const result = await apod();
        res.status(200).json({ description: result.explanation, image: result.media_type === 'image' ? result.url : null, url: result.url });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;