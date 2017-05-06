app.factory('loginService', ['$http','$rootScope','$timeout', function ($http,$rootScope,$timeout) {
var service = {};
service.Login = function (username, password, callback) {
$http.post('/authenticate', { username: username, password: password })
               .then(function (response) {
                   		callback(response);
               		},function(response) {
               	 		callback(response);
        			}
               		);	
};

service.SetCredentials = function (username, password) {
            $rootScope.globals = {
                currentUser: {
                    username: username
                }
            };
        };

service.ClearCredentials = function () {
            $rootScope.globals = {};
        };
  

service.Create = function (username, password, email, callback) {
$http.post('/createUser', { username: username, password: password, email:email })
               .then(function (response) {
                   		callback(response);
               		},function(response) {
               	 		callback(response);
        			}
               		);	
};

        return service;
}]);


