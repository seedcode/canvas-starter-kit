(function() {
  'use strict';

  angular
  .module('app')
  .controller('OAuthCtrl', ['$scope','canvas', OAuthCtrl]);

  function OAuthCtrl($scope,canvas) {

     $scope.logout = logout;

     function logout(){
       document.getElementById('logout').blur();
       canvas.logout(true);
     }

  }

}());
