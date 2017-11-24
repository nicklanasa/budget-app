/**
 * @file this file defines functions to handle setting up bookshelf.
 * @author Nickolas Lanasa
 */

const db = require('./db');
module.exports = require('bookshelf')(db);
