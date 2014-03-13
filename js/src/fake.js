angular.module("EvalApp").controller("FakeCtrl", ["$scope", function ($scope) {

	console.log("FakeCtrl running!\n");

	$scope.fakeVar = "Fake text hello";
}]);