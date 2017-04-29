angular.module('service',[])

.factory('AuthInter', function($window){
	var AuthInter= {};

	AuthInter.request = function(config){
		var token = $window.localStorage.getItem('token');

		if(token){
			config.headers['x-access-token'] = token;

		}


		return config;
	};

	return AuthInter;
})
