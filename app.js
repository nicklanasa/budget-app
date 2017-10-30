const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const fetch = require('node-fetch');
const moment = require('moment');

const port = 3000;

const app = express();
app.use(require('./routes/'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const Ledger = require('ledger-cli').Ledger;
const ledger = new Ledger ({ file: 'transactions/2017.dat' })
const JSONStream = require('JSONStream');

function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
 })
}

app.get('/', function(req, res) {
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

    res.render('index', {results, moment, startDate, endDate, req, outgoing, incoming, starting, ending});
  }).catch(err => res.send(err.message));
});

app.get('/budget', function(req, res) {
  res.render('budget');
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const httpServer = http.createServer(app);

httpServer.listen(port, '0.0.0.0');
