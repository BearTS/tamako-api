const router = require('express').Router();
const { hat } = require('../../../../controllers/edit-avatar');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const type = req.query.type;
    const addX = req.query.addX || 0;
    const addY = req.query.addY || 0;
    const scale = req.query.scale || 0;
    const hats = new Set(['anon','ash','becel','birthday','christmas','devil','disguise','dunce','leprechaun','mask','megumin','pilgrim','pirate','soviet','tophat','witch']);
    
    if (!addX || !addY || !scale || !type || scale > 1000 || scale < 0) 
        return errorResponse(req, res, 'Invalid parameters', 406);
    if (!hats.has(type)) 
        return errorResponse(req, res, 'Invalid hat type', 406);

    
    try {
        const image = await hat(avatarURL, type, addX, addY, scale);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;