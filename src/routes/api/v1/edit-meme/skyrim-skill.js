const router = require('express').Router();
const { SkyrimSkill } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { skill, image } = req.query;

    var errors = [];
    if (!skill)
        errors.push({ status: 406, details: 'No skill parameter provided' });
    else if (skill.length > 20)
        errors.push({ status: 406, details: 'Skill parameter provided should be less than 20 characters' });
    
    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    try {
        const buffer = await SkyrimSkill(skill, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        if (buffer === 406) return errorResponse(req, res, 'There\'s not enough width to make a Nike ad with this image.', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;