const express = require('express');
const router = express.Router();

router.use('/', require('./register/index'));

module.exports = router;
