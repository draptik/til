/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Tilitem = require('../api/tilitem/tilitem.model');
var User = require('../api/user/user.model');

// called from app.js
exports.seed = function() {

  Thing.find({}).remove(function() {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    });
  });

  // Adopted from http://www.frederiknakstad.com/2013/04/12/seeding-mongodb-through-your-mongoose-models/
  //
  // NOTE: Mongoose create() returns a promise which can be used be 'then'
  //
  // remove users...
  User.remove().exec()
    .then(function() {
      // ...and tilitems
      return Tilitem.remove().exec();
    })

  // create users
  .then(function() {
    return User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function() {
      console.log('finished populating users');
    });
  })

  // create tilitems
  .then(function() {
    return User.findOne({
      name: 'Admin'
    }, function(err, user) {
      Tilitem.create({
        content: 'learning javascript basics',
        author: user
      }, {
        content: 'learning mongoose',
        author: user
      }, function() {
        console.log('finished populating tilitems');
      });
    })
  });



  // Original implementation
  //
  /*User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});
*/

  // Nesting dependent model
  // Works, but not nice (too much nesting)
  //
  /*User.find({}).exec(function (err, collection) {
  if (collection.length === 0) {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function() {
      console.log('finished populating users');

      Tilitem.find({}).exec(function (err, coll) {
          if (coll.length === 0) {
            User.findOne({
              name: 'Admin'
            }, function(err, doc) {
              if (err) {
                return "ERROR";
              }
              Tilitem.create({
                content: 'learned javascript basics',
                author: doc
              }, {
                content: 'learning mongoose basics',
                author: doc
              }, function() {
                console.log('finished populating tilitems');
              });
            });
          });
      }
    });
  }
});*/

};
