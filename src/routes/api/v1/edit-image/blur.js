const router = require('express').Router();
const { blur } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { radius, image } = req.query;

    var errors = [];
    if (!radius)
        errors.push({ status: 406, details: 'No radius parameter provided' });
    else if (radius < 1 || radius > 180)
        errors.push({ status: 406, details: 'Provide radius between 1 and 180' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const image = await blur(radius, image);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;