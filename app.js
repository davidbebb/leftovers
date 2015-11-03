var LeftOvers = angular.module('leftOvers', []);

LeftOvers.controller('LeftOversCtrl', function($scope, $http) {

    $scope.test = "hello";


      var apiKey = "9m9bjXUNhUIE78Lf26Yby9bV5UE4X7zi";
      // var recipeId = 196149;
      var recipeId = "/recipes?title_kw=chicken&include_ing=onion,oil&exclude_ing=raisin&pg=1&rpp=20";
      // var url = "http://api.bigoven.com/recipe/" + recipeId + "?api_key=" + apiKey;
      var url = "http://api.bigoven.com" + recipeId + "&api_key=" + apiKey;


      $http.get(url).
        success(function(data, status, headers, config) {
          $scope.posts = data.Results;
        }).
          error(function(data, status, headers, config) {
            console.log("try again");
        });

})
