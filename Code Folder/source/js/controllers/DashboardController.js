app.controller('DashboardController', ['$rootScope', '$scope', 'SalesMan', 'SalesPerMonth', 'TopSalesOrders', 'TopSalesmen', function ($rootScope, $scope, SalesMan, SalesPerMonth, TopSalesOrders, TopSalesmen) {
	$scope.showTotalSalesman = true;
	$scope.totalSalesman = function () {
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
	};
	$scope.totalSalesman();

    $scope.showTotalSalesPerMonth = true;
	$scope.totalSalesPerMonth = function () {
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
	};
	$scope.totalSalesPerMonth();

    $scope.showTopSalesOrders = true;
	$scope.topSalesOrders = function () {
		$scope.orders = [];

	    TopSalesOrders.query(function (data) {
		    if (data.resultDescription === "SUCCESS") {
			    $scope.orders = data.data;
		    }
	    });
	};
	$scope.topSalesOrders();

    $scope.showTopSalesmen = true;
    $scope.topSalesmen = function () {
	    $scope.salesmen = [];

	    TopSalesmen.query(function (data) {
		    if (data.resultDescription === "SUCCESS") {
			    $scope.salesmen = data.data;
		    }
	    });
    };
    $scope.topSalesmen();

	$scope.update = function (name) {
		$scope[name]();
	};

	$scope.close = function (name) {
		$scope[name] = false;
	};
}]);