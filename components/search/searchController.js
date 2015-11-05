leftoversApp.controller('SearchController', function($scope, $http) {

  $scope.ingredients = [];
  $scope.posts = null;

  var ref = new Firebase('https://leftovers-app.firebaseio.com/users');
  var recipeId = '';
  var apiKey = '9m9bjXUNhUIE78Lf26Yby9bV5UE4X7zi';
  var searchUrl = '';
  var dietId = '';

  $http.get('components/search/meat.json').then(function(data) {
     $scope.meat = data.data;
   });

  $http.get('components/search/veg.json').then(function(data) {
    $scope.veg = data.data;
  });

  $http.get('components/search/fruits.json').then(function(data) {
    $scope.fruits = data.data;
  });

  $http.get('components/search/seafood.json').then(function(data) {
    $scope.seafood = data.data;
  });

  $http.get('components/search/dairy.json').then(function(data) {
    $scope.dairy = data.data;
  });

  $http.get('components/search/baking_grain.json').then(function(data) {
    $scope.grains = data.data;
  });

  $scope.getIngredients = function() {
    return $scope.ingredients;
  };

  $scope.check = function(value, checked) {
    var index = $scope.ingredients.indexOf(value);
    if (index >= 0 && !checked) {
      $scope.ingredients.splice(index, 1);
    }

    if (index < 0 && checked) {
      $scope.ingredients.push(value);
    }

    console.log($scope.ingredients);
  };

  $scope.addIngredient = function(ingredient) {
    $scope.ingredients.push(ingredient);
    console.log($scope.ingredients);
    var recipeId = '/recipes?any_kw=' + ($scope.ingredients).toString();
    var searchUrl = 'http://api.bigoven.com' + recipeId + '&api_key=' +
    apiKey + '&pg=1&rpp=15';

    $http.get(searchUrl).
      success(function(data, status, headers, config) {
        $scope.posts = data.Results;
      }).
        error(function(data, status, headers, config) {
      });

    $scope.ingredients = [];
  };

});
