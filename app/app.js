(function() {
'use strict';
angular
  .module('app',['ngRoute'])
	.config(['$routeProvider', router]);

  function router($routeProvider){
    $routeProvider.when('/Overview' , {
      templateUrl: 'app/templates/overview.html'
    })
    .when('/SignedRequest', {
      templateUrl: 'app/templates/signed-request.html'
    })
    .when('/OAuth', {
      templateUrl: 'app/templates/OAuth.html'
    });
  }

})();
