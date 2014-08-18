'use strict';

angular.module('tilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('progress', {
        url: '/progress',
        templateUrl: 'app/progress/progress.html',
        controller: 'ProgressCtrl'
      });
  });