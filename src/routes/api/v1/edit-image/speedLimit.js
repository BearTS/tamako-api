const router = require('express').Router();
const { speedLimit } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const limit = req.query.limit;
    
    if (!limit) 
        return errorResponse(req, res, 'No limit parameter provided', 406);
    if (isNaN(limit))
        return errorResponse(req, res, 'Limit must be a valid number', 406);
    else if (limit.length > 5) 
        return errorResponse(req, res, 'Limit must be less than 5 characters', 406);
    
    try {
        const buffer = await speedLimit(limit);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});



module.exports = router;