const router = require('express').Router();
const { newPassword } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { weak, strong } = req.query;

    var errors = [];
    if (!weak)
        errors.push({ status: 406, details: 'No weak parameter provided' });
    else if (weak.length > 50)
        errors.push({ status: 406, details: 'Weak too long' });

    if (!strong)
        errors.push({ status: 406, details: 'No strong parameter provided' });
    else if (strong.length > 50)
        errors.push({ status: 406, details: 'Strong too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await newPassword(weak, strong);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;