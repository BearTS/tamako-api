const router = require('express').Router();
const { userTable } = require('../../database/main');

router.delete('/:key_token?', (req, res) => {
    // Get all the user from the db
    const indexes = userTable.indexes;
    const array = [];
    indexes.forEach(val => {
        array.push(userTable.get(val));
    });

    // Check if theres a key_token parameter
    if (!req.params.key_token)
        return res.status(400).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: 'token parameter is required' // TODO: Add a better response than this.
        });

    // Check if key is in the db -> return 400 if no
    if (array.filter(x => x.token === req.params.key_token).length === 0)
        return res.status(400).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: 'This token is not in the db' // TODO: Add a better response than this.
        });
    
    try {
        const filteredUser =  array.filter(x => x.token === req.params.key_token)[0];
        userTable.delete(filteredUser.ownerId); // Delete the user from the database
        res.status(200).json({
            details: {
                'path': req.baseUrl + req.path, 
                'content-type': req.headers['content-type'], 
                'user-agent': req.headers['user-agent'] 
            },
            error: false,
            data: 'Successfully delete user: ' + filteredUser.ownerId
        });
    } catch (err) {
        return res.status(400).json({
            details: {
                'path': req.baseUrl + req.path, 
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: err.message
        });
    }
});


module.exports = router;