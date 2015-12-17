app.factory('Logout', ['$http', function ($http) {
	return {
		get: function (id, callback) {
			return $http({
				url: 'http://localhost:8080/logout?sessionid=' + id,
				method: 'GET',
				transformResponse: [function (data) {
					// Do whatever you want!
					return data;
				}]
			}).success(callback);
		}
	}
}]);