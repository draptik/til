'use strict';

angular.module('tilApp')
  .controller('TilitemCtrl', function($scope, $http, socket, $q) {
    $scope.newTilitem = '';
    $scope.selectedCategories = undefined;

    $scope.loadCategories = function(query) {
      var deferred = $q.defer();
      var data = $http.get('api/categories/' + query).success(function(categories) {
        return categories;
      });
      deferred.resolve(data);
      return deferred.promise;
    };

    // Get all categories for user
    $http.get('api/categories').success(function(categories) {
      $scope.categories = categories;
    });

    // Grab the initial set of available Tilitems
    $http.get('api/tilitems').success(function(tilitems) {
      $scope.tilitems = tilitems;

      // Update array with any new or deleted items pushed from the socket
      socket.syncUpdates('tilitem', $scope.tilitems, function(event, tilitem, tilitems) {
        // This callback is fired after the tilitems array is updated by the socket listeners

        // sort the array every time its modified
        tilitems.sort(function(a, b) {
          a = new Date(a.Date);
          b = new Date(b.Date);
          return a > b ? -1 : a < b ? 1 : 0;
        });
      });
    });

    // Clean up listeners when the controller is destroyed
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('tilitem');
    });

    // Use our rest api to post a new tilitem
    $scope.addTilitem = function() {
      // $http.post('api/tilitems', {
      //   content: $scope.newTilitem
      // });
      // TODO Fix backend api to accept categories (user specific)
      $http.post('api/tilitems', {
        content: $scope.newTilitem,
        categories: [$scope.selectedCategories]
      });
      $scope.newTilitem = '';
      $scope.selectedCategories = undefined;
    };
  });
