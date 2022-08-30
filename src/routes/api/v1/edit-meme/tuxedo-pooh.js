const router = require('express').Router();
const { TuxedoPooh } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { normal, tuxedo } = req.query;

    var errors = [];
    if (!normal)
        errors.push({ status: 406, details: 'No normal parameter provided' });
    else if (normal.length > 150)
        errors.push({ status: 406, details: 'Normal should be less than 150 characters' });

    if (!tuxedo)
        errors.push({ status: 406, details: 'No tuxedo parameter provided' });
    else if (tuxedo.length > 150)
        errors.push({ status: 406, details: 'Tuxedo should be less than 15 characters' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    try {
        const buffer = await TuxedoPooh(normal, tuxedo);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;