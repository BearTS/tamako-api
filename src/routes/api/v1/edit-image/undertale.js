const router = require('express').Router();
const { undertale } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');
const { join } = require('path');

router.get('/', authorizeUser, async (req, res) => {
    const characters = require(join(__dirname, '..', '..', '..', '..', 'resources', 'assets', 'json', 'undertale.json'));
    var { character, quote } = req.query;

    var errors = [];
    if (!quote)
        errors.push({ status: 406, details: 'No quote parameter provided' });
    else if (quote.length > 250)
        errors.push({ status: 406, details: 'Quote should be less than 250 characters' });

    if (!character)
        errors.push({ status: 406, details: ['No character parameter provided', { 'Available Characters': characters }] });
    else if (!characters.includes(character))
        errors.push({ status: 406, details: ['Invalid character', { 'Available Characters': characters }] });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await undertale(character, quote);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;