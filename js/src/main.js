angular.module("EvalApp", ["ng", "ngRoute"])
.config(["$routeProvider", function ($routeProvider) {
	
	$routeProvider.when("/login", {
		templateUrl: "/view/login.html",
		controller: "LoginCtrl"
	}).when("/index", {
		templateUrl: "/view/index.html",
		controller: "HomeCtrl"
	}).when("/about", {
		templateUrl: "/view/about.html",
		controller: "AboutCtrl"
	// Fake is only used for testing purposes and can be deleted with out affecting the site
	}).when("/fake", {
		templateUrl: "/view/fake.html",
		controller: "FakeCtrl"
	}).otherwise({ redirectTo: "/login" });
	
}]);


angular.module("EvalApp").factory("LoginFactory", [
"$http", "$q",
function($http, $q) {
	var username, role, token;
	return {
		login: function(name, password) {
			var deferred = $q.defer();

			$http.post("/api/v1/login", { user: name, pass: password })
			.success(function(data, status, headers) {
				username = name;
				token = data.token;
				role = data.role;
				deferred.resolve({ username: name, role: data.role, token: data.token });
			}).error(function() {
				deferred.reject();
			});

			return deferred.promise;
		},
		getToken: function() {
			return token;
		},
		getUsername: function() {
			return username;
		},
		getRole: function() {
			return role;
		}
	};
}]);



angular.module("EvalApp").factory("ApiFactory", [
"$q",
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


