leftoversApp.controller('SearchController', function($scope, $http) {

  $scope.ingredients = [];
  $scope.posts = null;
  $scope.meat = ['chicken', 'beef', 'pork', 'turkey'];


  var ref = new Firebase("https://leftovers-app.firebaseio.com/users");
  var recipeId = "";
  var apiKey = "9m9bjXUNhUIE78Lf26Yby9bV5UE4X7zi";
  var search_url = "";

<<<<<<< HEAD
  $scope.getIngredients = function() {
    return $scope.ingredients;
    console.log($scope.ingredients);
  }

  $scope.check = function(value, checked) {
    var index = $scope.ingredients.indexOf(value);
    if(index >= 0 && !checked) {
      $scope.ingredients.slice(index, 1);
    }
    if (index < 0 && checked) {
      $scope.ingredients.push(value);
    }
    console.log($scope.ingredients);
  }

  $scope.addIngredient = function(ingredient){
    $scope.ingredients.push(ingredient);
    console.log($scope.ingredients);
    var recipeId = "/recipes?any_kw=" + ($scope.ingredients).toString();
    var search_url = "http://api.bigoven.com" + recipeId + "&api_key=" + apiKey + "&pg=1&rpp=15";
    console.log(recipeId);
    console.log(search_url);
    // ref.push({
    //   search_ingredients: $scope.ingredients
    // });


    $http.get(search_url).
      success(function(data, status, headers, config) {
        $scope.posts = data.Results;
        console.log($scope.posts);
      }).
        error(function(data, status, headers, config) {
          console.log("try again");
      });
    $scope.ingredients = [];
};


});
