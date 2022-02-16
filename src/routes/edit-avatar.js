const router = require('express').Router();
const { 
    avatarFusion,
    milk,
    eject,
    fire,
    // hat,
    heLivesInYou,
    rip,
    sip,
    steamNowPlaying,
    steamNowPlayingClassic,
    triggered
} = require('../Functions/edit-avatar');

router.get('/avatarFusion', async (req, res) => {
    const base = req.query.base;
    const overlay = req.query.overlay;
    try {
        const image = await avatarFusion(base, overlay);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/milk', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const direction = req.query.direction;
    if (direction !== 'left' && direction !== 'right') return res.status(406).send(JSON.stringify({ error: 'Invalid direction' }));
    try {
        const image = await milk(avatarURL, direction);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/eject', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const imposter = req.query.imposter || '';
    const username = req.query.username;
    const userID = req.query.userID;
    if (!username || !NaN(userID)) return res.status(406).send(JSON.stringify({ error: 'Username not provided or userID' }));
    try {
        const image = await eject(avatarURL, imposter, username, userID);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/fire', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    try {
        const image = await fire(avatarURL);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/heLivesInYou', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    try {
        const image = await heLivesInYou(avatarURL);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/rip', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const username = req.query.username;
    const cause = req.query.cause;
    if (!username) return res.status(406).send(JSON.stringify({ error: 'Username not provided' }));
    if (!cause) return res.status(406).send(JSON.stringify({ error: 'Cause not provided' }));
    try {
        const image = await rip(avatarURL, username, cause);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/sip', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const direction = req.query.direction;
    if (direction !== 'left' && direction !== 'right') return res.status(406).send(JSON.stringify({ error: 'Invalid direction' }));
    try {
        const image = await sip(avatarURL, direction);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/steamNowPlaying', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const username = req.query.username;
    const game = req.query.game;
    if (!username) return res.status(406).send(JSON.stringify({ error: 'Username not provided' }));
    if (!game) return res.status(406).send(JSON.stringify({ error: 'Game not provided' }));
    try {
        const image = await steamNowPlaying(avatarURL, username, game);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/steamNowPlayingClassic', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const username = req.query.username;
    const game = req.query.game;
    if (!username) return res.status(406).send(JSON.stringify({ error: 'Username not provided' }));
    if (!game) return res.status(406).send(JSON.stringify({ error: 'Game not provided' }));
    try {
        const image = await steamNowPlayingClassic(avatarURL, username, game);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/triggered', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    try {
        const image = await triggered(avatarURL);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


module.exports = router;