const router = require('express').Router();

const {
    threekyears,
    alert,
    bartChalkboard,
    beLikeBill,
    beautiful,
    boardroomMeeting,
    challenger,
    changeMyMind,
    chiIdea,
    crush,
    cursedSponge,
    deepFry,
    demotivational,
    distractedBF,
    drakePosting,
    EddFactBook,
    enslaved,
    FoodBroke,
    ForFiveHours,

} = require('../Functions/edit-meme');

router.get('/3000years', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await threekyears(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/alert', async (req, res) => {
    const message = req.query.message;
    if (!message) return res.status(406).send(JSON.stringify({ error: 'Invalid message' }));
    if (message.length > 280) return res.status(406).send(JSON.stringify({ error: 'Message too long' }));
    try {
        const buffer = await alert(message);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/bartChalkboard', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (text.length > 50) return res.status(406).send(JSON.stringify({ error: 'Message too long' }));
    try {
        const buffer = await bartChalkboard(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/beLikeBill', async (req, res) => {
    const name = req.query.name || 'Bill';
    if (!name) return res.status(406).send(JSON.stringify({ error: 'Name is required' }));
    if (name.length > 50) return res.status(406).send(JSON.stringify({ error: 'Message too long' }));
    try {
        const buffer = await beLikeBill(name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/beautiful', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    if (!avatarURL) return res.status(406).send(JSON.stringify({ error: 'Avatar URL required' }));
    try {
        const buffer = await beautiful(avatarURL);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/boardroomMeeting', async (req, res) => {
    const { question, suggestion1, suggestion2, final} = req.query;
    if (!question || !suggestion1 || !suggestion2 || !final) return res.status(406).send(JSON.stringify({ error: 'Missing parameters' }));
    if (question.length > 100 || suggestion1.length > 50 || suggestion2.length > 50 || final.length > 50) return res.status(406).send(JSON.stringify({ error: 'Strings too long' }));
    try {
        const buffer = await boardroomMeeting(question, suggestion1, suggestion2, final);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/challenger', async (req, res) => {
    const { image, silhouetted } = req.query;
    if (!image || !silhouetted) return res.status(406).send(JSON.stringify({ error: 'Invalid Parameters' }));
    try {
        const buffer = await challenger(image, silhouetted);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/change-my-mind', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await changeMyMind(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/chi-idea', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (text.length > 100) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await chiIdea(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/crush', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'Avatar URL required' }));
    try {
        const buffer = await crush(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/cursed-sponge', async (req, res) => {
    const amount = req.query.amount;
    if (!amount) return res.status(406).send(JSON.stringify({ error: 'No amount provided' }));
    if (amount > 100) return res.status(406).send(JSON.stringify({ error: 'Amount too high' }));
    if (amount < 1) return res.status(406).send(JSON.stringify({ error: 'Amount too low' }));
    try {
        const buffer = await cursedSponge(amount);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/deep-fry', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'Image required' }));
    try {
        const buffer = await deepFry(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/demotivational', async (req, res) => {
    const { title, image, text } = req.query;
    if (!title) return res.status(406).send(JSON.stringify({ error: 'Title required' }));
    if (!text) return res.status(406).send(JSON.stringify({ error: 'Text required' }));
    if (!image) return res.status(406).send(JSON.stringify({ error: 'Image required' }));
    if (text.length > 100 || title.length > 50) return res.status(406).send(JSON.stringify({ error: 'Text or title too long' }));
    try {
        const buffer = await demotivational(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/distracted-boyfriend', async (req, res) => {
    const { otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL } = req.query;
    if (!otherGirlAvatarURL || !boyfriendAvatarURL|| !girlfriendAvatarURL) return res.status(406).send(JSON.stringify({ error: 'Missing Parameters' }));
    try {
        const buffer = await distractedBF(otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/drakePosting', async (req, res) => {
    const { yeah, nah } = req.query;
    if (!yeah || !nah) return res.status(406).send(JSON.stringify({ error: 'Missing Parameters' }));
    if (yeah.length > 500 || nah.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await drakePosting(nah, yeah);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edd-facts-book', async (req, res) => {
    const fact = req.query.fact;
    if (!fact) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (fact.length > 500) return res.status(406).send(JSON.stringify({ error: 'Message too long' }));
    try {
        const buffer = await EddFactBook(fact);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/enslaved', async (req, res) => {
    const { image, name } = req.query;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'Image required' }));
    if (!name) return res.status(406).send(JSON.stringify({ error: 'No Name provided' }));
    if (name.length > 20) return res.status(406).send(JSON.stringify({ error: 'Name too long' }));
    try {
        const buffer = await enslaved(name, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/food-broke', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    if (!avatarURL) return res.status(406).send(JSON.stringify({ error: 'Avatar URL required' }));
    try {
        const buffer = await FoodBroke(avatarURL);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/for-five-hours', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await ForFiveHours(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

module.exports = router;
