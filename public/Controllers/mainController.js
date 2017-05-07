app.controller('mainController', ['$window','$scope','$http','$location','userService','$rootScope','$timeout',
 function($window,$scope,$http,$location,userService,$rootScope,$timeout) {         
    $scope.onExit = function() {
      console.log('bey');
    };
 $scope.message = 'Hello World1';
   $window.onunload =  $scope.onExit;



$scope.resultColor = 'yellow';
generateNumber();

$scope.timer = '1h 30m 00s';

function generateNumber() {
var random = Math.floor(Math.random() * 90000) + 10000;
$scope.newData = random;     
}

var countDownTime = 50000;
$scope.active = true;

$scope.start = function () {
  $scope.show = true;
  $scope.startTimer();
}

$scope.startTimer = function() {
    $scope.myVar = false;
    $scope.active = true;
    $scope.message = '';
    $scope.countdown();
};

$scope.pause = function() {
    $scope.myVar = true;
    $scope.active = false;
    $scope.message = 'Paused';
};

$scope.stop = function () {
    $timeout.cancel(countdownStop);
}

$scope.countdown = function () {
    countdownStop = $timeout(function () {
          if ($scope.active) {
                var currentTime = 0;
                countDownTime = countDownTime - 1000;
        var hours = Math.floor((countDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((countDownTime % (1000 * 60)) / 1000);
        $scope.timer= hours + "h "    + minutes + "m " + seconds + "s ";
                 $scope.countdown();
            }
        else {
            if (countDownTime < 0) {
            $scope.stop();
            $scope.message = 'Expired';
            $scope.timer="Expired";
             }        }
    }, 1000);
};

$scope.Verify_number = function() {
                if($scope.userInput == null){
                    return false;
                }else if($scope.userInput == $scope.newData){
                    $scope.lastResult = "Correct!";
                    $scope.resultColor = 'lightblue';
                    // totalCorrect = totalCorrect + 1;
                    // console.log("Correct: "+totalCorrect);
                } else{
                    $scope.lastResult = "Incorrect!";
                    $scope.resultColor = 'red';
                    // totalIncorrect = totalIncorrect + 1;
                    // console.log("Incorrect: "+ totalIncorrect);
                }
                // totalAttempts = totalAttempts + 1;
                // console.log("Attempts: "+totalAttempts);
                // updateResultTable();
                generateNumber();
                $scope.userInput = "";
                // saveData();

               }  



$scope.logOut = function () {
  userService.save(countDownTime, function(response){
                 if(response.data.code) {
                  $scope.message = response.data.message;
                    //loginService.SetCredentials($scope.username, $scope.password);
                    //$location.path('/main');
                  } else {
                  $scope.message = response.data.message;
                  }
        });
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