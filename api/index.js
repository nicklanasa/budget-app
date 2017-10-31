const express = require('express');
const router = express.Router();

router.use('/v1/', require('./register/index'));

router.use('/v1/', require('./balance/index'));

module.exports = router;
