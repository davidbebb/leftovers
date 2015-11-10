leftoversApp.controller('SearchController', function($scope, $uibModal, $log,
                                                     $http, ingredientLists) {

  $scope.ingredients = [];
  $scope.posts = null;
  $scope.excludedIngredients = [];

  var ref = new Firebase('https://leftovers-app.firebaseio.com/users');

  $scope.diet = {
    option: '',
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

  $scope.addFavorite = function(title, ingredients, instructions) {
    console.log(title);
    ref.push({
      title: title,
      ingredients: ingredients,
      instructions: instructions,
    });
  };

  //MODAL START
  $scope.veggies = [];
  $scope.animationsEnabled = true;

  $scope.open = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'veg.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        veggies: function() {
          return $scope.veggies;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
  //MODAL END

});

//MODAL CONTROLLER
leftoversApp.controller('ModalInstanceCtrl', function($scope, $controller,
                                                       $uibModalInstance,
                                                       veggies) {
  $controller('SearchController', {$scope: $scope}); //This works

  $scope.veggies = veggies;
  $scope.selected = {

  };

  $scope.ok = function() {
    $uibModalInstance.close($scope.selected.veg);
    console.log($scope.ingredients);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

});
