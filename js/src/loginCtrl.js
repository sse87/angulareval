angular.module("EvalApp").controller("LoginCtrl",
["$scope", "$location", "LoginFactory",
function ($scope, $location, LoginFactory) {
	
	$scope.login = function (username, password) {
		if (!LoginFactory.login(username, password)) {
			console.log("Login in false!");
		}
	};
	
	// Check Saved Password
	$scope.csp = function () {
		if ($scope.username === "admin") { $scope.password = "123456"; }
		else if ($scope.username === "bjarni12") { $scope.password = "123456"; }
		else if ($scope.username === "sigurdurse09") { $scope.password = "123456"; }
		else if ($scope.username === "sveinnt12") { $scope.password = "123456"; }
		else { $scope.password = ""; }
	};
	
	// Quick admin login
	$scope.iddqd = function () {
		if (!LoginFactory.login("admin","123456")) {
			console.log("iddqd did not work... maybe this is not Doom.");
		}
	};
	
}]);
