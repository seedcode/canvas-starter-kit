(function() {
'use strict';
angular
  .module('app',['ngRoute'])
	.config(['$routeProvider', router]);

  function router($routeProvider){
    $routeProvider.when('/Overview' , {
      templateUrl: 'app/examples/overview.html'
    })
    .when('/SignedRequest', {
      templateUrl: 'app/examples/signed-request.html'
    })
    .when('/OAuth', {
      templateUrl: 'app/examples/oauth/oauth.html'
    })
    .when('/QueryA', {
      templateUrl: 'app/examples/queryA/queryA.html'
    })
    .when('/QueryB', {
      templateUrl: 'app/examples/queryB/queryB.html'
    })
    .when('/Editing', {
      templateUrl: 'app/examples/edit/edit.html'
    })
    .when('/Events', {
      templateUrl: 'app/examples/events.html'
    })
    .when('/Resizing', {
      templateUrl: 'app/examples/resizing.html'
    })
    .when('/Lightning', {
      templateUrl: 'app/examples/lightning.html'
    });
  }

})();
