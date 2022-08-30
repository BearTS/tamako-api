const router = require('express').Router();
const { enslaved } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { image, name } = req.query;

    var errors = [];
    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });

    if (!name)
        errors.push({ status: 406, details: 'No name parameter provided' });
    else if (name.length > 20)
        errors.push({ status: 406, details: 'Name too long' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await enslaved(name, image);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;