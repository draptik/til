'use strict';

var _ = require('lodash');
var Tilitem = require('./tilitem.model');

// Get list of tilitems
exports.index = function(req, res) {
  var userId = req.user._id;
  Tilitem.loadRecent(userId, function (err, tilitems) {
    if(err) { return handleError(res, err); }
    return res.json(200, tilitems);
  });
};

// Get a single tilitem
exports.show = function(req, res) {
  Tilitem.findById(req.params.id, function (err, tilitem) {
    if(err) { return handleError(res, err); }
    if(!tilitem) { return res.send(404); }
    return res.json(tilitem);
  });
};

// Creates a new tilitem in the DB.
exports.create = function(req, res) {
  // ignore date
  delete req.body.date;

  var tilitem = new Tilitem(_.merge({ author: req.user._id}, req.body));
  tilitem.save(function (err, tilitem) {
    if(err) { return handleError(res, err); }
    return res.json(201, tilitem);
  });
};

// Updates an existing tilitem in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tilitem.findById(req.params.id, function (err, tilitem) {
    if (err) { return handleError(res, err); }
    if(!tilitem) { return res.send(404); }
    var updated = _.merge(tilitem, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tilitem);
    });
  });
};

// Deletes a tilitem from the DB.
exports.destroy = function(req, res) {
  Tilitem.findById(req.params.id, function (err, tilitem) {
    if(err) { return handleError(res, err); }
    if(!tilitem) { return res.send(404); }
    tilitem.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
