app.controller('mainController', ['$scope','$http','$location','loginService','$rootScope','$timeout',
 function($scope,$http,$location,loginService,$rootScope,$timeout) {         
$scope.resultColor = 'yellow';
generateNumber();
// timer('init');
// countDown();
// $scope.message = 'Hello World1';
//$scope.newData = 'Hello';




function generateNumber() {
var random = Math.floor(Math.random() * 90000) + 10000;
$scope.newData = random;     
}

// function timer(status) {
// if(status == 'init'){
// 	$scope.resultColor = 'blue';
// }
// };


// var countDownTime = new Date().getTime() + 5400000;
// function countDown(){
// var currentTime = new Date().getTime();
// var distance = countDownTime - currentTime;
// var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// var seconds = Math.floor((distance % (1000 * 60)) / 1000);
// $scope.timer= hours + "h "    + minutes + "m " + seconds + "s ";
// $timeout(countDown, 1000);
// };



var countDownTime = 5400000;
$scope.active = true;

$scope.start = function() {
    $scope.active = true;
    $scope.countdown();
};

$scope.pause = function() {
    $scope.active = false;
};

$scope.stop = function () {
    $timeout.cancel(countdownStop);
}


$scope.countdown = function () {
    countdownStop = $timeout(function () {
        if (countDownTime == 0) {
            $scope.stop();
             }
        else {
            if ($scope.active) {
                var currentTime = 0;
                countDownTime = countDownTime - 1000;
				var hours = Math.floor((countDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((countDownTime % (1000 * 60)) / 1000);
				$scope.timer= hours + "h "    + minutes + "m " + seconds + "s ";
                 $scope.countdown();
            }
        }
    }, 1000);
};




   //   // If the count down is over, write some text 
   //  if (distance < 0) {
   //      clearInterval(x);
   //      document.getElementById("demo").innerHTML = "EXPIRED";
   //      expire();
   //  }
   //  }, 1000);


















$scope.logOut = function () {
generateNumber();
// $location.path('/');
}       

// $scope.Login = function () {
// 	 $scope.message = 'Hello World1';
// if($scope.username == ""){
// 	$scope.message = "Please fill username!!";
// } else if($scope.password == ""){
// 	$scope.message  = "Please fill password!!";
// }else 
// {
// loginService.Login($scope.username, $scope.password, function(response) {
//                 if(response.data.code) {
//                 	$scope.message = response.data.message;
//                     //loginService.SetCredentials($scope.username, $scope.password);
//                     $location.path('/main');
//                 	} else {
//                 	$scope.message = response.data.message;
//                 	}
// 				})
// }
// }
    }]);