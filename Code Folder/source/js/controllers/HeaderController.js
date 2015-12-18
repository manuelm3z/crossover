app.controller('HeaderController', ['$rootScope', '$scope', 'Logout', 'Session', '$state', function ($rootScope, $scope, Logout, Session, $state) {
	$scope.user = {};
	if ($rootScope.user !== undefined) {
		$scope.user = $rootScope.user;
	}

	$rootScope.$on('LogIn', function (event, data) {
		$scope.user = data;
	});

	$scope.logout = function () {
		Logout.get($scope.user.id, function (data) {
			    if (data == 'SUCCESS') {
				    Session.unset();
					$state.transitionTo('login');
				}
		    });
	};
}]);