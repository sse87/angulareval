angular.module("EvalApp").controller("StudentCtrl",
["$scope", "LoginFactory", "StudentFactory",
function ($scope, LoginFactory, StudentFactory) {

	// list all available evaluations templates
	// Access all available evaluations templates
	// Access evaluation creation tempates
	
	// Assign evaluation list
	$scope.evals = StudentFactory.getEvals();
	// Fetch evaluation list
	StudentFactory.pullEvals();

	console.log("Student data in ctrl: ");
	console.log(StudentFactory.getEvals());

	
	$scope.username = LoginFactory.getUsername();
	$scope.token = LoginFactory.getToken();
	$scope.email = LoginFactory.getEmail();
	$scope.fullName = LoginFactory.getFullName();
	$scope.imageUrl = LoginFactory.getImageUrl();
	$scope.role = LoginFactory.getRole();
	$scope.ssn = LoginFactory.getSSN();
	
}]);
