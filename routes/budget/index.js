const get = require('../../utils/get');
const port = 3000;

module.exports = (req, res) => {
  Promise.all([
    get(`http://localhost:${port}/v1/budget`)
  ]).then((results) => {
    res.render('budget', results);
  });
};
