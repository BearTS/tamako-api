const router = require('express').Router();
const { PanikKalmPanik } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { panik, kalm, panik2 } = req.query;

    var errors = [];
    if (!panik)
        errors.push({ status: 406, details: 'No panik parameter provided' });
    else if (panik.length > 150)
        errors.push({ status: 406, details: 'Panik too long' });

    if (!kalm)
        errors.push({ status: 406, details: 'No kalm parameter provided' });
    else if (kalm.length > 150)
        errors.push({ status: 406, details: 'Kalm too long' });
    
    if (!panik2)
        errors.push({ status: 406, details: 'No panik2 parameter provided' });
    else if (panik2.length > 150)
        errors.push({ status: 406, details: 'Panik2 too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const buffer = await PanikKalmPanik(panik, kalm, panik2);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;