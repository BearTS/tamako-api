const router = require('express').Router();
const { rip } = require('../../../../controllers/edit-avatar');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const username = req.query.username;
    const cause = req.query.cause;

    if (!username) 
        return errorResponse(req, res, 'Username not provided', 406);
    if (!cause) 
        return errorResponse(req, res, 'Cause not provided', 406);
    if (!avatarURL)
        return errorResponse(req, res, 'avatarURL not provided', 406);

    try {
        const image = await rip(avatarURL, username, cause);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;