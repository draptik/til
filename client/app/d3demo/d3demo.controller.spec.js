'use strict';

describe('Controller: D3demoCtrl', function () {

  // load the controller's module
  beforeEach(module('tilApp'));

  var D3demoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    D3demoCtrl = $controller('D3demoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
