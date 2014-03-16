angular.module("EvalApp").controller("StudentCtrl",
["$scope", "LoginFactory", "StudentFactory",
function ($scope, LoginFactory, StudentFactory) {

	// list all available evaluations templates
	// Access all available evaluations templates
	// Access evaluation creation tempates

	StudentFactory.pullEvals().then(function (data) {
		$scope.evals = data;
		// log to console for debugging 
		console.log($scope.evals);

	}, function (errorMessage) {
		console.log("Error fetching evaluation: " + errorMessage);
	});


	
	$scope.username = LoginFactory.getUsername();
	$scope.token = LoginFactory.getToken();
	$scope.email = LoginFactory.getEmail();
	$scope.fullName = LoginFactory.getFullName();
	$scope.imageUrl = LoginFactory.getImageUrl();
	$scope.role = LoginFactory.getRole();
	$scope.ssn = LoginFactory.getSSN();
	
}]);
