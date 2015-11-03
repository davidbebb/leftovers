var LeftOvers = angular.module('leftOvers', []);

LeftOvers.controller('LeftOversCtrl', function($scope, $http) {

  var self = this;
  var apiKey = "9m9bjXUNhUIE78Lf26Yby9bV5UE4X7";
  var recipeId = "/recipes?title_kw=chicken&include_ing=onion,oil&exclude_ing=raisin&pg=1&rpp=5";
  var url = "http://api.bigoven.com" + recipeId + "&api_key=" + apiKey;
  var recipe_url = 'http://api.bigoven.com/recipe/63033' + "?api_key=" + apiKey


  $http.get(url).
    success(function(data, status, headers, config) {
      $scope.posts = data.Results;
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
