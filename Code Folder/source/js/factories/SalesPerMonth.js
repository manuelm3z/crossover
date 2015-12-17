app.factory('SalesPerMonth', ['$http', '$rootScope', function ($http, $rootScope) {
	return {
		query: function (success) {
			return $http.get('http://localhost:8080/lastyeardata?sessionid=' + $rootScope.user.id).success(success);
		}
	}
}]);