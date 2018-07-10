var Hotel = require('./models/hotel')

var repl = require('repl').start({
  useColors: true,
  terminal: true,
});
repl.context.Hotel = Hotel;
