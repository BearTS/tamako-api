const router = require('express').Router();
const { alert } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const message = req.query.message;

    if (!message) return errorResponse(req, res, 'No message parameter provided', 406);
    if (message.length > 280) return errorResponse(req, res, 'Message too long', 406);
    
    try {
        const image = await alert(message);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;