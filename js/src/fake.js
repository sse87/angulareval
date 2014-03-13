angular.module("EvalApp", ["ngMock"]).controller("FakeCtrl", ["$scope", function ($scope) {

	console.log("FakeCtrl running!\n");

	$scope.fakeVar = "Fake text hello";
}]);