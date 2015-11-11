leftoversApp.controller('SearchController', ['$scope', '$rootScope', '$http', 'ingredientLists',
  function($scope, $rootScope, $http, ingredientLists) {

    $scope.ingredients = [];
    $scope.ingredientsFromSearchBox = [];
    $scope.posts = null;
    $scope.excludedIngredients = [];
    $scope.favCount = 0;

    var apiKey = '';
    var fbID = '';
    var ref = new Firebase('https://leftovers-app.firebaseio.com/users');
    var apiRef = new Firebase('https://leftovers-app.firebaseio.com/secrets');
    var favRef = new Firebase('https://leftovers-app.firebaseio.com/users/' + $rootScope.fbID + '/favorites');

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
      console.log(value);
      if (index >= 0 && !checked) {
        $scope.ingredients.splice(index, 1);
      }

      if (index < 0 && checked) {
        $scope.ingredients.push(value);
      }
    };

    $scope.addToIngredients = function(ingredient) {
      tmp = ingredient.split(' ');
      console.log(tmp);
      $scope.ingredientsFromSearchBox = tmp;

    };

    $scope.url = function() {
      var dietOpt = $scope.getDietID();
      var excludedOpt = '&exclude_ing=' + $scope.excludedIngredients.toString();
      var recipeOpt = '/recipes?any_kw=' + ($scope.ingredients).toString();
      var searchUrl = 'https://api.bigoven.com' + recipeOpt + dietOpt +
                      excludedOpt + '&api_key=' + apiKey + '&pg=1&rpp=15';
      return searchUrl;
    };

    $scope.addIngredient = function(excluded) {
      console.log($scope.ingredients);
      $scope.ingredients.push($scope.ingredientsFromSearchBox);
      $scope.excludedIngredients.push(excluded);

      var url = $scope.url();

      $http.get(url).
        success(function(data, status, headers, config) {
          $scope.posts = data.Results;
        }).
          error(function(data, status, headers, config) {
        });

      $scope.ing = '';
      $scope.ingredient = '';
      $scope.ingredients = [ ];
      $scope.excluded = '';
      $scope.excludedIngredients = [ ];
      $scope.ingredientsFromSearchBox = [ ];
      console.log(url);
    };

    $scope.getRecipe = function(recipeID) {
      console.log(recipeID);
      var recipeUrl = 'https://api.bigoven.com/recipe/' + recipeID + '?api_key=' +
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

    $scope.addFavorite = function(title, recipeID) {
      console.log(title);
      console.log(recipeID);
      favRef.child(recipeID).set({title});
      $scope.favCount++;
    };

    $scope.faves = [];

    favRef.on('value', function(snapshot) {
      console.log(snapshot.val());
      snapshot.forEach(function(childSnapshot) {
        $scope.faves.push(childSnapshot.val().title, childSnapshot.key());
        console.log($scope.faves);
      });
    });

    $scope.favesHash = function() {
      var obj = {};
      for (index in $scope.faves) {
        if (index % 2 == 0) {
          var key = $scope.faves[index];
          index++;
          var val = $scope.faves[index++];
          obj[key] = val;
        }
      }

      return $scope.obj = obj;
    };

    $scope.removeFavorite = function(recipeID, title) {
      rmRef = new Firebase('https://leftovers-app.firebaseio.com/users/' + $rootScope.fbID + '/favorites/' + recipeID);
      rmRef.remove();
      delete $scope.obj[title];
    };

}]);
