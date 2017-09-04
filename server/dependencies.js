// This file will be responsible for setting up Stripe.
var fs = require('fs');
var fx = require('./fx');
var Stripe = require('stripe');

// It is cleaner to initialize Stripe once and pass the reference
// as a parameter between functions, which
// is what Wagner does for you.
module.exports = function(wagner) {
  wagner.factory('Stripe', function(Config) {
    return Stripe(Config.stripeKey);
  });

  wagner.factory('fx', fx);

  wagner.factory('Config', function() {
    return JSON.parse(fs.readFileSync('./config.json').toString());
  });
};
