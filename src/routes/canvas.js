const router = require('express').Router();
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
    danger,
    dannydevito,
    desaturate,
    dexter,
    distort,
    eyes,
    fireframe
} = require('../Functions/edit-image/edit-image');

router.get('/edit-image/achievement/:text', async (req, res) => {
    const input = req?.params?.text;
    if (!input || input > 50) return res.status(400).send(JSON.stringify({ error: 'Invalid input' }));
    try {
        const image = await minecraftachivement(input);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/approve', async (req, res) => {
    const url = req.query.image;
    try {
        const image = await approve(url);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/axis-cult', async (req, res) => {
    const username = req.query.username;
    const gender = req.query.gender;
    const age = req.query.age;
    const profession = req.query.profession;
    if (!gender) return res.status(406).send(JSON.stringify({ error: 'No gender provided'}));
    if (age < 1 || age > 1000) return res.status(406).send(JSON.stringify({ error: 'Invalid Age'}));
    if (profession.length > 15) return res.status(406).send(JSON.stringify({ error: 'Enter a profession less than 15 characters'}));
    if (!username) return res.status(406).send(JSON.stringify({ error: 'Enter a username'}));
    try {
        const image = await axiscult(username, gender, age, profession);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/blur', async (req, res) => {
    const radius = req.query.radius;
    const image = req.query.image; 
    if (radius < 1 || radius > 180) return res.status(406).send(JSON.stringify({ error: 'Provide radius between 1 and 180'}));
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const imageBlur = await blur(radius, image);
        if (imageBlur === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(imageBlur);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/bobross', async (req, res) => {
    const image = req.query.image; 
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const imageBlur = await bobross(image);
        if (imageBlur === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(imageBlur);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/brazzers', async (req, res) => {
    const image = req.query.image; 
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await brazzers(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/edit-image/caution', async (req, res) => {
    const text = req.query.text; 
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    if (text > 500) return res.status(406).send(JSON.stringify({ error: 'Text must be less than 500 characters'}));
    try {
        const buffer = await caution(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/certificate', async (req, res) => {
    const reason = req.query.reason;
    const name = req.query.name;
    if (!reason || reason > 30) return res.status(406).send(JSON.stringify({ error: 'Invalid reason, should be less than 30 characters'}));
    if (!name || name > 30) return res.status(406).send(JSON.stringify({ error: 'Invalid name, should be less than 30 characters'}));
    try {
        const buffer = await certificate(reason, name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/chineserestaurant', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    try {
        const buffer = await chineserestaurant(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/edit-image/circle', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await circle(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/color', async (req, res) => {
    const input = req.query.color;
    if (!input) return res.status(406).send(JSON.stringify({ error: 'No color provided, #colorcode or name'}));
    try {
        const buffer = await color(input);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/edit-image/communist', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await communist(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/contrast', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await contrast(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/createqr', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    try {
        const buffer = await createQr(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/danger', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    if (text > 500) return res.status(406).send(JSON.stringify({ error: 'Text must be less than 500 characters'}));
    try {
        const buffer = await danger(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/devito', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await dannydevito(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        if (buffer === 400) return res.status(406).send(JSON.stringify({ error: 'No faces in this image' }));
        if (buffer === 2) return res.status(406).send(JSON.stringify({ error: 'Image too large' }));
        if (buffer === 403) return res.status(406).send(JSON.stringify({ error: 'The command is overloaded! Try again soon' }));
        if (buffer === 500) return res.status(500).send(JSON.stringify({ error: 'Internal server error' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/desaturate', async (req, res) => {
    const level = req.query.level;
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    if (isNaN(level)) return res.status(406).send(JSON.stringify({ error: 'Invalid level, should be a number'}));
    try {
        const buffer = await desaturate(level, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/dexter', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await dexter(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/distort', async (req, res) => {
    const level = req.query.level;
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    if (isNaN(level)) return res.status(406).send(JSON.stringify({ error: 'Invalid level, should be a number'}));
    try {
        const buffer = await distort(level, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edit-image/eyes', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await eyes(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        if (buffer === 400) return res.status(406).send(JSON.stringify({ error: 'No faces in this image' }));
        if (buffer === 2) return res.status(406).send(JSON.stringify({ error: 'Image too large' }));
        if (buffer === 403) return res.status(406).send(JSON.stringify({ error: 'The command is overloaded! Try again soon' }));
        if (buffer === 500) return res.status(500).send(JSON.stringify({ error: 'Internal server error' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/edit-image/fireframe', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await fireframe(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});




module.exports = router;