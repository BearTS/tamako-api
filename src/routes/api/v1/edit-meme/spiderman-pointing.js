const router = require('express').Router();
const { SpidermanPointing } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { first, second } = req.query;

    var errors = [];
    if (!first)
        errors.push({ status: 406, details: 'No first parameter provided' });
    else if (first.length > 150)
        errors.push({ status: 406, details: 'First too long' });

    if (!second)
        errors.push({ status: 406, details: 'No second parameter provided' });
    else if (second.length > 150)
        errors.push({ status: 406, details: 'Second too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    try {
        const buffer = await SpidermanPointing(first, second);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;