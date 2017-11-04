const get = require('../../utils/get');
const port = 3000;

module.exports = (req, res) => {
  Promise.all([
    get(`http://localhost:${port}/v1/budget`)
  ]).then((results) => {
    results = results.pop();
    console.log(results);
    res.render('budget', {results});
  });
};
