'use strict';

angular.module('tilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tilitem', {
        url: '/tilitem',
        templateUrl: 'app/tilitem/tilitem.html',
        controller: 'TilitemCtrl'
      });
  });