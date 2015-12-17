app.controller('DashboardController', ['$rootScope', '$scope', 'SalesMan', 'SalesPerMonth', 'TopSalesOrders', 'TopSalesmen', function ($rootScope, $scope, SalesMan, SalesPerMonth, TopSalesOrders, TopSalesmen) {
	$scope.dataSalesman = [];
    $scope.labelsSalesman = [];

	SalesMan.query(function (data) {
		if (data.resultDescription === "SUCCESS") {
			for (var i in data.data) {
				if (data.data[i] !== undefined) {
					$scope.dataSalesman.push(data.data[i][1]); 
					$scope.labelsSalesman.push(data.data[i][0]);
				}
			}
		}
	});
    $scope.dataPerMonth = Array([]);
    $scope.labelsPerMonth = [];

	SalesPerMonth.query(function (data) {
		if (data.resultDescription === "SUCCESS") {
			for (var i in data.data) {
				if (data.data[i] !== undefined) {
					$scope.dataPerMonth[0].push(data.data[i][1]); 
					$scope.labelsPerMonth.push(data.data[i][0]);
				}
			}
		}
	});

    $scope.orders = [];

	TopSalesOrders.query(function (data) {
		if (data.resultDescription === "SUCCESS") {
			$scope.orders = data.data;
		}
	});

	$scope.salesmen = [];

	TopSalesmen.query(function (data) {
		if (data.resultDescription === "SUCCESS") {
			$scope.salesmen = data.data;
		}
	});
}]);