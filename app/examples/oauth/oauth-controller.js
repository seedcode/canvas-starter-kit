(function() {
  'use strict';

  angular
  .module('app')
  .controller('OAuthCtrl', ['$scope','$window','$location','canvas', OAuthCtrl]);

  function OAuthCtrl($scope,$window,$location,canvas) {


     $scope.reAuthorize = reAuthorize;

     $scope.logout = logout;


     function reAuthorize(id){
       document.getElementById(id).blur();
       canvas.login();
     }

     function logout(){
       document.getElementById('logout').blur();
       canvas.logout(true);
     }

  }

}());
