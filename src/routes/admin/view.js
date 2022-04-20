const router = require('express').Router();
const { validate } = require('uuid');
const { userTable } = require('../../database/main');

router.get('/:key_token?', (req, res) => {
    try {
        if (req.params.key_token) {
            if (!validate(req.params.key_token))
                return res.status(400).json({
                    details: {
                        'path': req.baseUrl + req.path,
                        'content-type': req.headers['content-type'],
                        'user-agent': req.headers['user-agent']
                    },
                    error: true,
                    message: 'Thats an invalid token' // TODO: Add a better response than this.
                });
            const indexes = userTable.indexes;
            const array = [];
            indexes.forEach(val => {
                array.push(userTable.get(val));
            });
            res.status(200).json(array.filter(val => val.token === req.params.key_token));
        } else {
            const indexes = userTable.indexes;
            const array = [];
            indexes.forEach(val => {
                array.push(userTable.get(val));
            });
            res.status(200).json(array);
        }
    } catch (err) {
        console.error(err.stack);
    }
});

module.exports = router;