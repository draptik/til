'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TilitemSchema = new Schema({
  content: String,
  date: {type: Date, default: Date.now},
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

TilitemSchema.statics = {
  loadRecent: function (cb) {
    this.find({})
    .populate({path: 'author categories', select: 'name'})
    .sort('-date')
    .limit(20)
    .exec(cb);
  }
};

module.exports = mongoose.model('Tilitem', TilitemSchema);
