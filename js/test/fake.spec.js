describe("A testing of angular tests", function () {
 
	var $scope;
	var controller;


	beforeEach(function () {
		
		module("EvalApp");
		inject(function($controller, $rootScope) {
		
			// create a new scope
			$scope = $rootScope.$new();
			controller = $controller("FakeCtrl", {$scope: $scope});
		});
	});
	// The ctrl variable should now be available to all the tests in 
	// this suit and should reference FakeCtrl

	it("First fake test", function () {
		var result = $scope.fakeVar;

		expect(result).toEqual("Fake text hello");
	});

	it("Second fake test", function () {
		var result2 = $scope.fakeVar2;

		expect(result2).toEqual("Fake text hello2");
	});

	it("This makes no sense anymore", function () {
		var result3 = $scope.fakeVar3;

		angular.lowercase(result3);
	});

	it("This makes no sense anymore", function () {
		var result4 = $scope.fakeVar4;

		angular.isDefined(result4);;
	});

	it("This makes no sense anymore", function () {
		var result5 = $scope.fakeVar4;

		angular.isNumber(result5);
	});

	it("This makes no sense anymore", function () {
		var result6;

		angular.isUndefined(result6);
	});
	
	
	
});

