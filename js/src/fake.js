angular.module("EvalApp").controller("FakeCtrl", ["$scope", function ($scope) {

	console.log("FakeCtrl running!\n");

	$scope.fakeVar = "Fake text hello";
	$scope.fakeVar2 = "Fake text hello2";
	$scope.fakeVar3 = "fake text hello";
	$scope.fakeVar4 = "Fake text hello";
	$scope.fakeVar5 = 5;

}]);