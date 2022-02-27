const router = require('express').Router();
const {
    binary,
    base64,
    braille,
    bronySpeak,
    cowSay,
    cursive,
    Dvorak,
    emojify,
    fancy
} = require('../Functions/edit-text');

router.get('/base64', async (req, res) => {
    let { mode, text } = req.query;
    if (!mode) mode = 'encode';
    mode = mode.toLowerCase();
    if (!(mode === 'encode' || mode === 'decode')) return res.status(400).send(JSON.stringify({err: 'Invalid mode'}));
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await base64(mode, text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/binary', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await binary(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/braille', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await braille(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/brony-speak', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await bronySpeak(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/clap', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = text.replaceAll(' ', ' 👏 ');
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/cow-say', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await cowSay(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/cursive', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await cursive(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/dvorak', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await Dvorak(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/emojify', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await emojify(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/fancy', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await fancy(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});
module.exports = router;