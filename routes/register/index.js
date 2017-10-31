const Ledger = require('ledger-cli').Ledger;
const ledger = new Ledger ({ file: '../transactions/2017.dat' });
const JSONStream = require('JSONStream');
const moment = require('moment');
const get = require('../../utils/get');
const port = 3000;

module.exports = (req, res) => {
  Promise.all([
    get(`http://localhost:${port}/v1/register`)
  ]).then((results) => {
    let currentDate = req.query.currentDate ? moment(req.query.currentDate) : moment();

    let startDate = undefined;
    let endDate = undefined;

    if (req.query.dateFilter === 'Month') { // Month
      if (req.query.next) {
        currentDate = currentDate.add(1, 'M');
      } else if (req.query.previous) {
        currentDate = currentDate.add(-1, 'M');
      }
      startDate = currentDate.startOf('month').toDate();
      endDate = currentDate.endOf('month').toDate();
    } else if (req.query.dateFilter === 'Year') { // Year
      if (req.query.next) {
        currentDate = currentDate.add(1, 'y');
      } else if (req.query.previous) {
        currentDate = currentDate.add(-1, 'y');
      }
      startDate = currentDate.startOf('year').toDate();
      endDate = currentDate.endOf('year').toDate();
    } else {
      if (req.query.next) {
        currentDate = currentDate.add(1, 'w');
      } else if (req.query.previous) {
        currentDate = currentDate.add(-1, 'w');
      }
      startDate = currentDate.startOf('week').toDate();
      endDate = currentDate.endOf('week').toDate();
      req.query.dateFilter = 'Week';
    }

    req.query.currentDate = currentDate;

    results = results[0].filter((row) => {
      return moment(row.date) >= startDate && moment(row.date) <= endDate;
    });

    let outgoing = 0.0;
    let incoming = 0.0;
    results.map((row) =>{
      outgoing += row.postings[0].account.split(':')[0] === 'Expenses' || row.postings[0].account.split(':')[0] === 'Liabilities' ? row.postings[0].commodity.amount : 0.0 ;
      incoming += row.postings[0].account.split(':')[0] === 'Assets' || row.postings[0].account.split(':')[0] === 'Income' ? row.postings[0].commodity.amount : 0.0;
    })

    let starting = results.length > 0 ? parseFloat(results[0].payee.split(';')[1]) : 0.0;
    let ending = (starting + (-1 * outgoing) + incoming).toFixed(2);

    outgoing = outgoing.toFixed(2);
    incoming = incoming.toFixed(2);

    results.map((row) => {
      row.payee = row.payee.split(';')[0];
      row.postings[0].account = row.postings[0].account.split(':')[1];
    })

    res.render('index', {results, moment, startDate, endDate, req, outgoing, incoming, starting, ending});
  }).catch(err => res.send(err.message));
}
