const router = require('express').Router();
const {
    animeAiring, apod
} = require('../Functions/events');

router.get('/anime-airing', async (req, res) => {
    try {
        const result = await animeAiring();
        if (!result) return res.status(200).send(JSON.stringify({ response: 'No anime airing today' }));
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/apod', async (req, res) => {
    try {
        const result = await apod();
        res.status(200).send(JSON.stringify({ description: result.explanation, image: result.media_type === 'image' ? result.url : null, url: result.url }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

module.exports = router;