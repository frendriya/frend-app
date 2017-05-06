var app =  angular.module('yourApp', ['ngRoute']);

app.config(function($routeProvider,$locationProvider) {
		$routeProvider
			// route for the home page
			.when('/', {
				templateUrl : 'login.html',
				controller  : 'loginController'
			})
			// // route for the contact page
			.when('/contact', {
				templateUrl : 'contact.html',
				controller  : 'contactController'
			})
			.when('/register', {
				templateUrl : 'registration.html',
				controller  : 'registerController'
			})
			.when('/main',{
				templateUrl : 'main.html',
				controller  : 'mainController'
			});

			$locationProvider.html5Mode(true).hashPrefix('!');
	});

