const router = require('express').Router();
const { squish } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    var { axis, image } = req.query;

    var errors = [];
    if (!axis)
        errors.push({ status: 406, details: ['No axis parameter provided', { 'Axis': 'x or y' }] });
    else if (!(axis.toLowerCase() === 'x' || axis.toLowerCase() === 'y')) {
        errors.push({ status: 406, details: ['Invalid axis parameter provided', { 'Axis': 'x or y' }] });
    }

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }

    axis = axis.toLowerCase();
    
    try {
        const buffer = await squish(axis, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;