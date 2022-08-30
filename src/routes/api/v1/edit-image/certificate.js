const router = require('express').Router();
const { certificate } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { reason, name } = req.query;

    var errors = [];
    if (!reason)
        errors.push({ status: 406, details: 'No reason parameter provided' });
    else if (reason.length > 30)
        errors.push({ status: 406, details: 'Provide reason between 1 and 180' });

    if (!name)
        errors.push({ status: 406, details: 'No name parameter provided' });
    else if (name.length > 30)
        errors.push({ status: 406, details: 'Name length should be between 1 and 180' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }

    try {
        const image = await certificate(reason, name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;