const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { distort } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { level, image } = req.query;

    var errors = [];
    if (!level)
        errors.push({ status: 406, details: 'No level parameter provided' });
    else if (isNaN(level))
        errors.push({ status: 406, details: 'Invalid level, should be a number' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    canvasData.push('canvasData', {
        id,
        level,
        image,
    }, 'edit-image.distort');
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/distort/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = canvasData.get('canvasData', 'edit-image.distort');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await distort(data[0].level, data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;