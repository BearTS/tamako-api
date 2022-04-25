const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { avatarFusion } = require('../../../../controllers/edit-avatar');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');
const { authRateLimiter } = require('../../../../middleware/rateLimiter');

// Ratelimiter
router.use(authRateLimiter);

router.get('/', authorizeUser, async (req, res) => {
    const base = req.query.base;
    const overlay = req.query.overlay;
    
    const id = uuidv4();
    canvasData.push('canvasData', {
        id,
        base,
        overlay
    }, 'edit-avatar.avatarFusion');
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-avatar/avatarFusion/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = canvasData.get('canvasData', 'edit-avatar.avatarFusion');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await avatarFusion(data[0].base, data[0].overlay);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;