const router = require('express').Router();
const { demotivational } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { title, image, text } = req.query;

    var errors = [];
    if (!title)
        errors.push({ status: 406, details: 'No title parameter provided' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
    
    if (!text)
        errors.push({ status: 406, details: 'No text parameter provided' });
    else if (text.length > 100 || title.length > 50)
        errors.push({ status: 406, details: 'Text too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await demotivational(title, text, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;