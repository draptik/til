/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Tilitem = require('../api/tilitem/tilitem.model');
var User = require('../api/user/user.model');
var Category = require('../api/category/category.model');

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
  // NOTE: Mongoose create()          returns a promise which can be used be 'then'
  // NOTE: Mongoose findOne().exec()  returns a promise which can be used be 'then'
  //
  // remove users...
  User.remove().exec()
    .then(function() {
      // ...and tilitems
      return Tilitem.remove().exec();
    })
    .then(function() {
      return Category.remove().exec();
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

  // create categories for Admin user
  .then(function() {
    return User.findOne({
      name: 'Admin'
    }, function(err, user) {
      // console.log('CA: user ' + user);
      return Category.create({
        name: 'tag1admin',
        author: user
      }, {
        name: 'tag2admin',
        author: user
      }, function() {
        console.log('finished populating categories for Admin user');
      });
    }).exec(); /* <-- !! findOne().exec() returns promise !! */
  })

  // create categories for Test User
  .then(function() {
    return User.findOne({
      name: 'Test User'
    }, function(err, user) {
      // console.log('CA: user ' + user);
      return Category.create({
        name: 'tag1test',
        author: user
      }, {
        name: 'tag2test',
        author: user
      }, function() {
        console.log('finished populating categories for test user');
      });
    }).exec(); /* <-- !! findOne().exec() returns promise !! */
  })

  // create tilitems for Admin user
  .then(function() {
    return Category.findOne({
      name: 'tag1admin'
    }, function(err, category) {
      // console.log('TI: category ' + category);
      return Tilitem.create({
        content: 'learning javascript basics',
        categories: [category],
        author: category.author
      }, {
        content: 'learning mongoose',
        categories: [category],
        author: category.author
      }, function() {
        console.log('finished populating tilitems for Admin user');
      });
    }).exec();
  })

  // create tilitems for Test user
  .then(function() {
    return Category.findOne({
      name: 'tag1test'
    }, function(err, category) {
      // console.log('TI: category ' + category);
      return Tilitem.create({
        content: 'learning javascript basics',
        categories: [category],
        author: category.author
      }, {
        content: 'learning mongoose',
        categories: [category],
        author: category.author
      }, function() {
        console.log('finished populating tilitems for Test user');
      });
    }).exec();
  })

};
