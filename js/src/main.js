// Fake is only used for testing purposes and can be deleted with out affecting the site
angular.module("EvalApp", ["ng", "ngRoute"])
.config(["$routeProvider", function ($routeProvider) {
	
	$routeProvider.when("/login", {
		templateUrl: "/view/login.html",
		controller: "LoginCtrl"
	}).when("/admin/template/new", {
		templateUrl: "/view/createTemplate.html",
		controller: "TemplateCtrl",
		resolve: {
			this: ["LoginFactory", function (LoginFactory) {
				LoginFactory.isLoggedIn("admin");
			}]
		}
	}).when("/admin/template/:templateID", {
		templateUrl: "/view/templateDetails.html",
		controller: "TemplateDetailsCtrl",
		resolve: {
			this: ["LoginFactory", function (LoginFactory) {
				LoginFactory.isLoggedIn("admin");
			}]
		}
	}).when("/admin/evaluation/:evalID", {
		templateUrl: "/view/evalDetails.html",
		controller: "EvalDetailsCtrl",
		resolve: {
			this: ["LoginFactory", function (LoginFactory) {
				LoginFactory.isLoggedIn("admin");
			}]
		}
	}).when("/admin", {
		templateUrl: "/view/adminIndex.html",
		controller: "AdminCtrl",
		resolve: {
			this: ["LoginFactory", function (LoginFactory) {
				LoginFactory.isLoggedIn("admin");
			}]
		}
	}).when("/student/answer/:courseID/:semesterID/:evalID", {
		templateUrl: "/view/answer.html",
		controller: "AnswerCtrl",
		resolve: {
			this: ["LoginFactory", function (LoginFactory) {
				LoginFactory.isLoggedIn("student");
			}]
		}
	}).when("/student", {
		templateUrl: "/view/studentIndex.html",
		controller: "StudentCtrl",
		resolve: {
			this: ["LoginFactory", function (LoginFactory) {
				LoginFactory.isLoggedIn("student");
			}]
		}
	}).when("/about", {
		templateUrl: "/view/about.html",
		controller: "AboutCtrl"
	}).when("/fake", {
		templateUrl: "/view/fake.html",
		controller: "FakeCtrl"
	}).otherwise({ redirectTo: "/login" });
}]);


angular.module("EvalApp").constant("API_URL", "http://dispatch.ru.is/h19");


angular.module("EvalApp").factory("LoginFactory",
["$http", "$q", "$location" , "API_URL",
function($http, $q, $location, API_URL) {
	var username = "";
	var token = "";
	var email = "";
	var fullName = "";
	var imageUrl = "";
	var role = "";
	var ssn = "";
	return {
		login: function (name, password) {
			var deferred = $q.defer();
			$http.post(API_URL + "/api/v1/login", { user: name, pass: password })
			.success(function (data, status, headers) {
				username = name;
				token = data.Token;
				email = data.User.Email;
				fullName = data.User.FullName;
				imageUrl = data.User.ImageUrl;
				role = data.User.Role;
				ssn = data.User.SSN;

				if (role === "admin") {
					$location.path("/admin");
				}
				else {
					$location.path("/student");
				}

				deferred.resolve({ username: name, token: data.token });
			}).error(function() {
				deferred.reject();
			});
			return deferred.promise;
		},
		getUsername: function() { return username; },
		getToken: function() { return token; },
		getEmail: function() { return email; },
		getFullName: function() { return fullName; },
		getImageUrl: function() { return imageUrl; },
		getRole: function() { return role; },
		getSSN: function() { return ssn; },

		isLoggedIn: function (currentRole) {
			// Redirect to login if username is not student
			if (role !== currentRole) {
				console.log("Redirected to /login because your role was '" + role + "' but not '" + currentRole + "'!");
				$location.path("/login");
			}
		}
	};
}]);


angular.module("EvalApp").factory("AdminFactory",
["$http", "$q", "API_URL", "LoginFactory",
function($http, $q, API_URL, LoginFactory) {

	var adminEvalsArr = [];
	var adminTemplateArr = [];

	return {
		pullEvals: function() {
			var deferred = $q.defer();
			$http.defaults.headers.common.Authorization = "Basic " + LoginFactory.getToken();
			$http.get(API_URL + "/api/v1/evaluations")
			.success(function (data, status, headers) {
				// Update the data
				adminEvalsArr.length = 0;
				adminEvalsArr.push.apply(adminEvalsArr, data);
				// Resolve
				deferred.resolve(data);
			}).error(function() {
				console.log("AdminFactory.pullEvals() ERROR");
				deferred.reject();
			});
			return deferred.promise;
		},
		pullTemplates: function() {
			var deferred = $q.defer();
			$http.defaults.headers.common.Authorization = "Basic " + LoginFactory.getToken();
			$http.get(API_URL + "/api/v1/evaluationtemplates")
			.success(function (data, status, headers) {
				
				// Update list
				adminTemplateArr.length = 0;
				adminTemplateArr.push.apply(adminTemplateArr, data);

				deferred.resolve(data);
			}).error(function () {
				console.log("AdminFactory.pullTemplates() ERROR");
				deferred.reject();
			});
			return deferred.promise;
		},
		pushTemplates: function (template) {
			var deferred = $q.defer();
			$http.defaults.headers.common.Authorization = "Basic " + LoginFactory.getToken();
			$http.post(API_URL + "/api/v1/evaluationtemplates", template)
			.success(function (data, status, headers) {
				// To be sure it was success then check status for code 204 and 4xx if it was unsuccessful
				deferred.resolve(data);
			}).error(function () {
				console.log("AdminFactory.pushTemplates() ERROR");
				deferred.reject();
			});
			return deferred.promise;
			
		},
		pushEval: function (templateID, startDate, endDate) {
			var deferred = $q.defer();
			$http.defaults.headers.common.Authorization = "Basic " + LoginFactory.getToken();
			$http.post(API_URL + "/api/v1/evaluations", { TemplateID: templateID, StartDate: startDate, EndDate: endDate })
			.success(function (data, status, headers) {
				// To be sure it was success then check status for code 204 and 4xx if it was unsuccessful
				//AdminFactory.pullEvals();
				deferred.resolve(data);
			}).error(function () {
				console.log("AdminFactory.pushTemplates() ERROR");
				deferred.reject();
			});
			return deferred.promise;

		},
		getEvals: function () { return adminEvalsArr; },
		getTemplates: function () { return adminTemplateArr; }
	};
}]);

angular.module("EvalApp").factory("StudentFactory",
["$http", "$q", "API_URL", "LoginFactory",
function($http, $q, API_URL, LoginFactory) {

	var studentEvalsArr = [];
	var currentCourseEval = {};

	return {
		pullEvals: function () {
			var deferred = $q.defer();
			$http.defaults.headers.common.Authorization = "Basic " + LoginFactory.getToken();
			$http.get(API_URL + "/api/v1/my/evaluations")
			.success(function (data, status, headers) {
				// Update the data
				studentEvalsArr.length = 0;
				studentEvalsArr.push.apply(studentEvalsArr, data);
				// Resolve
				deferred.resolve(data);
			}).error(function() {
				console.log("StudentFactory.pullEvals() ERROR");
				deferred.reject();
			});
			return deferred.promise;
		},
		pullCurrentCourseEval: function (course, semester, id) {
			var deferred = $q.defer();
			$http.defaults.headers.common.Authorization = "Basic " + LoginFactory.getToken();
			$http.get(API_URL + "/api/v1/courses/" + course + "/" + semester + "/evaluations/" + id)
			.success(function (data, status, headers) {
				// Update the data
				currentEval = data;	
				// Resolve
				deferred.resolve(data);
			}).error(function() {
				console.log("StudentFactory.pullCurrentCourseEval() ERROR");
				deferred.reject();
			});
			return deferred.promise;
		},
		pushEval: function (course, semester, id, userEval) {
			var deferred = $q.defer();
			$http.defaults.headers.common.Authorization = "Basic " + LoginFactory.getToken();
			$http.post(API_URL + "/api/v1/courses/" + course + "/" + semester + "/evaluations/" + id, userEval)
			.success(function (data, status, headers) {
				// To be sure it was success then check status for code 204 and 4xx if it was unsuccessful
				deferred.resolve(data);
			}).error(function () {
				console.log("StudentFactory.pushEval() ERROR");
				deferred.reject();
			});
			return deferred.promise;
		},
		getEvals: function () { return studentEvalsArr; },
		getCurrentCourseEval: function () {return currentEval; },
	};
}]);
/*

angular.module("EvalApp").factory("ApiFactory",
["$q",
function($q) {
	var evaluations = generateEvaluations();
	return {
		getAllEvaluations: function() {
			var deferred = $q.defer();
			deferred.resolve(evaluations);
			return deferred.promise;
		},
		getEvaluationById: function(id) {
			var deferred = $q.defer();
			if(evaluations[id]) {
				deferred.resolve(evaluations[id]);
			}
			else {
				deferred.reject("No evaluation with this id");
			}
			return deferred.promise;
		},
		addEvaluation: function(evaluation) {
			var deferred = $q.defer();
			
			// TODO I guess
			
			return deferred.promise;
		}
	};
}]);

function createEvaluation(id, titleIS, titleEN, introIS, introEN) {
	return {
		ID: id,
		TitleIS: titleIS,
		TitleEN: titleEN,
		IntroTextIS: introIS,
		IntroTextEN: introEN,
		CourseQuestions: [],
		TeacherQuestions: []
	};
}

function createQuestion(id, textIS, textEN, imageUrl, type) {
	return {
		ID: id,
		TextIS: textIS,
		TextEN: textEN,
		ImageURL: imageUrl,
		Type: type,
		Answers: []
	};
}

function generateEvaluations() {
	var result = [];
	for(var i = 0; i < 5; ++i) {
		var number = i+1;
		var evaluation = createEvaluation(i, "Kennslumat " + number, "Evaluation " + number, "Derp", "Derp");
		for(var j = 0; j < 3; ++j) {
			var qNumber = j+1;
			var question = createQuestion(j, "Hvað er derp" + qNumber + "?", "What is derp " + qNumber + "?", "", "single");
			evaluation.CourseQuestions.push(question);
		}
		result.push(evaluation);
	}
	return result;
}

*/
