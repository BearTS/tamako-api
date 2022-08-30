const router = require('express').Router();
const { drakePosting } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { yeah, nah } = req.query;

    var errors = [];
    if (!yeah)
        errors.push({ status: 406, details: 'No yeah parameter provided' });

    if (!nah)
        errors.push({ status: 406, details: 'No nah parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await drakePosting(nah, yeah);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;