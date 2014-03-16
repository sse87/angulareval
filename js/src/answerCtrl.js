angular.module("EvalApp").controller("AnswerCtrl",
["$scope", "$location", "$routeParams" ,"StudentFactory" ,
function ($scope, $location, $routeParams, StudentFactory) {

	var evalID = $routeParams.evalID;
	console.log(evalID);

	StudentFactory.pullCurrentEval(evalID).then(function(data) {
		$scope.evaluation = data;
		// log to console for debugging 
		console.log($scope.evaluation);

	}, function(errorMessage) {
		console.log("Error fetching evaluation: " + errorMessage);
	});
	
}]);