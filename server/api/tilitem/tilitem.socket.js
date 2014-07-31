/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Tilitem = require('./tilitem.model');

exports.register = function(socket) {
  Tilitem.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Tilitem.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  Tilitem.populate(doc, {path: 'author', select:'name'}, function (err, tilitem) {
    socket.emit('tilitem:save', tilitem);
  });
}

function onRemove(socket, doc, cb) {
  socket.emit('tilitem:remove', doc);
}
