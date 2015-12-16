var app = angular.module('app', ['ngRoute', 'ui.router', 'ngResource']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	"use strict";
	$stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'states/login.html',
            data: {
                requireLogin: false
            },
            controller: 'LoginController'
        })
        .state('app', {
            abstract: true,
            data: {
                requireLogin: true
            },
            template: '<div><div ui-view></div></div>'
        })
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'states/main.html',
            controller: 'DashboardController'
        });
}]);

app.run(['$rootScope', '$state', function ($rootScope, $state) {
    "use strict";
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        var requireLogin = false, requirePermission = undefined;
        if (toState.data != undefined) {
            requireLogin = toState.data.requireLogin;
            requirePermission = toState.data.requirePermission;
        }
        if (requireLogin === true && $rootScope.user === undefined) {
        	event.preventDefault();
        	$state.transitionTo(toState.name);
        }
    });
}]);