const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { triggered } = require('../../../../controllers/edit-avatar');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;

    if (!avatarURL)
        return res.status(406).send(JSON.stringify({ error: 'avatarURL not provided' }));

    const id = uuidv4();
    canvasData.push('canvasData', {
        id,
        avatarURL,
    }, 'edit-avatar.triggered');
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-avatar/triggered/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = canvasData.get('canvasData', 'edit-avatar.triggered');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await triggered(data[0].avatarURL);
        if (image === 0) return res.status(406).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'], 
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: 'Invalid image url'
        });
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).json({
        details: {
            'path': req.baseUrl + req.path,
            'content-type': req.headers['content-type'], 
            'user-agent': req.headers['user-agent']
        },
        error: true,
        message: err.message
    });
    }
});

module.exports = router;