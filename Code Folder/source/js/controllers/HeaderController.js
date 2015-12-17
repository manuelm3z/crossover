app.controller('HeaderController', ['$rootScope', '$scope', 'Logout', 'Session', '$state', function ($rootScope, $scope, Logout, Session, $state) {
	$scope.user = {};
	if ($rootScope.user !== undefined) {
		$scope.user = $rootScope.user;
	}

	$scope.logout = function () {
		Logout.get($scope.user.id, function (data) {
			    if (data == 'SUCCESS') {
				    Session.unset();
					$state.transitionTo('login');
				}
		    });
	};
}]);