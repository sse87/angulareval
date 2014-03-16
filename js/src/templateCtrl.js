angular.module("EvalApp").controller("TemplateCtrl",
["$scope", "$location", "AdminFactory",
function ($scope, $location, AdminFactory) {

	$scope.template = {};
	$scope.template.titleIs = "";
	$scope.template.titleEn = "";
	$scope.template.introTextIs = "";
	$scope.template.introTextEn = "";
	$scope.template.courseQuestions = [];
	$scope.template.teacherQuestions = [];

	$scope.addAnswer = function(question) {
		question.answers.push({
			id: question.answers.length,
			textIs: "",
			textEn: "",
			imageUrl: "",
			weight: 0
		});
	};

	$scope.addCourseQuestion = function() {
		$scope.template.courseQuestions.push({
			id: $scope.template.courseQuestions.length,
			textIs: "",
			textEn: "",
			imageUrl: "",
			type: "single",
			answers: []
		});
	};
	
	$scope.addTeacherQuestion = function() {
		$scope.template.teacherQuestions.push({
			id: $scope.template.teacherQuestions.length,
			textIs: "",
			textEn: "",
			imageUrl: "",
			type: "single",
			answers: []
		});
	};

}]);
