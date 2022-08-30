const router = require('express').Router();
const { PhoebeTeachingJoey } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { correct, incorrect } = req.query;

    var errors = [];
    if (!correct)
        errors.push({ status: 406, details: 'No correct parameter provided' });
    else if (correct.length > 150)
        errors.push({ status: 406, details: 'Correct too long' });

    if (!incorrect)
        errors.push({ status: 406, details: 'No incorrect parameter provided' });
    else if (incorrect.length > 150)
        errors.push({ status: 406, details: 'Incorrect too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await PhoebeTeachingJoey(correct, incorrect);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;