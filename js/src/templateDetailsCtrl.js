angular.module("EvalApp").controller("TemplateDetailsCtrl", 
["$scope", "$routeParams",
function ($scope, $routeParams) {

	$scope.templateID = $routeParams.templateID;

}]);
