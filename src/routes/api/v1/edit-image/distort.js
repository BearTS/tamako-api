const router = require('express').Router();
const { distort } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { level, image } = req.query;

    var errors = [];
    if (!level)
        errors.push({ status: 406, details: 'No level parameter provided' });
    else if (isNaN(level))
        errors.push({ status: 406, details: 'Invalid level, should be a number' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    
    try {
        const buffer = await distort(level, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});
module.exports = router;