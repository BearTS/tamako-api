const router = require('express').Router();
const { steamNowPlayingClassic } = require('../../../../controllers/edit-avatar');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const username = req.query.username;
    const game = req.query.game;
    
    if (!username) 
        return errorResponse(req, res, 'Username not provided', 406);
    if (!game) 
        return errorResponse(req, res, 'Game not provided', 406);
    if (!avatarURL)
        return errorResponse(req, res, 'avatarURL not provided', 406);

    try {
        const image = await steamNowPlayingClassic(avatarURL, username, game);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;