leftoversApp.factory('ingredientLists', function($q, $timeout, $http) {
  var ingredientLists = {
    fetch: function(file) {
      return $timeout(function() {
        return $http.get(
          'components/search/' + file + '.json').then(function(response) {
            return response.data;
          });
      }, 30);
    }
  };

  return ingredientLists;
});
