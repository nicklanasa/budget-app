const moment = require('moment');
const get = require('../../utils/get');
const port = 3000;

module.exports = (req, res) => {
  Promise.all([
    get(`http://localhost:${port}/v1/budget`),
    get(`http://localhost:${port}/v1/register`)
  ]).then((results) => {
    const currentDate = moment();
    const startDate = currentDate.startOf('month').toDate();
    const endDate = currentDate.endOf('month').toDate();

    // Filter transaction by month
    const transactions = results[1].filter((row) => {
      return moment(row.date) >= startDate && moment(row.date) <= endDate;
    });

    const budget = results[0];

    transactions.map((transaction) => {
      const account = transaction.postings[0].account.split(':')[1];
      const amount = transaction.postings[0].commodity.amount;

      for (var i=0; i < budget.length; i++) {
        if (budget[i].description === account) {
          budget[i].spent = (parseFloat(budget[i].spent) + parseFloat(amount)).toFixed(2);
        }

        budget[i].left = (parseFloat(budget[i].budget.slice(1)) - parseFloat(budget[i].spent)).toFixed(2);

        if (parseFloat(budget[i].left) < 0) {
          budget[i].color = 'red';
        } else {
          budget[i].color = 'green';
        }
      }
    });

    res.render('budget', {budget});
  });
};
