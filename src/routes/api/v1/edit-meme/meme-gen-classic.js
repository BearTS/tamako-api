const router = require('express').Router();
const { memeGenClassic } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { top, bottom, image } = req.query;

    var errors = [];
    if (!top)
        errors.push({ status: 406, details: 'No top parameter provided' });
    else if (top.length > 50)
        errors.push({ status: 406, details: 'Top too long' });

    if (!bottom)
        errors.push({ status: 406, details: 'No bottom parameter provided' });
    else if (bottom.length > 50)
        errors.push({ status: 406, details: 'Bottom too long' });
    
    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await memeGenClassic(top, bottom, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;