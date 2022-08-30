const router = require('express').Router();
const { beLikeBill } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const name = req.query.name || 'Bill';

    if (!name) return errorResponse(req, res, 'No name parameter provided', 406);
    if (name.length > 280) return errorResponse(req, res, 'Name is too long', 406);
  
    try {
        const image = await beLikeBill(name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;