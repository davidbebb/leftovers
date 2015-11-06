describe('SearchController', function() {
  beforeEach(module('LeftoversApp'));

  var ctrl;
  var $scope;

  beforeEach(inject(function($controller) {
    $scope = {};
    ctrl = $controller('SearchController', {$scope: $scope});
  }));

  it('initializes with an empty ingredient list', function() {
    expect($scope.ingredients.length).toEqual(0);
  });

});
