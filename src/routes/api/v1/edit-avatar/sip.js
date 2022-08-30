const router = require('express').Router();
const { sip } = require('../../../../controllers/edit-avatar');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const direction = req.query.direction;

    if (direction !== 'left' && direction !== 'right')
        return errorResponse(req, res, 'Invalid direction', 406);
    
    try {
        const image = await sip(avatarURL, direction);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;