describe("A testing of angular tests", function () {
 
	var $scope;
	var ctrl;


	beforeEach(function () {
		
		module("EvalApp");
		inject(function($controller, $rootScope) {
		
			// create a new scope
			$scope = $rootScope.$new();
			ctrl = $controller("FakeCtrl", {$scope: $scope});
		});
	});
	// The ctrl variable should now be available to all the tests in 
	// this suit and should reference FakeCtrl

	it("should test test in angular", function () {
		var result = $scope.fakeVar;

		expect(result).toEqual("Fake text hello");
	});

});

