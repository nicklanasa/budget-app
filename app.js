const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const fetch = require('node-fetch');

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
    res.render('index', {results});
  }).catch(err => res.send(err.message));
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
