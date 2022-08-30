const router = require('express').Router();
const { newspaper } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { headline, body } = req.query;

    var errors = [];
    if (!headline)
        errors.push({ status: 406, details: 'No headline parameter provided' });
    else if (headline.length > 20)
        errors.push({ status: 406, details: 'Headline should be less than 20' });

    if (!body)
        errors.push({ status: 406, details: 'No body parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
   
    try {
        const buffer = await newspaper(headline, body);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/gif' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;