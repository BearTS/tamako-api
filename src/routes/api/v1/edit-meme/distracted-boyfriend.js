const router = require('express').Router();
const { distractedBF } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL } = req.query;

    var errors = [];
    if (!otherGirlAvatarURL)
        errors.push({ status: 406, details: 'No otherGirlAvatarURL parameter provided' });

    if (!boyfriendAvatarURL)
        errors.push({ status: 406, details: 'No boyfriendAvatarURL parameter provided' });
    
    if (!girlfriendAvatarURL)
        errors.push({ status: 406, details: 'No girlfriendAvatarURL parameter provided' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await distractedBF(otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;