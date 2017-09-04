var mongoose = require('mongoose');
// schema defines the user's cart
// as an array that contains object 
// IDs corresponding to products.

module.exports = new mongoose.Schema({
  profile: {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    picture: {
      type: String,
      required: true,
      match: /^http:\/\//i
    }
  },
  // this portion of the scheme hides or encrypts the users password data 
  data: {
    oauth: {
      type: String,
      required: true
    },
    cart: [{
      product: {
        type: mongoose.Schema.Types.ObjectId
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }]
  }
});

module.exports.set('toObject', {
  virtuals: true
});
module.exports.set('toJSON', {
  virtuals: true
});