const router = require('express').Router();
const { axiscult } = require('../../../../controllers/edit-image');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    let { username, gender, age, profession } = req.query;

    var errors = [];
    if (!username)
        errors.push({ status: 406, details: 'No username parameter provided' });
    if (!gender) {
        errors.push({ status: 406, details: 'No gender parameter provided' });
    } else if (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female') {
        errors.push({ status: 406, details: 'Gender should only be male or female' });
    }

    if (!age) {
        errors.push({ status: 406, details: 'No age parameter provided' });
    } else if (isNaN(age)) {
        errors.push({ status: 406, details: 'Age should be a valid number' });
    } else if (!isNaN(age) && age < 1 || age > 1000) {
        errors.push({ status: 406, details: 'Age should be between 1 and 1000' });
    }

    if (!profession) {
        errors.push({ status: 406, details: 'No profession parameter provided' });
    } else if (profession.length > 15) {
        errors.push({ status: 406, details: 'Enter a profession less than 15 characters' });
    }

    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }

    gender = gender.toLowerCase();

    try {
        const buffer = await axiscult(username, gender, age, profession);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;