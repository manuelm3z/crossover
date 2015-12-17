app.controller('AppController', ['$rootScope', '$scope', function ($rootScope, $scope) {
	$scope.logged = false;
	$rootScope.$on('LogIn', function (event, data) {
		$scope.logged = true;
	});

	$rootScope.$on('LogOut', function (event, data) {
		$scope.logged = false;
	});
}]);