/**
 * Simple app to generate log messages.
 */
const express = require('express');
const morgan = require('morgan'); // https://github.com/expressjs/morgan
const app = express();
const port = process.env.PORT ?? 3001;

const logFormatter = (level, message, meta) => {
  return (
    `${level}: "${message?.trim().replaceAll('\n', '\\n')}"` +
    (meta && Object.keys(meta).length ? ` [${JSON.stringify(meta)}]` : '')
  );
};

const { log, debug, info, warn, error } = console;
console.http = (...args) =>
  Reflect.apply(log, console, [logFormatter('http', args.shift(), args)]);
console.log = (...args) =>
  Reflect.apply(log, console, [logFormatter('info', args.shift(), args)]);
console.debug = (...args) =>
  Reflect.apply(debug, console, [logFormatter('debug', args.shift(), args)]);
console.info = (...args) =>
  Reflect.apply(info, console, [logFormatter('info', args.shift(), args)]);
console.warn = (...args) =>
  Reflect.apply(warn, console, [logFormatter('warn', args.shift(), args)]);
console.error = (...args) =>
  Reflect.apply(error, console, [logFormatter('error', args.shift(), args)]);

app.use(morgan(
  'combined', // https://github.com/expressjs/morgan#combined
  { stream: { write: message => { console.http(message); } } }
));
app.listen(port, () => console.info(`App listening on port ${port}!`));

app.get('/', function (req, res, next) {
  res.send('Hello.');
});

app.get('/e', function (req, res, next) {
  throw new Error();
});
