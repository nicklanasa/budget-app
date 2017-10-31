const express = require('express');
const router = express.Router();

router.get(`/balance/`, require('./getBalance'));

module.exports = router;
