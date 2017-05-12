app.controller('historyController', ['$window','$scope','$http','$location','userService','$rootScope','$timeout',
 function($window,$scope,$http,$location,userService,$rootScope,$timeout) {
	//	$scope.message = 'Contact us! JK. This is just a demo.';

$scope.username = 'Harish';

  $scope.search   = '';     // set the default search/filter term
getHistory();


function getHistory() {
                userService.getHistoricalDetails($scope.username,function(response){
                 if(response.data.code) {
                  //$scope.message = "Got Something";
                  $scope.records = response.data.message.HistoricalData; 
                  } else {
                   // $scope.message = "nothing";
                    console.log(response.data.message);
                
                  }
        });
}

$scope.logOut = function () {
$location.path('/');
}  

	}]);