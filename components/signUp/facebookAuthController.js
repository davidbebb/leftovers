leftoversApp.controller('FacebookAuthController', function($scope) {
  var ref = new Firebase("https://leftovers-app.firebaseio.com/");
  $scope.login = function(){
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  };

  ref.onAuth(function(authData){
    if (authData === null) {
      console.log('Not logged in yet');
    } else {
      console.log('Logged in as', authData.uid);
    }
    $scope.authData = authData;
  });

  $scope.logout = function(){
    ref.unauth();
  };
});
