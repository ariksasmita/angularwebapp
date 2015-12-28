'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$location', 'CommonProp', '$firebaseAuth', function($scope, $location, CommonProp, $firebaseAuth) {
  var firebaseObj = new Firebase("https://amber-heat-9968.firebaseio.com");
  var loginObj = $firebaseAuth(firebaseObj);
  
  $scope.user = {};
  $scope.SignIn = function(e){ 
     e.preventDefault();
     var username = $scope.user.email;
     var password = $scope.user.password;
     loginObj.$authWithPassword({
                email: username,
                password: password
            })
            .then(function(user) {
                //Success callback
                console.log('Authentication successful');
                console.log(user);
                CommonProp.setUser(user.password.email);
                CommonProp.setUserImg(user.password.profileImageURL);
                $location.path('/welcome');
            }, function(error) {
                //Failure callback
                console.log('Authentication failure');
            });
    }
  }
])

.service('CommonProp', [function () {
  var user = '';
  var userImgUrl = '';

  return {
    getUser: function() {
      return user;
    },
    setUser: function(value) {
      user = value;
    },
    setUserImg: function(value) {
      userImgUrl = value;
    },
    getUserImg: function() {
      return userImgUrl;
    }
  };
  
}]);
