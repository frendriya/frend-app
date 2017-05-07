app.factory('userService', ['$http','$rootScope','$timeout', function ($http,$rootScope,$timeout) {
var service = {};
service.save = function (data, callback) {
$http.post('/save', { data:data})
               .then(function (response) {
                   		callback(response);
               		},function(response) {
               	 		callback(response);
        			}
               		);	
};


        return service;
}]);


