describe("Testing of the StudentController", function () {
 
	var $scope;
	var $controller;

	beforeEach(function () {
		
		angular.mock.module("EvalApp");
		inject(function($rootScope, $controller) {
		
			// create a new scope
			$scope = $rootScope.$new();
			$controller("StudentCtrl", {$scope: $scope});
		});
	});
	// The ctrl variable should now be available to all the tests in 
	// this suit and should reference FakeCtrl

	it("First student test", function () {
	var result = $scope.username;

		expect(result).toEqual(""); 
	});

});

/*
q = $q;
moc = {
    login: function() {
        deferred = q.defer();
        return deferred.promise;
    }
}
controller = $controller("LoginController", { $scope: $scope, api: moc });
*/