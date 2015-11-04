var LeftOvers = angular.module('leftOvers', []);

LeftOvers.controller('LeftOversCtrl', function($scope, $http) {

  var self = this;
  var apiKey = "9m9bjXUNhUIE78Lf26Yby9bV5UE4X7zi";
  var recipeId = "/recipes?any_kw=potato,onion&pg=1&rpp=5";
  var url = "http://api.bigoven.com" + recipeId + "&api_key=" + apiKey;
  var recipe_url = 'http://api.bigoven.com/recipe/63033' + "?api_key=" + apiKey

  var veg_id = "/recipes?cuisine=vegetarian&pg=1&rpp=5"
  var veg_url = "http://api.bigoven.com" + veg_id + "&api_key=" + apiKey;
  var gluten_id = "/recipes?cuisine=gluten-free&pg=1&rpp=5"
  var gluten_url = "http://api.bigoven.com" + gluten_id + "&api_key=" + apiKey;
  var dairy_id = "/recipes?title_kw=dairy-free&pg=1&rpp=5"
  var dairy_url = "http://api.bigoven.com" + dairy_id + "&api_key=" + apiKey;

  $scope.gluten_recipes = "hello";


  $http.get(url).
    success(function(data, status, headers, config) {
      $scope.posts = data.Results;
      // console.log($scope.posts);
    }).
      error(function(data, status, headers, config) {
        console.log("try again");
    });

  $http.get(recipe_url).
    success(function(data, status, headers, config) {
      $scope.chicken_satay = data;
      $scope.chicken_satay_i = data.Ingredients;
    }).
      error(function(data, status, headers, config) {
        console.log("try again");
    });

  $http.get(veg_url).
    success(function(data) {
      console.log(data);
      $http.get(gluten_url).
        success(function(data) {
          $scope.gluten_recipes = data.Results;
          console.log(data);
          console.log($scope.gluten_recipes);
        }).
        error(function(data) {
          console.log("nested error");
        });
      error(function(data) {
        console.log("outer error");
      });
    });



  //vegetarian
  //gluten-free
  //dairy-free



  // $scope.star_rating = function("#rating") {
  //   console.log("#rating")
  //   Math.round("#rating")
      //  remainder = (5 - )
  //
  // }

        // def star_rating(rating)
        //   return rating unless rating.respond_to?(:round)
        //   remainder = (5 - rating)
        //   '★' * rating.round + '☆' * remainder
        // end

})
