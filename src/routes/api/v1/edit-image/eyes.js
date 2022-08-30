const router = require('express').Router();
const { eyes } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const image = req.query.image;

    if (!image) return errorResponse(req, res, 'No image parameter provided', 406);
    try {
        const buffer = await eyes(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL', 406);
        if (buffer === 400) return errorResponse(req, res, 'No faces in this image', 406);
        if (buffer === 2) return errorResponse(req, res, 'Image too large', 406);
        if (buffer === 403) return errorResponse(req, res, 'The route is overloaded! Try again soon', 406);
        if (buffer === 500) return errorResponse(req, res, 'Internal server error', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;