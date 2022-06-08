const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { PlanktonPlan } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
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
    
    const id = uuidv4();
    canvasData.push('canvasData', {
        id,
        step1,
        step2,
        step3,
    }, 'edit-meme.PlanktonPlan');
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/plankton-plan/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = canvasData.get('canvasData', 'edit-meme.PlanktonPlan');
    const data = arr.filter(x => x.id === req.params.uuid);
    try {
        const buffer = await PlanktonPlan(data[0].step1, data[0].step2, data[0].step3);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;