// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tab.user-login', {
      url: '/login',
      views: {
        'login-tab': {
          templateUrl: 'templates/user-login.html',
          controller: 'UserLoginCtrl'
        }
      }
    })

    .state('tab.sign-up', {
      url: '/signup',
      views: {
        'signup-tab': {
          templateUrl: 'templates/sign-up.html',
          controller: 'UserLoginCtrl'
        }
      }
    })

    .state('tab.user-index', {
      url: '/user',
      views: {
        'user-tab': {
          templateUrl: 'templates/User-index.html',
          controller: 'UserLoginCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});

