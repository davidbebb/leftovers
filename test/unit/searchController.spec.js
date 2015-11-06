describe('SearchController', function() {
  beforeEach(module('LeftoversApp'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.ingredients', function() {
    var $scope;
    var controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('SearchController', { $scope: $scope });
    });

    it('initializes with an empty ingredient list', function() {
      expect($scope.ingredients.length).toEqual(0);
    });

  });

});
