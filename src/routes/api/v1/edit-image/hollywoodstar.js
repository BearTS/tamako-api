const router = require('express').Router();
const { hollywoodstar } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const name = req.query.name;

    if (!name) 
        return errorResponse(req, res, 'No name parameter provided', 406);
    if (name.length > 30) 
        return errorResponse(req, res, 'Name must be less than 30 characters', 406);
    try {
        const buffer = await hollywoodstar(name);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;