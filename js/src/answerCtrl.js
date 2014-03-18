angular.module("EvalApp").controller("AnswerCtrl",
["$scope", "$location", "$routeParams" ,"StudentFactory" ,
function ($scope, $location, $routeParams, StudentFactory) {

	var ID = $routeParams.evalID;
	var semester = $routeParams.courseID;
	var course = $routeParams.semesterID;

	StudentFactory.pullCurrentCourseEval(course, semester, ID).then(function(data) {
		$scope.evaluation = data;
		// log to console for debugging 
		console.log($scope.evaluation);

	}, function(errorMessage) {
		console.log("Error fetching evaluation: " + errorMessage);
	});

	var evalData = "Eval data needs to go in here";

	$scope.submitEval = function () {
		StudentFactory.pushval(course, semester, ID, evalData).then(function (data) {
			$location.path("/student");
		});
	};

}]);