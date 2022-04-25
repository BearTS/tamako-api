const router = require('express').Router();
const { join } = require('path');
const { 
    minecraftachivement,
    approve,
    axiscult,
    blur,
    bobross,
    brazzers,
    caution,
    certificate,
    chineserestaurant,
    circle,
    color,
    communist,
    contrast,
    createQr,
    customtext,
    danger,
    dannydevito,
    desaturate,
    dexter,
    distort,
    eyes,
    fireframe,
    gandhiquote,
    ghost,
    glassshatter,
    glitch,
    greyscale,
    gun,
    hands,
    highwaysign,
    hollywoodstar,
    invert,
    ifunny,
    jeopardyQuestion,
    legoIcon,
    licensePlate,
    mirror,
    motionBlur,
    newspaper,
    pet,
    pixelize,
    policeTape,
    rainbow,
    rejected,
    rotate,
    silouette,
    simp,
    speedLimit,
    SpongebobTimeCard,
    spotifyNowPlaying,
    tint,
    wanted,
    youDied,
    charcoal,
    emboss,
    fishEye,
    liquidRescale,
    noise,
    oilPainting,
    squish,
    swirl,
    undertale,
    wildPokemon
} = require('../../../controllers/edit-image');
const { errorResponse } = require('../../../helper/ApiResponse');
const { authRateLimiter } = require('../../../middleware/rateLimiter');

// Ratelimiter
router.use(authRateLimiter);

router.get('/achievement/:text', async (req, res) => {
    const input = req?.params?.text;
    if (!input || input.length > 50) return errorResponse(req, res, 'Invalid input');
    try {
        const image = await minecraftachivement(input);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

router.get('/approve', async (req, res) => {
    const url = req.query.image;
    try {
        const image = await approve(url);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/axis-cult', async (req, res) => {
    const username = req.query.username;
    let gender = req.query.gender;
    gender = gender.toLowerCase();
    const age = req.query.age;
    const profession = req.query.profession;
    if (!gender || gender !== 'male' || gender !== 'female') return errorResponse(req, res, 'No gender provided', 406);
    if (age < 1 || age > 1000) return errorResponse(req, res, 'Invalid Age', 406);
    if (profession.length > 15) return errorResponse(req, res, 'Enter a profession less than 15 characters', 406);
    if (!username) return errorResponse(req, res, 'Enter a username', 406);
    try {
        const image = await axiscult(username, gender, age, profession);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/blur', async (req, res) => {
    const radius = req.query.radius;
    const image = req.query.image; 
    if (radius < 1 || radius > 180) return errorResponse(req, res, 'Provide radius between 1 and 180', 406);
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const imageBlur = await blur(radius, image);
        if (imageBlur === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(imageBlur);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/bobross', async (req, res) => {
    const image = req.query.image; 
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const imageBlur = await bobross(image);
        if (imageBlur === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(imageBlur);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/brazzers', async (req, res) => {
    const image = req.query.image; 
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await brazzers(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/charcoal', async (req, res) => {
    const image = req.query.image; 
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await charcoal(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/caution', async (req, res) => {
    const text = req.query.text; 
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 500) return errorResponse(req, res, 'Text must be less than 500 characters', 406);
    try {
        const buffer = await caution(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/certificate', async (req, res) => {
    const reason = req.query.reason;
    const name = req.query.name;
    if (!reason.length || reason.length > 30) return errorResponse(req, res, 'Invalid reason, should be less than 30 characters', 406);
    if (!name.length || name.length > 30) return errorResponse(req, res, 'Invalid name, should be less than 30 characters', 406);
    try {
        const buffer = await certificate(reason, name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/chineserestaurant', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    try {
        const buffer = await chineserestaurant(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/circle', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await circle(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/color', async (req, res) => {
    const input = req.query.color;
    if (!input) return errorResponse(req, res, 'No color provided, #colorcode or name', 406);
    try {
        const buffer = await color(input);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/communist', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await communist(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/contrast', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await contrast(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/createqr', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    try {
        const buffer = await createQr(text);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/customtext', async (req, res) => {
    const url = req.query.image;
    const text = req.query.text;
    try {
        const image = await customtext(url, text);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/danger', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 500) return errorResponse(req, res, 'Text must be less than 500 characters', 406);
    try {
        const buffer = await danger(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/devito', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await dannydevito(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL', 406);
        if (buffer === 400) return errorResponse(req, res, 'No faces in this image', 406);
        if (buffer === 2) return errorResponse(req, res, 'Image too large', 406);
        if (buffer === 403) return errorResponse(req, res, 'The route is overloaded! Try again soon', 406);
        if (buffer === 500) return errorResponse(req, res, 'Internal server error', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/desaturate', async (req, res) => {
    const level = req.query.level;
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    if (isNaN(level)) return errorResponse(req, res, 'Invalid level, should be a number', 406);
    try {
        const buffer = await desaturate(level, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/dexter', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await dexter(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/distort', async (req, res) => {
    const level = req.query.level;
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    if (isNaN(level)) return errorResponse(req, res, 'Invalid level, should be a number', 406);
    try {
        const buffer = await distort(level, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/emboss', async (req, res) => {
    const image = req.query.image; 
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await emboss(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/eyes', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await eyes(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL', 406);
        if (buffer === 400) return errorResponse(req, res, 'No faces in this image', 406);
        if (buffer === 2) return errorResponse(req, res, 'Image too large', 406);
        if (buffer === 403) return errorResponse(req, res, 'The route is overloaded! Try again soon', 406);
        if (buffer === 500) return errorResponse(req, res, 'Internal server error', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/fireframe', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await fireframe(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/fisheye', async (req, res) => {
    const image = req.query.image;
    const level = req.query.level;
    if (!level) return errorResponse(req, res, 'No level provided', 406);
    if (level > 100 || level <= 0) return errorResponse(req, res, 'Invalid level, should be a number between 1 and 100', 406);
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await fishEye(level, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/gandhiquote', async (req, res) => {
    const quote = req.query.quote;
    if (!quote) return errorResponse(req, res, 'No quote provided', 406);
    if (quote.length > 500) return errorResponse(req, res, 'Quote too long', 406);
    try {
        const buffer = await gandhiquote(quote);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/ghost', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await ghost(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/glass-shatter', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await glassshatter(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/glitch', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await glitch(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/greyscale', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await greyscale(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/gun', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await gun(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/hands', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await hands(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/highwaysign', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    try {
        const buffer = await highwaysign(text);
        if (buffer === 0) return errorResponse(req, res, 'Invalid text');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/hollywoodstar', async (req, res) => {
    const name = req.query.name;
    if (!name) return errorResponse(req, res, 'No name provided', 406);
    if (name.length > 30) return errorResponse(req, res, 'Name too long', 406);
    try {
        const buffer = await hollywoodstar(name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/ifunny', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await ifunny(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/invert', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await invert(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/jeopardyQuestion', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 500) return errorResponse(req, res, 'Characters should be less than 500', 406);
    try {
        const buffer = await jeopardyQuestion(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/legoIcon', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await legoIcon(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/liquidRescale', async (req, res) => {
    const image = req.query.image; 
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await liquidRescale(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/licensePlate', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 10) return errorResponse(req, res, 'characters should be less than 10', 406);
    try {
        const buffer = await licensePlate(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/mirror', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    let type = req.query.type;
    if (!type) return errorResponse(req, res, 'No type provided', 406);
    type = type.toLowerCase();
    if (!(type === 'x' || type === 'y' || type == 'both')) return errorResponse(req, res, 'Type should be x or y or both', 406);
    try {
        const buffer = await mirror(type, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/motionBlur', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await motionBlur(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/noise', async (req, res) => {
    const image = req.query.image; 
    const type = req.query.type;
    if (!type) return errorResponse(req, res, 'No type provided', 406);
    const types = ['uniform', 'gaussian', 'multiplicative', 'impulse', 'laplacian', 'poisson'];
    if (!types.includes(type)) return errorResponse(req, res, ['Invalid type', { 'Available Types': types }], 406);
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await noise(type, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/newspaper', async (req, res) => {
    const headline = req.query.headline;
    const body = req.query.body;
    if (!headline) return errorResponse(req, res, 'No headline provided', 406);
    if (!body) return errorResponse(req, res, 'No body provided', 406);
    if (headline.length > 20) return errorResponse(req, res, 'Headline should be less than 20', 406);
    try {
        const buffer = await newspaper(headline, body);
        res.writeHead(200,{ 'Content-Type': 'image/gif' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/pet', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await pet(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/gif' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/pixelize', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await pixelize(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/policeTape', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await policeTape(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/rainbow', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await rainbow(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/rejected', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await rejected(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/rotate', async (req, res) => {
    const degrees = req.query.degrees;
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    if (!degrees) return errorResponse(req, res, 'No degrees provided', 406);
    if (degrees < -360 || degrees > 360) return errorResponse(req, res, 'Degrees should be between -360 and 360', 406);
    try {
        const buffer = await rotate(degrees, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/silouette', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await silouette(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/simp', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await simp(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/speedLimit', async (req, res) => {
    const limit = req.query.limit;
    if (!limit) return errorResponse(req, res, 'No limit provided', 406);
    if (limit.length > 5) return errorResponse(req, res, 'String should be less than 5 characters', 406);
    try {
        const buffer = await speedLimit(limit);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/spongebobTimeCard', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 280) return errorResponse(req, res, 'String should be less than 280 characters', 406);
    try {
        const buffer = await SpongebobTimeCard(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/spotifyNowPlaying', async (req, res) => {
    const name = req.query.name;
    const artist = req.query.artist;
    const image = req.query.image;
    if (!name) return errorResponse(req, res, 'No name provided', 406);
    if (!artist) return errorResponse(req, res, 'No artist provided', 406);
    if (name.length > 50 || artist.length > 50) return errorResponse(req, res, 'String should be less than 50 characters', 406);
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await spotifyNowPlaying(name, artist, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/oilPainting', async (req, res) => {
    const image = req.query.image; 
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await oilPainting(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/tint', async (req, res) => {
    let color = req.query.color;
    color = color.toLowerCase();
    const image = req.query.image;
    if (!color) return errorResponse(req, res, 'No color provided', 406);
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await tint(color, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/squish', async (req, res) => {
    const image = req.query.image; 
    let axis = req.query.axis;
    if (!axis) return errorResponse(req, res, ['No axis provided', { 'Axis': 'x or y' }], 406);
    axis = axis.toLowerCase();
    if (!(axis === 'x' || axis === 'y')) return errorResponse(req, res, 'Invalid axis', 406);
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await squish(axis, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/swirl', async (req, res) => {
    const image = req.query.image; 
    const degrees = req.query.degrees;
    if (degrees > 360) return errorResponse(req, res, 'Degrees should be less than 360', 406);
    if (degrees < -360) return errorResponse(req, res, 'Degrees should be greater than -360', 406);
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await swirl(degrees, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/undertale', async (req, res) => {
    const characters = require(join(__dirname, '..', '..', '..', 'resources', 'assets', 'json', 'undertale.json'));
    let character = req.query.character;
    const quote = req.query.quote;
    if (!quote) return errorResponse(req, res, 'No quote provided', 406);
    if (quote.length > 250) return errorResponse(req, res, 'String should be less than 250 characters', 406);
    // check if character is one of characters
    if (!characters.includes(character)) return errorResponse(req, res, ['Invalid character', { 'Available Characters': characters }], 406);
    try {
        const buffer = await undertale(character, quote);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/wanted', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await wanted(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/wildPokemon', async (req, res) => {
    const name = req.query.name;
    const image = req.query.image;
    if (!name) return errorResponse(req, res, 'No name provided', 406);
    if (name.length > 13) return errorResponse(req, res, 'Name should be less than 13 characters', 406);
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await wildPokemon(name, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/youDied', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'No image provided', 406);
    try {
        const buffer = await youDied(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

module.exports = router;