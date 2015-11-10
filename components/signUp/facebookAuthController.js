leftoversApp.controller('FacebookAuthController', ['$scope', '$rootScope',
  function($scope, $rootScope) {

    var ref = new Firebase('https://leftovers-app.firebaseio.com/users');

    $scope.login = function() {
      ref.authWithOAuthPopup('facebook', function(error, authData) {
        if (error) {
          console.log('Login Failed!', error);
        } else {
          console.log('Authenticated successfully with payload');
        }

        location.reload();
      });
    };

    ref.onAuth(function(authData) {
      var isLoggedIn = false;
      if (authData === null) {
        isLoggedIn = false;
        console.log('Not logged in yet', isLoggedIn);
      } else {
        isLoggedIn = true;
        console.log('Logged in as', authData.facebook.displayName, isLoggedIn);

        ref.once('value', function(snapshot) {
          console.log(snapshot.val());
          key = authData.facebook.id;
          if (snapshot.child(key).exists()) {
            console.log('it is a match!');
          } else {
            console.log('should add this');
            ref.child(key).set({authData});
          }
        });

        $scope.authData = authData;
        $scope.isLoggedIn = isLoggedIn;
        $rootScope.fbID = authData.facebook.id;
      }

    });

    $scope.logout = function() {
      ref.unauth();
      location.reload();
    };
}]);
