const express = require('express');
const router = express.Router();

router.get(`/budget/`, require('./getBudget'));

module.exports = router;
