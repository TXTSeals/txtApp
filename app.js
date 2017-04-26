// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ui.router','service'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});

var app = angular.module('myApp', ['ui.router','service']);

app.config(function($stateProvider,$urlRouterProvider,$httpProvider){
    $httpProvider.interceptors.push('AuthInter');

    $urlRouterProvider.otherwise('/home')

    $stateProvider


    .state('home',{
        url:'/home',
        views: {
            'main':{
                templateUrl: 'templates/home.html',

            }
        }
    })

    .state('signUp',{
        url:'/signUp',
        views: {
            'main':{
                templateUrl: 'templates/signUp.html',


                controller: function($scope,$http,$timeout,$state){
                    $scope.register = function(){
                            $scope.serverMsg =false;

                        $http.post('/signUp', $scope.newUser).then(function(data){
                            $scope.serverMsg = data.data;
                            if($scope.serverMsg.success == true){
                                $timeout(function(){
                                    $state.go('login');
                                }, 2000);
                            }
                        })
                    }
                }
            }
        }
    })
    .state('login',{
        url:'/login',
        views: {
            'main':{
                templateUrl: 'templates/login.html',
                resolve:{
                    checkLoggedIn: function($http,$state,$window){
                        if($window.localStorage.getItem('token')){
                            $state.go('checkIn');
                        }
                    }
                },
                controller: function($scope,$http,$timeout,$state,$window){
                    $scope.login = function(){
                        $scope.serverMsg =false;

                        $http.post('/login', $scope.newUser).then(function(data){
                            $scope.serverMsg = data.data;

                            if($scope.serverMsg.success == true){

                                $window.localStorage.setItem('token', $scope.serverMsg.token) //saves token under the name token in the browser
                                $timeout(function(){
                                    $state.go('checkIn');
                                }, 2000);
                            }
                        });
                    }
                }
            }
        }
    })
    .state('checkIn',{
        url:'/user',
        views: {
            'main':{
                templateUrl: 'templates/checkIn.html',
                resolve: {
                    checkToken: function($window,$http,$state){
                        if($window.localStorage.getItem('token')){
                             return $http.post('/me');
                        }else{
                            $state.go('login')
                        }

                    }
                },
                controller: function($scope,$http,checkToken,$state,$window,$timeout){

                        $scope.user = checkToken.data;
                        $scope.loggingOut = false;
                        $scope.logout = function(){
                            $window.localStorage.removeItem('token');
                            $scope.loggingOut = true;
                            $timeout(function () {
                                $state.go('signUp');
                            }, 3000);

                        }
                    }
                }
            }
    })
});
