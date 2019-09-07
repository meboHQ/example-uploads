const Mebo = require('mebo');

// this example uses es6/es7 spec to make things easier to play with.
// In a production environment please consider transpiling beforehand
require('babel-register');

// registering actions
require('./Actions');

/// Command-line support:
// node . --help
const cli = Mebo.Handler.get('cli');
if (cli.isSupported()){
  cli.init();
}

// Web support:
// node .
else {
  // loading server
  require('./server');
}
