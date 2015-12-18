app.controller('SidebarController', ['$rootScope', '$scope', function ($rootScope, $scope) {
	$scope.open = function (name) {
		$rootScope.$broadcast('Dashboard', name);
	};
}]);