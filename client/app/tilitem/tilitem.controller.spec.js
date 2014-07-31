'use strict';

describe('Controller: TilitemCtrl', function () {

  // load the controller's module
  beforeEach(module('tilApp'));

  var TilitemCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TilitemCtrl = $controller('TilitemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
