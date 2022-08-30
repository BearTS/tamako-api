const router = require('express').Router();
const { boardroomMeeting } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { question, suggestion1, suggestion2, final} = req.query;

    var errors = [];
    if (!question)
        errors.push({ status: 406, details: 'No question parameter provided' });
    else if (question.length > 100)
        errors.push({ status: 406, details: 'Question too long' });
    if (!suggestion1)
        errors.push({ status: 406, details: 'No suggestion1 parameter provided' });
    else if (suggestion1.length > 50)
        errors.push({ status: 406, details: 'Suggestion1 too long' });

    if (!suggestion2)
        errors.push({ status: 406, details: 'No suggestion2 parameter provided' });
    else if (suggestion2.length > 50)
        errors.push({ status: 406, details: 'Suggestion2 too long' });
        
    if (!final)
        errors.push({ status: 406, details: 'No final parameter provided' });
    else if (final.length > 50)
        errors.push({ status: 406, details: 'Final too long' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const image = await boardroomMeeting(question, suggestion1, suggestion2, final);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;