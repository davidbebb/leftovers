leftoversApp.controller('FacebookAuthController', function($scope) {
  var ref = new Firebase("https://leftovers-app.firebaseio.com/");
  $scope.login= function(){
    ref.authWithOAuthPopup("facebook", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
  };
});
