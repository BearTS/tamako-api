const router = require('express').Router();
const { rotate } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { degrees, image } = req.query;

    var errors = [];
    if (!degrees)
        errors.push({ status: 406, details: 'No degrees parameter provided' });
    else if (isNaN(degrees))
        errors.push({ status: 406, details: 'Invalid degrees, should be a number' });
    else if (degrees < -360 || degrees > 360)
        errors.push({ status: 406, details: 'Degrees should be between -360 and 360' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await rotate(degrees, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;