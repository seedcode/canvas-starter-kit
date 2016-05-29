(function() {
  'use strict';

  angular
  .module('app')
  .controller('QueryBCtrl', ['$scope','canvas', QueryBCtrl]);

  function QueryBCtrl($scope,canvas) {

    $scope.queryResult='';

    $scope.runQuery = runQuery;

    $scope.clearResult = clearResult;

    $scope.queryEdit='SELECT Id,Name,LastViewedDate\nFROM Account\nORDER BY LastViewedDate DESC NULLS LAST\nLIMIT 6';

    function runQuery(query) {
      document.getElementById('runQuery').blur();
      function display(result) {
        $scope.$evalAsync(function(){
           $scope.queryResult += JSON.stringify(result,null,2);
        });
      }
      $scope.queryResult='';
      canvas.querySalesforce(query,display,false);
    }

    function clearResult() {
      document.getElementById('clearResult').blur();
      $scope.queryResult='';
    }

  }

}());
