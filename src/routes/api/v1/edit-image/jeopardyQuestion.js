const router = require('express').Router();
const { jeopardyQuestion } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const text = req.query.text;

    if (!text) 
        return errorResponse(req, res, 'No text parameter provided', 406);
    if (text.length > 500) 
        return errorResponse(req, res, 'Text must be less than 500 characters', 406);
    
    try {
        const buffer = await jeopardyQuestion(text);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;