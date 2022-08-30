const router = require('express').Router();
const { mirror } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { image } = req.query;
    let type = req.query.type;

    var errors = [];
    if (!type)
        errors.push({ status: 406, details: 'No type parameter provided' });
    else if (!(type.toLowerCase() === 'x' || type.toLowerCase() === 'y' || type.toLowerCase() == 'both'))
        errors.push({ status: 406, details: 'Type should be x or y or both' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }

    type = type.toLowerCase();
    try {
        const buffer = await mirror(type, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;