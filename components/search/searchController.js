leftoversApp.controller('SearchController', function($scope, $http) {

  $scope.ingredients = [];
  $scope.posts = null;
  $scope.excluded = [];

  var ref = new Firebase('https://leftovers-app.firebaseio.com/users');
  var recipeId = '';
  var apiKey = '9m9bjXUNhUIE78Lf26Yby9bV5UE4X7zi';
  var searchUrl = '';

  $scope.diet = {
    option: '',
  };

  $scope.getDietID = function() {
    var dietUrl = '&cuisine=' + $scope.diet.option;
    return dietUrl;
  };

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
  };

  $scope.url = function() {
    var dietId = $scope.getDietID();
    var excludedId = '&exclude_ing=' + $scope.excluded.toString();
    var recipeId = '/recipes?any_kw=' + ($scope.ingredients).toString();
    var searchUrl = 'http://api.bigoven.com' + recipeId + dietId + excludedId +
    '&api_key=' + apiKey + '&pg=1&rpp=15';
    return searchUrl;
  };

  $scope.addIngredient = function(ingredient, exclusion) {
    $scope.ingredients.push(ingredient);
    $scope.excluded.push(exclusion);
    var url = $scope.url();

    $http.get(url).
      success(function(data, status, headers, config) {
        $scope.posts = data.Results;
      }).
        error(function(data, status, headers, config) {
      });

    $scope.ingredient = '';
    $scope.ingredients = [];
    console.log(url);
  };

});
