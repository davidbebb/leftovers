leftoversApp.controller('SearchController', ['$scope', '$rootScope', '$http', 'ingredientLists',
  function($scope, $rootScope, $http, ingredientLists) {

    $scope.ingredients = [];
    $scope.posts = null;
    $scope.excludedIngredients = [];

    var apiKey = '';
    var fbID = '';
    var ref = new Firebase('https://leftovers-app.firebaseio.com/users');
    var apiRef = new Firebase('https://leftovers-app.firebaseio.com/secrets');

    apiRef.once('value', function(data) {
      return apiKey = data.val();
    });

    $scope.diet = {
      option: '',
    };

    $scope.clearDiet = function() {
      $scope.diet.option = '';
    };

    $scope.getDietID = function() {
      var dietUrl = '&cuisine=' + $scope.diet.option;
      return dietUrl;
    };

    ingredientLists.fetch('meat').then(function(data) {
      $scope.meat = data;
    });

    ingredientLists.fetch('veg').then(function(data) {
      $scope.veg = data;
    });

    ingredientLists.fetch('fruits').then(function(data) {
      $scope.fruits = data;
    });

    ingredientLists.fetch('seafood').then(function(data) {
      $scope.seafood = data;
    });

    ingredientLists.fetch('dairy').then(function(data) {
      $scope.dairy = data;
    });

    ingredientLists.fetch('baking_grain').then(function(data) {
      $scope.grains = data;
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
      var dietOpt = $scope.getDietID();
      var excludedOpt = '&exclude_ing=' + $scope.excludedIngredients.toString();
      var recipeOpt = '/recipes?any_kw=' + ($scope.ingredients).toString();
      var searchUrl = 'http://api.bigoven.com' + recipeOpt + dietOpt +
                      excludedOpt + '&api_key=' + apiKey + '&pg=1&rpp=15';
      return searchUrl;
    };

    $scope.addIngredient = function(ingredient, excluded) {
      $scope.ingredients.push(ingredient);
      $scope.excludedIngredients.push(excluded);
      var url = $scope.url();

      $http.get(url).
        success(function(data, status, headers, config) {
          $scope.posts = data.Results;
        }).
          error(function(data, status, headers, config) {
        });

      $scope.ingredient = '';
      $scope.ingredients = [];
      $scope.excluded = '';
      $scope.excludedIngredients = [];
      console.log(url);
    };

    $scope.getRecipe = function(recipeID) {
      console.log(recipeID);
      var recipeUrl = 'http://api.bigoven.com/recipe/' + recipeID + '?api_key=' +
                      apiKey;

      $http.get(recipeUrl).
        success(function(data, status, headers, config) {
          $scope.recipe = data;
          $scope.recipeIngredients = data.Ingredients;
          console.log($scope.recipe);
        }).
          error(function(data, status, headers, config) {
        });

      console.log(recipeUrl);
    };

    $scope.$on('$viewContentLoaded', function() {
      alert('Stuff has loaded');
    });

    // $scope.addFavorite = function(title, ingredients, instructions) {
    //   console.log(title);
    //   userRef.set({
    //     title: title,
    //     //here need to get all the data of the selected recipe
    //     // ingredients: ingredients,
    //     // instructions: instructions
    //   });
    // };
}]);
