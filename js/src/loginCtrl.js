angular.module("EvalApp").controller("LoginCtrl",
["$scope", "LoginFactory",
function ($scope, LoginFactory) {
	
	$scope.signIn = function (username, password) {
		LoginFactory.login(username, password);
	};
	
}]);
