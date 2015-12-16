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
app.factory('Login', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/login?username=:username&password=:password');
}]);
app.factory("Session", ['$rootScope', function ($rootScope) {
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    return {
        //obtenemos una sesión //getter
        get: function (key) {
            var values = document.cookie.split('; ');
            var i = 0, temp = null;
            for (i; i < values.length; i++) {
                temp = values[i].split('=');
                if (temp[0] === key) {
                    return temp[1];
                }
            }
        },
        //creamos una sesión //setter
        set: function (user) {
            $rootScope.user = user;
            $rootScope.$broadcast('HeaderController:update', user);
            setCookie('user_id', user.id, 1);
        },
        //limpiamos una sesión
        unset: function () {
            $rootScope.user = undefined;
            setCookie('user_id', 'val', 0);
        },
        setLang: function (lang) {
            setCookie('lang', lang, 20);
        }
    };
}]);