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
.controller('WelcomeCtrl', ['$scope', '$firebase', 'CommonProp', function ($scope, $firebase, CommonProp) {
	$scope.username = CommonProp.getUser();
	// $scope.userimage = CommonProp.getUserImg();

	var firebaseObj = new Firebase('https://amber-heat-9968.firebaseio.com/articles');
	var sync = $firebase(firebaseObj);
	$scope.articles = sync.$asArray();

}]);