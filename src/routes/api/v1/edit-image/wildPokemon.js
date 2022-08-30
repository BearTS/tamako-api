const router = require('express').Router();
const { wildPokemon } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { name, image } = req.query;

    var errors = [];
    if (!name)
        errors.push({ status: 406, details: 'No name parameter provided' });
    else if (name.length > 13)
        errors.push({ status: 406, details: 'Name should be less than 13 characters' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
  
    try {
        const buffer = await wildPokemon(name, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;