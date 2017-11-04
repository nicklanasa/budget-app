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
    results.map((item) => {
      let budgetData = item.split('  ');
      budget.push({description: budgetData[0],
                     budget: budgetData[1]});
    });

    res.status(200).send({budget});
  });
}
