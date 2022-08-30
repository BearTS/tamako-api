const router = require('express').Router();
const { customtext } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { text, image } = req.query;

    var errors = [];
    if (!text)
        errors.push({ status: 406, details: 'No text parameter provided' });
    else if (text < 1 || text > 180)
        errors.push({ status: 406, details: 'Provide text between 1 and 180' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const image = await customtext(image, text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});
module.exports = router;