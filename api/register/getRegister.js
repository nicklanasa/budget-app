const Ledger = require('ledger-cli').Ledger;
const ledger = new Ledger({ file: 'transactions/2017.dat' })
const JSONStream = require('JSONStream');

module.exports = (req, res) => {
  ledger.register(req.query)
    .pipe(JSONStream.stringify())
    .pipe(res)
    .once('error', (error) => {
      res.status(500).send({error: error.message});
    });
}
