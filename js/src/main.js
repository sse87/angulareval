// Fake is only used for testing purposes and can be deleted with out affecting the site
angular.module("EvalApp", ["ng", "ngRoute"])
.config(["$routeProvider", function ($routeProvider) {
	
	$routeProvider.when("/login", {
		templateUrl: "/view/login.html",
		controller: "LoginCtrl"
	}).when("/index", {
		templateUrl: "/view/index.html",
		controller: "HomeCtrl",
		resolve: {
			this: ["$location", "LoginFactory", function ($location, LoginFactory) {
				// Redirect to login if username is missing
				if (LoginFactory.getUsername() === "") {
					console.log("Redirected to /login because username was empty!");
					$location.path("/login");
					return;
				}
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


angular.module("EvalApp").factory("LoginFactory",
["$http", "$q",
function($http, $q) {
	var username = "";
	var token = "";
	var email = "";
	var fullName = "";
	var imageUrl = "";
	var role = "";
	var ssn = "";
	return {
		login: function(name, password) {
			var deferred = $q.defer();
			$http.post("http://dispatch.ru.is/h19/api/v1/login", { user: name, pass: password })
			.success(function(data, status, headers) {
				console.log(data);
				username = name;
				token = data.Token;
				email = data.User.Email;
				fullName = data.User.FullName;
				imageUrl = data.User.ImageUrl;
				role = data.User.Role;
				ssn = data.User.SSN;
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
		getSSN: function() { return ssn; }
	};
}]);

angular.module("EvalApp").factory("EvaluationFactory",
["$http", "$q",
function($http, $q) {

	var evalsArr = [];

	return {
		evals: function(myToken) {
			var deferred = $q.defer();
			$http.defaults.headers.common.Authorization = "Basic " + myToken;
			$http.get("http://dispatch.ru.is/h19/api/v1/evaluations")
			.success(function(data, status, headers) {
				console.log("I got some eval data");
				console.log(data);
				evalsArr = data;
				deferred.resolve(data);
			}).error(function() {
				console.log("Eval ERROR");
				deferred.reject();
			});

			return deferred.promise;
		},
		getEvals: function() { return evalsArr; }
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
