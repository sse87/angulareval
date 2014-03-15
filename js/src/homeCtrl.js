angular.module("EvalApp").controller("HomeCtrl",
["$scope", "LoginFactory", "EvaluationFactory",
function ($scope, LoginFactory, EvaluationFactory) {

	if (LoginFactory.getRole() === "admin"){
		// list all available evaluations templates
		// Access all available evaluations templates
		// Access evaluation creation tempates

		$scope.evals = EvaluationFactory.evals(LoginFactory.getToken());
		console.log("Eval obj: ");
		console.log(EvaluationFactory.evals(LoginFactory.getToken()));
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

