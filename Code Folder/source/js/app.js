var app = angular.module('app', ['ngRoute', 'ui.router', 'ngResource', 'ngAnimate', 'chart.js', 'ngDragDrop']);

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
            controller: 'LoginController',
            onEnter: function () {
            	setTimeout(function () {
            	    adjustDivWithWindow('.login');
            		
            	}, 1);
				window.onresize = function () {
					adjustDivWithWindow('.login');
				};
            }
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
            controller: 'DashboardController',
            onEnter: function () {
                setTimeout(adjustDivCharts,1000);
                window.onresize = function () {
                    adjustDivCharts();
                };
            }
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
        if ($rootScope.user !== undefined && toState.name === 'login') {
            event.preventDefault();
            $state.transitionTo('app.dashboard');
        }
    });
}]);

function adjustDivWithWindow(element) {
	if (window.outerHeight < window.outerWidth) {
        document.querySelector(element).style.minHeight = (window.outerHeight - 180) + 'px';
	}
    $('footer > .container').fadeIn(1000);
}
function adjustDivCharts() {
    var minHeight = window.outerHeight - 254;
    document.querySelector('.container-charts').style.minHeight = minHeight + 'px';
}