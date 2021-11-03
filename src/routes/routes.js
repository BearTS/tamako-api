const router = require('express').Router();
const path = require("path")
const randomize = require('./randomize');

const total = ["joke", "animalfact", "images", "roleplay"]
router.get('/', function(req, res){
	res.send(`<h3>Correct Usage: /api/name</h3><br><br>Available Name: ${JSON.stringify(total)}`);
})
// joke
router.get('/joke', function(req, res){
	res.json({ 
		Api: "Tamako API",
		Type: "Joke API",
		joke: `${randomize(path.join(__dirname, `../api/jokeapi/am9rZ.json`))}`
	})
})
// animalfact
const animalfactA = ["bird", "bunny", "cat", "dog", "fox", "giraffe", "kangaroo", "koala", "panda", "racoon", "whale"]
router.get('/animalfact', function(req, res){
	var animal = req.query.animal;
	if (animalfactA.includes(animal)) {
		res.json({ 
			Api: "Tamako API",
			Type: "Animal Fact API",
			url: `${randomize(path.join(__dirname, `../api/animalfact/${type}.json`))}`
		})
	 } else {
		res.send(`<h1>No such Animal Exists in Our API Database</h1><br><b>Correct Usage: /animalfact?animal=name</b><br><br>Avaiable: ${JSON.stringify(animalfactA)}`)
	}
})

// Images
const imagesA = ["bird", "cat", "dog", "fox","koala", "mai", "mai-nsfw", "panda", "redpanda", "sabrina", "tamako", "tamako-nsfw", "waifu"]
router.get('/images/type', function(req, res){
	var type = req.query.type;
	if (imagesA.includes(type)) {
		res.json({ 
			Api: "Tamako API",
			Type: "Images API",
			url: `${randomize(path.join(__dirname, `../api/image/${type}.json`))}`
		})
	 } else {
		res.send(`<h1>No such Image Exists in Our API Database</h1><br><b>Correct Usage: /images?type=name</b><br><br>Avaiable: ${JSON.stringify(imagesA)}`)
	}
})

// roleplay
const roleplayA = ["baka", "blush", "bite", "celebrate", "cry", "dance", 'disgust', "eat", "explode", "feed", "fistbump", "happy", "highfive", "holdhands", "hug", "hug", "inhale", "kill", "kiss", "lick", "midfing", "pat", "poke", "punch", "slap", "sleep", "smile", "smug", "suicide", "tickle", "wave", "wink"]
router.get('/roleplay', function(req, res){
	var type = req.query.type;
	if (roleplayA.includes(type)) {
		res.json({ 
			Api: "Tamako API",
			Type: "Roleplay API",
			url: `${randomize(path.join(__dirname, `../api/roleplay/${type}.json`))}`
		})
	 } else {
		res.send(`<h1>No such Roleplay Command Exists</h1><br><b>Correct Usage: /roleplay?type=roleplay name</b><br><br>Avaiable: ${JSON.stringify(roleplayA)}`)
	}
})

module.exports = router;