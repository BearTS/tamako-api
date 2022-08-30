const router = require('express').Router();
const { glassshatter } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const quote = req.query.quote;

    if (!quote) 
        return errorResponse(req, res, 'No quote parameter provided', 406);
    if (quote.length > 500) 
        return errorResponse(req, res, 'Quote must be less than 500 characters', 406);
    
   
    try {
        const buffer = await glassshatter(quote);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;