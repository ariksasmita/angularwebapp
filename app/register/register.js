'use strict';

angular.module('myApp.register', ['ngRoute','firebase'])

// Declared Route
.config(['$routeProvider', function ($routeProvider){
	$routeProvider.when('/register', {
		templateUrl: 'register/register.html',
		controller: 'RegisterCtrl'
	});
}])

// Register Controller
.controller('RegisterCtrl', ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {
	var firebaseObj = new Firebase('https://amber-heat-9968.firebaseio.com');
	var auth = $firebaseAuth(firebaseObj);

	$scope.signUp = function() {
		if (!$scope.regForm.$invalid) {
			var email = $scope.user.email;
			var password = $scope.user.password;
			if(email && password) {
				auth.$createUser(email, password)
				.then(function() {
					// do this if success
					$location.path('/home');
					console.log('User creation success');
				}, function(error) {
					// do this if failed
					$scope.regError = true;
					$scope.regErrorMessage = error.message;
					console.log(error);
				});
			}
		}
	};
}]);