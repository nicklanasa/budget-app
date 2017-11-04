const express = require('express');
const router = express.Router();

// Register
router.use('/v1/', require('./register/index'));

// Balance
router.use('/v1/', require('./balance/index'));

// Learn
router.use('/v1/', require('./learn/index'));

// Budget
router.use('/v1/', require('./budget/index'));

module.exports = router;
