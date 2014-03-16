angular.module("EvalApp").controller("LoginCtrl",
["$scope", "$location", "LoginFactory",
function ($scope, $location, LoginFactory) {
	
	$scope.login = function (username, password) {
		if (!LoginFactory.login(username, password)) {
			console.log("Login in false!");
		}
	};
	
}]);
