'use strict';

angular.module('myApp.welcome', ['ngRoute'])

// Defined route
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/welcome', {
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	})
	
}])

// Controller
.controller('WelcomeCtrl', ['$scope', 'CommonProp', function ($scope, CommonProp) {
	$scope.username = CommonProp.getUser();
	$scope.userimage = CommonProp.getUserImg();
}]);