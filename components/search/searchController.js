leftoversApp.controller('SearchController', function($scope) {
  var ref = new Firebase("https://leftovers-app.firebaseio.com/users");

  $scope.ingredients = ['test_ingredient'];

  $scope.addIngredient = function(ingredient){
    // for (var i = 0; i < $scope.ingredients.length; i++) {
    //    if ($scope.ingredients[i] !== ingredient) {

        $scope.ingredients.push(ingredient);
        console.log($scope.ingredients);
        // $scope.ingredient.push()
      // };

    // };


  };
});
