const router = require('express').Router();
const { pogchamp } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const amount = req.query.amount;

    if (!amount) return errorResponse(req, res, 'No amount parameter provided', 406);
    if (isNaN(amount)) return errorResponse(req, res, 'Amount value should be a valid number', 406);
    if (amount.length > 280) return errorResponse(req, res, 'Amount too long', 406);
    
    try {
        const image = await pogchamp(amount);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;