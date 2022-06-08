const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { newspaper } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { headline, body } = req.query;

    var errors = [];
    if (!headline)
        errors.push({ status: 406, details: 'No headline parameter provided' });
    else if (headline.length > 20)
        errors.push({ status: 406, details: 'Headline should be less than 20' });

    if (!body)
        errors.push({ status: 406, details: 'No body parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    canvasData.push('canvasData', {
        id,
        headline,
        body,
    }, 'edit-image.newspaper');
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/newspaper/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = canvasData.get('canvasData', 'edit-image.newspaper');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await newspaper(data[0].headline, data[0].body);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/gif' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;