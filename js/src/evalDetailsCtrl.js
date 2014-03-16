angular.module("EvalApp").controller("EvalDetailsCtrl", 
["$scope", "$routeParams",
function ($scope, $routeParams) {

	$scope.evalID = $routeParams.evalID;
	
}]);
