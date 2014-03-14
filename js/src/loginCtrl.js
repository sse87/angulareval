angular.module("EvalApp").controller("LoginCtrl",
["$scope", "$location", "LoginFactory",
function ($scope, $location, LoginFactory) {
	
	$scope.login = function (username, password) {
		if (LoginFactory.login(username, password)) {
			// Have to do some delay so the user will not be redirected back to login
			setTimeout(function() {
				$location.path("/index");
				$scope.$apply();
			}, 500);
		}
		else {
			// TODO: Birta vinarleg error message fyrir notanda.
			console.log("Login in false!");
		}
	};
	
}]);
