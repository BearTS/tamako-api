const router = require('express').Router();
const { authorizeAdmin } = require('../../middleware/authorize');

router.use(authorizeAdmin);
router.use('/view', require('./view'));
router.use('/createkey', require('./createkey'));
router.use('/delete', require('./delete'));
router.use('/unlimited', require('./unlimited'));

module.exports = router;