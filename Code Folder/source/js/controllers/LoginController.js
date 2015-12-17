app.controller('LoginController', ['$rootScope', '$scope', 'Login', 'Session', '$state', function ($rootScope, $scope, Login, Session, $state) {
	$scope.log = {};
	$scope.msj = '';

	$scope.login = function (form) {
		Login.get({username: $scope.log.username, password: $scope.log.password}, function (data) {
			if (data.loginSucceeded) {
			    Session.set({
					username: $scope.log.username,
					id: data.sessionId
				});
				$state.transitionTo('app.dashboard');
			} else {
				$scope.msj = 'User or password incorrect';
			}
		});
	};
}]);