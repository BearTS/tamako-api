const router = require('express').Router();
const path = require('path');
const randomize = require('./randomize');
const total = ['joke', 'animalfact', 'images', 'roleplay', 'chat'];
router.get('/', function(req, res){
    res.send(`<h3>Correct Usage: /api/name</h3><br><br>Available Name: ${JSON.stringify(total)}`);
});
// joke
router.get('/joke', function(req, res){
    try {
        res.status(200).json({ 
            Api: 'Tamako API',
            Type: 'Joke API',
            joke: `${randomize(path.join(__dirname, '../api/jokeapi/am9rZ.json'))}`
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// animalfact
const animalfactA = ['bird', 'bunny', 'cat', 'dog', 'fox', 'giraffe', 'kangaroo', 'koala', 'panda', 'racoon', 'whale'];
router.get('/animalfact', function(req, res){
    var animal = req.query.animal;
    try {
        if (animalfactA.includes(animal)) {
            res.status(200).json({ 
                Api: 'Tamako API',
                Type: 'Animal Fact API',
                url: `${randomize(path.join(__dirname, `../api/animalfact/${animal}.json`))}`
            });
        } else {
            res.status(404).send(`<h1>No such Animal Exists in Our API Database</h1><br><b>Correct Usage: /animalfact?animal=name</b><br><br>Avaiable: ${JSON.stringify(animalfactA)}`);
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

// Images
const imagesA = ['bird', 'cat', 'dog', 'fox','koala', 'mai', 'mai-nsfw', 'panda', 'redpanda', 'sabrina', 'tamako', 'tamako-nsfw', 'waifu'];
router.get('/images/type', function(req, res){
    var type = req.query.type;
    try {
        if (imagesA.includes(type)) {
            res.status(200).json({ 
                Api: 'Tamako API',
                Type: 'Images API',
                url: `${randomize(path.join(__dirname, `../api/image/${type}.json`))}`
            });
        } else {
            res.status(400).send(`<h1>No such Image Exists in Our API Database</h1><br><b>Correct Usage: /images?type=name</b><br><br>Avaiable: ${JSON.stringify(imagesA)}`);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// roleplay
const roleplayA = ['baka', 'blush', 'bite', 'celebrate', 'cry', 'dance', 'disgust', 'eat', 'explode', 'feed', 'fistbump', 'happy', 'highfive', 'holdhands', 'hug', 'hug', 'inhale', 'kill', 'kiss', 'lick', 'midfing', 'pat', 'poke', 'punch', 'slap', 'sleep', 'smile', 'smug', 'suicide', 'tickle', 'wave', 'wink'];
router.get('/roleplay', function(req, res){
    var type = req.query.type;
    try {
        if (roleplayA.includes(type)) {
            res.status(200).json({ 
                Api: 'Tamako API',
                Type: 'Roleplay API',
                url: `${randomize(path.join(__dirname, `../api/roleplay/${type}.json`))}`
            });
        } else {
            res.status(404).send(`<h1>No such Roleplay Command Exists</h1><br><b>Correct Usage: /roleplay?type=roleplay name</b><br><br>Avaiable: ${JSON.stringify(roleplayA)}`);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;