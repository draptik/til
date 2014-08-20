'use strict';

angular.module('tilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('d3demo', {
        url: '/d3demo',
        templateUrl: 'app/d3demo/d3demo.html',
        controller: 'D3demoCtrl'
      });
  });