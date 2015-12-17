app.factory('TopSalesmen', ['$http', '$rootScope', function ($http, $rootScope) {
	return {
		query: function (success) {
			return $http.get('http://localhost:8080/topsalesmen?sessionid=' + $rootScope.user.id).success(success);
		}
	}
}]);