leftoversApp.controller('SearchController', function($scope, $http) {

  $scope.ingredients = [];
  $scope.posts = null;

  var ref = new Firebase("https://leftovers-app.firebaseio.com/users");
  var recipeId = "";
  var apiKey = "9m9bjXUNhUIE78Lf26Yby9bV5UE4X7zi";
  var search_url = "";

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
