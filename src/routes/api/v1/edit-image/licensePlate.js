const router = require('express').Router();
const { licensePlate } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const text = req.query.text;

    if (!text) 
        return errorResponse(req, res, 'No text parameter provided', 406);
    if (text.length > 10) 
        return errorResponse(req, res, 'Text must be less than 10 characters', 406);
    
    try {
        const buffer = await licensePlate(text);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;