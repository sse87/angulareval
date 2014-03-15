angular.module("EvalApp").controller("HomeCtrl",
["$scope", "LoginFactory", "AdminFactory",
function ($scope, LoginFactory, AdminFactory) {

	if (LoginFactory.getRole() === "admin"){
		// list all available evaluations templates
		// Access all available evaluations templates
		// Access evaluation creation tempates
		
		// Assign evaluation list
		$scope.evals = AdminFactory.getEvals();
		// Fetch evaluation list
		AdminFactory.pullEvals();
	}
	else if (LoginFactory.getRole() === "student") {
		// list all available evaluations
		// Access all available evaluations

	}
	else {

	}
	
	$scope.username = LoginFactory.getUsername();
	$scope.token = LoginFactory.getToken();
	$scope.email = LoginFactory.getEmail();
	$scope.fullName = LoginFactory.getFullName();
	$scope.imageUrl = LoginFactory.getImageUrl();
	$scope.role = LoginFactory.getRole();
	$scope.ssn = LoginFactory.getSSN();
	
}]);

