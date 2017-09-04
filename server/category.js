
var mongoose = require('mongoose');

var categorySchema = {
  // The underscore ID field will double as the category name for example Games or Electronics.
  _id: { type: String },
  //The parent field, which references the parent category.
  parent: {
    type: String,
    ref: 'Category'
  },
// A list of the ancestor categories.
// With multikey indexes, you now have an efficient way
// to answer questions like, what are all the subcategories
  ancestors: [{
    type: String,
    ref: 'Category'
  }]
};

module.exports = new mongoose.Schema(categorySchema);
module.exports.categorySchema = categorySchema;
