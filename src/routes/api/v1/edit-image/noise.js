const router = require('express').Router();
const { noise } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    var { type, image } = req.query;

    var errors = [];
    const types = ['uniform', 'gaussian', 'multiplicative', 'impulse', 'laplacian', 'poisson'];

    if (!type)
        errors.push({ status: 406, details: 'No type parameter provided' });
    else if (!types.includes(type.toLowerCase()))
        errors.push({ status: 406, details: ['Invalid type', { 'Available Types': types }]});

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }

    type = type.toLowerCase();
    
    try {
        const buffer = await noise(type, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpeg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;