app.controller('SupportController', ['$scope', function ($scope) {
	$scope.support = {};

	$scope.send = function (form) {
		if (form.$valid) {
			$('#support').modal('hide');
            $.scojs_message('Request is sent successfully', $.scojs_message.TYPE_OK);
            $scope.support = {};
            form.$setPristine();
            form.$setUntouched();
		}
	};
}]);