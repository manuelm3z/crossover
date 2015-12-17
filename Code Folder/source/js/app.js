var app = angular.module('app', ['ngRoute', 'ui.router', 'ngResource', 'chart.js']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	"use strict";
    $urlRouterProvider.when('', '/');

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

app.run(['$rootScope', '$state', 'Session', function ($rootScope, $state, Session) {
    "use strict";
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        var requireLogin = false, requirePermission = undefined;
        if (toState.data != undefined) {
            requireLogin = toState.data.requireLogin;
            requirePermission = toState.data.requirePermission;
        }
        if (requireLogin === true && $rootScope.user === undefined) {
        	event.preventDefault();
            if (Session.get('username') == false) {
        	    $state.transitionTo('login');
            } else {
                if ($rootScope.user === undefined) {
                    $rootScope.user = {};
                }
                $rootScope.user.username = Session.get('username');
                $rootScope.user.id = Session.get('user_id');
                $rootScope.$broadcast('LogIn', $rootScope.user);
                $state.transitionTo(toState.name);
            }
        }
    });
}]);