const express = require('express');
const router = express.Router();

router.get(`/register/`, require('./getRegister'));

module.exports = router;
