angular.module("EvalApp").controller("TemplateCtrl",
["$scope", "$location", "AdminFactory",
function ($scope, $location, AdminFactory) {

	$scope.addTemplate = function () {
		AdminFactory.pushTemplates($scope.template).then(function (data) {
			$location.path("/admin");
		});
	};

	$scope.template = {
		titleIs: "",
		titleEn: "",
		introTextIs: "",
		introTextEn: "",
		courseQuestions: [],
		teacherQuestions: []
	};

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
