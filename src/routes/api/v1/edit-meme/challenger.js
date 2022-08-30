const router = require('express').Router();
const { challenger } = require('../../../../controllers/edit-meme');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { image, silhouetted } = req.query;

    var errors = [];
    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });

    if (!silhouetted)
        errors.push({ status: 406, details: 'No silhouetted parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    try {
        const image = await challenger(image, silhouetted);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});


module.exports = router;