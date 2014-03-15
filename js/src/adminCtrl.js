angular.module("EvalApp").controller("AdminCtrl",
["$scope", "LoginFactory", "AdminFactory",
function ($scope, LoginFactory, AdminFactory) {

	// list all available evaluations templates
	// Access all available evaluations templates
	// Access evaluation creation tempates
	
	// Assign evaluation list
	$scope.evals = AdminFactory.getEvals();
	// Fetch evaluation list
	AdminFactory.pullEvals();

	
	$scope.username = LoginFactory.getUsername();
	$scope.token = LoginFactory.getToken();
	$scope.email = LoginFactory.getEmail();
	$scope.fullName = LoginFactory.getFullName();
	$scope.imageUrl = LoginFactory.getImageUrl();
	$scope.role = LoginFactory.getRole();
	$scope.ssn = LoginFactory.getSSN();
	
}]);

