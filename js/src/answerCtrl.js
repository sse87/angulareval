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

	$scope.submitEval = function () {
		
		var i, k;
		var evalAnswers = [];	
		var evaluation = $scope.evaluation;
		
		console.log("evaluation: ");
		console.log(evaluation);
		
		for (i = 0; i < evaluation.CourseQuestions.length; i++) {
			
			if (evaluation.CourseQuestions[i].givenAnswer !== undefined) {
				
				console.log("C1 Spurning: " + evaluation.CourseQuestions[i].ID + ":" + evaluation.CourseQuestions[i].givenAnswer);
				evalAnswers.push({
					QuestionID: evaluation.CourseQuestions[i].ID,
					Value: evaluation.CourseQuestions[i].givenAnswer
				});
			}
			else
			{
				for (k = 0; k < evaluation.CourseQuestions[i].Answers.length; k++) {
					
					if (evaluation.CourseQuestions[i].Answers[k].givenAnswer !== undefined) {
						
						console.log("C2 Spurning: " + evaluation.CourseQuestions[i].ID + ":" + evaluation.CourseQuestions[i].givenAnswer);
						evalAnswers.push({
							QuestionID: evaluation.CourseQuestions[i].ID,
							Value: evaluation.CourseQuestions[i].Answers[k].givenAnswer
						});
					}
					
				}
			}
			
		}
		
		for (i = 0; i < evaluation.TeacherQuestions.length; i++) {
			
			if (evaluation.TeacherQuestions[i].givenAnswer !== undefined) {
				
				console.log("T1 Spurning: " + evaluation.TeacherQuestions[i].ID + ":" + evaluation.TeacherQuestions[i].givenAnswer);
				evalAnswers.push({
					QuestionID: evaluation.TeacherQuestions[i].ID,
					Value: evaluation.TeacherQuestions[i].givenAnswer
				});
			}
			else
			{
				for (k = 0; k < evaluation.TeacherQuestions[i].Answers.length; k++) {
					
					if (evaluation.TeacherQuestions[i].Answers[k].givenAnswer !== undefined) {
						
						console.log("T2 Spurning: " + evaluation.TeacherQuestions[i].ID + ":" + evaluation.TeacherQuestions[i].givenAnswer);
						evalAnswers.push({
							QuestionID: evaluation.TeacherQuestions[i].ID,
							Value: evaluation.TeacherQuestions[i].Answers[k].givenAnswer
						});
					}
					
				}
			}
			
		}
		
		/*StudentFactory.pushval(course, semester, ID, evalData).then(function (data) {
			$location.path("/student");
		});*/
	};

}]);