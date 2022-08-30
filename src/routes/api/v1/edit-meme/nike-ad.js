const router = require('express').Router();
const { nikeAd } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { something, sacrifice, image } = req.query;

    var errors = [];
    if (!something)
        errors.push({ status: 406, details: 'No something parameter provided' });
    else if (something.length > 50)
        errors.push({ status: 406, details: 'Something too long' });

    if (!sacrifice)
        errors.push({ status: 406, details: 'No sacrifice parameter provided' });
    else if (sacrifice.length > 50)
        errors.push({ status: 406, details: 'Sacrifice too long' });
    
    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    try {
        const buffer = await nikeAd(image, something, sacrifice);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        if (buffer === 406) return errorResponse(req, res, 'There\'s not enough width to make a Nike ad with this image.', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;