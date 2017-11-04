const Ledger = require('ledger-cli').Ledger;
const ledger = new Ledger();
const JSONStream = require('JSONStream');
const fs = require('fs');

module.exports = (req, res) => {
  var data = '';
  const budget = fs.createReadStream('transactions/budget.dat', 'utf8');

  budget.on('data', (chunk) => {
    data += chunk;
  }).on('end', () => {
    let results = data.split('\n').slice(0, -2);
    results.splice(0, 1);

    let budget = [];
    let salary = 0;
    let budgeted = 0;
    results.map((item) => {
      let budgetData = item.split('  ');
      let description = budgetData[1].split(':')[1];

      if (description === 'Salary') {
        salary = parseFloat(budgetData[2].slice(1));
      } else {
        budget.push({description: description,
                     budget: budgetData[2],
                     spent: 0,
                     left: 0});
        budgeted += parseFloat(budgetData[2].slice(1));
      }
    });

    res.status(200).send({budget, salary, budgeted});
  });
}
