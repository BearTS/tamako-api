const router = require('express').Router();
const { hex } = require('random-js');
const {
    binary,
    base64,
    braille,
    bronySpeak,
    cowSay,
    cursive,
    Dvorak,
    emojify,
    fancy,
    mocking,
    morse,
    owo,
    reverse,
    shortenURl,
    superscript,
    yodaSpeak,
    upsideDown,
    shipName
} = require('../../../controllers/edit-text');

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

router.get('/hex', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await hex(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/mocking', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await mocking(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/morse', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await morse(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/owo', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await owo(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/reverse', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await reverse(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/shortenURL', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send(JSON.stringify({ err: 'No url provided' }));
    if (encodeURI(url).length > 2083) return  res.status(400).send(JSON.stringify({ err: 'URL is too long' }));
    try {
        const result = await shortenURl(url);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/ship', async (req, res) => {
    let first = req.query.first;
    let last = req.query.last;
    if (!first || !last) return res.status(400).send(JSON.stringify({ err: 'Missing Parameters!' }));
    first = first.toLowerCase();
    last = last.toLowerCase();
    if (first.length > 500 || last.length > 500) return res.status(400).send(JSON.stringify({ err: 'Too long!' }));

    try {
        const result = await shipName(first, last);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/superscript', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await superscript(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/yodaSpeak', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await yodaSpeak(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/upsideDown', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).send(JSON.stringify({ err: 'No text provided' }));
    try {
        const result = await upsideDown(text);
        res.status(200).send(JSON.stringify({ response: result }));
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

module.exports = router;