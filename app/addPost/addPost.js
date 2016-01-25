'use srict';

angular.module('myApp.addPost', ['ngRoute'])

// Declared Route
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addPost', {
    templateUrl: 'addPost/addPost.html',
    controller: 'AddPostCtrl'
  });
}])

// Controller
.controller('AddPostCtrl', ['$scope', '$firebase', '$location', 'CommonProp', function ($scope, $firebase, $location, CommonProp) {

	// Post above data to Firebse
	$scope.AddPost = function() {
		// Get post details (Title & Post content)
		var title = $scope.article.title;
		var post = $scope.article.post;

		// Create Firebase Instances
		var firebaseObj = new Firebase('https://amber-heat-9968.firebaseio.com/articles');
		var fb = $firebase(firebaseObj);

		fb.$push({
			title: title,
			post: post,
			emailID: CommonProp.getUser()
		}).then(function(ref) {
			console.log(ref);
			$location.path('/welcome');
		}, function(error) {
			console.log("Error: ", error);
		});
	}
}]);