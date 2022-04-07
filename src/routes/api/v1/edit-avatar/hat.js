const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { hat } = require('../../../../controllers/edit-avatar');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const type = req.query.type;
    const addX = req.query.addX || 0;
    const addY = req.query.addY || 0;
    const scale = req.query.scale || 0;
    const hats = new Set(['anon','ash','becel','birthday','christmas','devil','disguise','dunce','leprechaun','mask','megumin','pilgrim','pirate','soviet','tophat','witch']);
    
    if (!addX || !addY || !scale || !type || scale > 1000 || scale < 0) 
        return res.status(406).send(JSON.stringify({ error: 'Invalid parameters' }));
    if (!hats.has(type)) 
        return res.status(406).send(JSON.stringify({ error: 'Invalid hat type' }));

    const id = uuidv4();
    canvasData.push('canvasData', {
        id,
        avatarURL,
    }, 'edit-avatar.hat');

    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-avatar/hat/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = canvasData.get('canvasData', 'edit-avatar.hat');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await hat(data[0].avatarURL, data[0].type, data[0].addX, data[0].addY, data[0].scale);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

module.exports = router;