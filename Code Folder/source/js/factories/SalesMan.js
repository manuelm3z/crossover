app.factory('SalesMan', ['$http', '$rootScope', function ($http, $rootScope) {
	return {
		query: function (success) {
			return $http.get('http://localhost:8080/salesmandata?sessionid=' + $rootScope.user.id).success(success);
		}
	}
}]);