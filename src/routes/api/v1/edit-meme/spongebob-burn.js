const router = require('express').Router();
const { SpongebobBurn } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { burn, person } = req.query;

    var errors = [];
    if (!burn)
        errors.push({ status: 406, details: 'No burn parameter provided' });
    else if (burn.length > 150)
        errors.push({ status: 406, details: 'Burn should be less than 150 characters' });

    if (!person)
        errors.push({ status: 406, details: 'No person parameter provided' });
    else if (person.length > 15)
        errors.push({ status: 406, details: 'Person should be less than 15 characters' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await SpongebobBurn(burn, person);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;