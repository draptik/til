'use strict';

angular.module('tilApp')
  .controller('TilitemCtrl', function ($scope, $http, socket) {
    $scope.newTilitem = '';

    // Grab the initial set of available Tilitems
    $http.get('api/tilitems').success(function (tilitems) {
      $scope.tilitems = tilitems;

      // Update array with any new or deleted items pushed from the socket
      socket.syncUpdates('tilitem', $scope.tilitems, function (event, tilitem, tilitems) {
        // This callback is fired after the tilitems array is updated by the socket listeners

        // sort the array every time its modified
        tilitems.sort(function (a, b) {
          a = new Date(a.Date);
          b = new Date(b.Date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    });

    // Clean up listeners when the controller is destroyed
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('tilitem');
    });

    // Use our rest api to post a new tilitem
    $scope.addTilitem = function () {
      $http.post('api/tilitems', { content: $scope.newTilitem });
      $scope.newTilitem = '';
    };
  });
