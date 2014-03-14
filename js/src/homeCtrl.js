angular.module("EvalApp").controller("HomeCtrl",
["$scope", "LoginFactory",
function ($scope, LoginFactory) {
	
	$scope.username = LoginFactory.getUsername();
	$scope.token = LoginFactory.getToken();
	$scope.email = LoginFactory.getEmail();
	$scope.fullName = LoginFactory.getFullName();
	$scope.imageUrl = LoginFactory.getImageUrl();
	$scope.role = LoginFactory.getRole();
	$scope.ssn = LoginFactory.getSSN();
	
}]);
