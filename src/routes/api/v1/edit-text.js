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
const { authorizeUser } = require('../../../middleware/authorize');
const { errorResponse } = require('../../../helper/ApiResponse');
const { authRateLimiter } = require('../../../middleware/rateLimiter');

// Ratelimiter
router.use(authRateLimiter);

router.get('/base64', authorizeUser, async (req, res) => {
    let { mode, text } = req.query;
    if (!mode) mode = 'encode';
    mode = mode.toLowerCase();
    if (!(mode === 'encode' || mode === 'decode')) return errorResponse(req, res, 'Invalid mode');
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await base64(mode, text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/binary', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await binary(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/braille', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await braille(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/brony-speak', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await bronySpeak(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/clap', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = text.replaceAll(' ', ' 👏 ');
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/cow-say', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await cowSay(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/cursive', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await cursive(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/dvorak', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await Dvorak(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/emojify', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await emojify(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/fancy', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await fancy(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/hex', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await hex(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/mocking', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await mocking(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/morse', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await morse(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/owo', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await owo(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/reverse', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await reverse(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/shortenURL', authorizeUser, async (req, res) => {
    const { url } = req.query;
    if (!url) return errorResponse(req, res, 'No url provided');
    if (encodeURI(url).length > 2083) return errorResponse(req, res, 'URL is too long');
    try {
        const result = await shortenURl(url);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/ship', authorizeUser, async (req, res) => {
    let first = req.query.first;
    let last = req.query.last;
    if (!first || !last) return errorResponse(req, res, 'Missing Parameters!');
    first = first.toLowerCase();
    last = last.toLowerCase();
    if (first.length > 500 || last.length > 500) return errorResponse(req, res, 'Too long!');

    try {
        const result = await shipName(first, last);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/superscript', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await superscript(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/yodaSpeak', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await yodaSpeak(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/upsideDown', authorizeUser, async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text provided');
    try {
        const result = await upsideDown(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

module.exports = router;