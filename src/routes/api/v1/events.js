const router = require('express').Router();
const {
    animeAiring, apod
} = require('../../../controllers/events');

router.get('/anime-airing', async (req, res) => {
    try {
        const result = await animeAiring();
        if (!result) return res.status(200).json({ response: 'No anime airing today' });
        res.status(200).json({ response: result });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/apod', async (req, res) => {
    try {
        const result = await apod();
        res.status(200).json({ description: result.explanation, image: result.media_type === 'image' ? result.url : null, url: result.url });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;