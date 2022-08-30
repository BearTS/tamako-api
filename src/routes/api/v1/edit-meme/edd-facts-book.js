const router = require('express').Router();
const { EddFactBook } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const fact = req.query.fact;

    if (!fact) return errorResponse(req, res, 'No fact parameter provided', 406);
    if (fact.length > 280) return errorResponse(req, res, 'Fact too long', 406);
    

    try {
        const image = await EddFactBook(fact);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;