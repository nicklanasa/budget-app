/**
 * @file this file defines functions to handle db logic.
 * @author Nickolas Lanasa
 */

const config = require('./knexfile.js');

const db = require('knex')(config);

module.exports = db;
