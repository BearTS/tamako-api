require('dotenv').config();
const router = require('express').Router();
const path = require('path');
const fetch = require('node-fetch');
const randomize = require('./randomize');
const total = ['joke', 'animalfact', 'images', 'roleplay', 'chat'];

router.get('/',async (req,res) => {
    res.status(404).json({
        message: 'Welcome to Tamako API!',
        data: {
            total: total,
        }
    });
});
// joke
router.get('/joke',async (req,res) => {
    try {
        res.status(200).json({ 
            Api: 'Tamako API',
            Type: 'Joke API',
            joke: `${randomize(path.join(__dirname, '..', 'api', 'jokeapi', 'am9rZ.json'))}`
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// animalfact
router.get('/animalfact',async (req,res) => {
    const animalfactA = ['bird', 'bunny', 'cat', 'dog', 'fox', 'giraffe', 'kangaroo', 'koala', 'panda', 'racoon', 'whale'];

    var animal = req.query.animal;
    try {
        if (animalfactA.includes(animal)) {
            res.status(200).json({ 
                Api: 'Tamako API',
                Type: 'Animal Fact API',
                url: `${randomize(path.join(__dirname, '..', 'api', 'animalfact', `${animal}.json`))}`
            });
        } else {
            res.status(404).json({ 
                Api: 'Tamako API',
                Type: 'Animal Fact API',
                message: 'Animal not found!',
                available: animalfactA
            });
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

// Images
router.get('/images/:type',async (req,res) => {
    const imagesA = ['bird', 'cat', 'dog', 'fox','koala', 'mai', 'mai-nsfw', 'panda', 'redpanda', 'sabrina', 'tamako', 'tamako-nsfw', 'waifu'];

    var type = req.params.type;
    try {
        if (imagesA.includes(type)) {
            res.status(200).json({ 
                Api: 'Tamako API',
                Type: 'Images API',
                url: `${randomize(path.join(__dirname, '..', 'api', 'image', `${type}.json`))}`
            });
        } else {
            res.status(404).json({ 
                Api: 'Tamako API',
                Type: 'Image API',
                message: 'Type not found!',
                available: imagesA
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// roleplay
router.get('/roleplay/:type',async (req,res) => {
    const roleplayA = ['baka', 'blush', 'bite', 'celebrate', 'cry', 'dance', 'disgust', 'eat', 'explode', 'feed', 'fistbump', 'happy', 'highfive', 'holdhands', 'hug', 'hug', 'inhale', 'kill', 'kiss', 'lick', 'midfing', 'pat', 'poke', 'punch', 'slap', 'sleep', 'smile', 'smug', 'suicide', 'tickle', 'wave', 'wink'];
    var type = req.params.type;
    try {
        if (roleplayA.includes(type)) {
            res.status(200).json({ 
                Api: 'Tamako API',
                Type: 'Roleplay API',
                url: `${randomize(path.join(__dirname, '..', 'api', 'roleplay', `${type}.json`))}`
            });
        } else {
            res.status(404).json({ 
                Api: 'Tamako API',
                Type: 'Roleplay API',
                message: 'Type not found!',
                available: roleplayA
            });    
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/chat', async (req,res) => {
    const regex = new RegExp(/\d{18}/g);
    const token = req.query.token;
    const message = req.query.message;
    const user = req.query.userid || '000000000000000000';
    if (!regex.test(user)) return res.status(400).json({ message: 'Invalid user id!' });
    try {
        if (!token) return res.status(400).json({ 'message': 'Token is required' });
        if (!message) return res.status(400).json({ 'message': 'Message is required' });
        const output = await chat(user, message);
        res.status(200).json({
            Api: 'Tamako API',
            Type: 'Chat API',
            userid: user === '000000000000000000' ? 'None Provided' : user,
            message: output
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

async function chat(userid, message) {
    const respond = await fetch(`${process.env.CHATBRAIN}&uid=${encodeURIComponent(userid)}&msg=${encodeURIComponent(message)}`)
        .then(res => res.json())
        .catch(() => {});
    return respond.cnt;
}

module.exports = router;