angular.module("EvalApp").controller("AnswerCtrl",
["$scope", "$location", "$routeParams" ,"StudentFactory" ,
function ($scope, $location, $routeParams, StudentFactory) {

	var evalID = $routeParams.evalID;
	console.log(evalID);

	var tmpData = {};

	StudentFactory.pullCurrentEval(evalID).then(function(data) {
		$scope.evaluation = data;
		tmpData = data;
		console.log("Answer ctrl");
		console.log($scope.evaluation);

	}, function(errorMessage) {
		console.log("Error fetching evaluation: " + errorMessage);
	});


	
}]);