const router = require('express').Router();
const { cursedSponge } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const amount = req.query.amount;
    if (!amount) return errorResponse(req, res, 'No amount parameter provided', 406);
    if (amount > 100) return errorResponse(req, res, 'Amount too high', 406);
    if (amount < 1) return errorResponse(req, res, 'Amount too low', 406);
    
    try {
        const image = await cursedSponge(amount);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;