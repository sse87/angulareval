angular.module("EvalApp").controller("LoginCtrl",
["$scope", "$location", "LoginFactory",
function ($scope, $location, LoginFactory) {
	
	$scope.login = function (username, password) {
		if (LoginFactory.login(username, password)) {
			$location.path("/index");
		}
		else {
			// TODO: Birta vinarleg error message fyrir notanda.
			console.log("Login in false!");
		}
	};
	
}]);
