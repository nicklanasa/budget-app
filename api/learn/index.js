const express = require('express');
const router = express.Router();

router.post(`/learn/`, require('./csvLearn'));

module.exports = router;
