leftoversApp.controller('FacebookAuthController', function($scope) {
  var ref = new Firebase('https://leftovers-app.firebaseio.com/');
  $scope.login = function() {
    ref.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
      }
    });
  };

  ref.onAuth(function(authData) {
    var isLoggedIn = false;
    if (authData === null) {
      isLoggedIn = false;
      console.log('Not logged in yet', isLoggedIn);
    } else {
      isLoggedIn = true;
      console.log('Logged in as', authData.uid, isLoggedIn);

    };

    $scope.authData = authData;
    $scope.isLoggedIn = isLoggedIn;
  });

  $scope.logout = function() {
    ref.unauth();
  };

});
