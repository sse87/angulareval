/*
describe("LoginFactory tests", function() {
    var $httpBackend;
    var studentFactory;

    beforeEach(module("EvalApp"));
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');

        // Intercept HTTP requests and do the following:
        $httpBackend.when('POST', '/api/v1/login').respond({role: "student", token: "xxx"});

        // Create a fresh instance of the LoginFactory:
        loginFactory = $injector.get("LoginFactory");
    }));

    it("is possible to login as 'Baering' and get a token with 'xxx'", function() {
        loginFactory.login("Baering").then(function(data) {
            expect(loginFactory.getUsername()).toBe(data.username);
            expect(data.username).toBe("Baering");

            expect(loginFactory.getToken()).toBe(data.token);
            expect(data.token).toBe("xxx");

            expect(loginFactory.getRole()).toBe(data.role);
            expect(data.role).toBe("student");
        });
        $httpBackend.expectPOST('/api/v1/login');
        $httpBackend.flush();
    })
})
*/

describe("Testing of the StudentFactory response", function () {
 
	var scope, controller, q, deferred, fakeFactory;

    beforeEach(module('EvalApp'));


	beforeEach(function () {

        fakeFactory = {
            pullEvals: function () {
                deferred = q.defer();
                // Place mock data in the promise
                deferred.resolve({
                    "ID": 1,
                    "CourseID": "42",
                    "CourseNameIS": "Vefforritun 2",
                    "CourseNameEN": "Webprogramming 2",
                    "Semester": "19"
                });
            }
        };

        spyOn(fakeFactory, 'pullEvals').andCallThrough();

		inject(function($rootScope, $controller, $q) {	
			// create a new scope
			$scope = $rootScope.$new();
            q = $q;
			$controller("StudentCtrl", { $scope: $scope, StudentFactory: fakeFactory });
		});
	});

	it("First student test", function () {
	   expect(fakeFactory.pullEvals).toBe({ "CourseID": "42" });
	});

});

/*
describe('mocking the factory response', function () {

    beforeEach(module('myApp.controllers'));

    var scope, fakeFactory, controller, q, deferred;

    //Prepare the fake factory
    beforeEach(function () {
        mockService = {
            requestPeople: function () {
                deferred = q.defer();
                // Place the fake return object here
                deferred.resolve({ "one": "three" });
                return deferred.promise;
            }
        };
        spyOn(fakeFactory, 'requestPeople').andCallThrough();
    });

    //Inject fake factory into controller
    beforeEach(inject(function ($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        q = $q;
        controller = $controller('MyCtrl1', { $scope: scope, MyFactory: mockService });
    }));

    it('The peopleList object is not defined yet', function () {
        // Before $apply is called the promise hasn't resolved
        expect(scope.peopleList).not.toBeDefined();
    });

    it('Applying the scope causes it to be defined', function () {
        // This propagates the changes to the models
        // This happens itself when you're on a web page, but not in a unit test framework
        scope.$apply();
        expect(scope.peopleList).toBeDefined();
    });

    it('Ensure that the method was invoked', function () {
        scope.$apply();
        expect(fakeFactory.requestPeople).toHaveBeenCalled();
    });

    it('Check the value returned', function () {
        scope.$apply();
        expect(scope.peopleList).toBe({ "one": "three" });
    });
});
*/