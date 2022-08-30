const router = require('express').Router();
const { MarioBrosViews } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { thing, mario, luigi } = req.query;

    var errors = [];
    if (!thing)
        errors.push({ status: 406, details: 'No thing parameter provided' });
    else if (thing.length > 20)
        errors.push({ status: 406, details: 'Thing too long' });

    if (!mario)
        errors.push({ status: 406, details: 'No mario parameter provided' });
    else if (mario.length > 280)
        errors.push({ status: 406, details: 'Mario too long' });
    
    if (!luigi)
        errors.push({ status: 406, details: 'No luigi parameter provided' });
    else if (luigi.length > 280)
        errors.push({ status: 406, details: 'Luigi too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await MarioBrosViews(thing, mario, luigi);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;