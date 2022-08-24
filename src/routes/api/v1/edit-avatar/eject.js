const router = require('express').Router();
const { eject } = require('../../../../controllers/edit-avatar');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const imposter = req.query.imposter || '';
    const username = req.query.username;
    const userID = req.query.userID;

    if (!username || isNaN(userID))
        return errorResponse(req, res, 'Username not provided or userID', 406);
    try{
        const image = await eject(avatarURL, imposter, username, userID);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;