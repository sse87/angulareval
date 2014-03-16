angular.module("EvalApp").controller("AdminCtrl",
["$scope", "LoginFactory", "AdminFactory",
function ($scope, LoginFactory, AdminFactory) {

	// list all available evaluations templates
	// Access all available evaluations templates
	// Access evaluation creation tempates
	
	// Get evaluations from the API
	AdminFactory.pullEvals().then(function (data) {
		$scope.evals = data;
		// log to console for debugging 
		console.log("Admin evals");
		console.log($scope.evals);

	}, function (errorMessage) {
		console.log("Error fetching evaluation: " + errorMessage);
	});

	// Get templates from the API
	AdminFactory.pullTemplates().then(function (data) {
		$scope.templates = data;
		// log to console for debugging 
		console.log("Admin templates");
		console.log($scope.templates);

	}, function (errorMessage) {
		console.log("Error fetching templates: " + errorMessage);
	});

	
	$scope.username = LoginFactory.getUsername();
	$scope.token = LoginFactory.getToken();
	$scope.email = LoginFactory.getEmail();
	$scope.fullName = LoginFactory.getFullName();
	$scope.imageUrl = LoginFactory.getImageUrl();
	$scope.role = LoginFactory.getRole();
	$scope.ssn = LoginFactory.getSSN();
	
}]);

