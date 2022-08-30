const router = require('express').Router();
const { gruPlan } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { step1, step2, step3 } = req.query;

    var errors = [];
    if (!step1)
        errors.push({ status: 406, details: 'No step1 parameter provided' });
    else if (step1.length > 150)
        errors.push({ status: 406, details: 'Step1 too long' });

    if (!step2)
        errors.push({ status: 406, details: 'No step2 parameter provided' });
    else if (step2.length > 150)
        errors.push({ status: 406, details: 'Step2 too long' });
    
    if (!step3)
        errors.push({ status: 406, details: 'No step3 parameter provided' });
    else if (step3.length > 150)
        errors.push({ status: 406, details: 'Step3 too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    try {
        const buffer = await gruPlan(step1, step2, step3);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;