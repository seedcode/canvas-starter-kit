(function() {
  'use strict';

  angular
  .module('app')
  .controller('QueryACtrl', ['$scope','canvas', QueryACtrl]);

  function QueryACtrl($scope,canvas) {

    $scope.recentAccounts = recentAccounts;

    $scope.result='';

    $scope.navigate = navigate;

    function recentAccounts() {
      document.getElementById('recentAccounts').blur();
      var query = 'SELECT Id,Name,LastViewedDate FROM Account ORDER BY LastViewedDate DESC NULLS LAST LIMIT 6';
      function process(result) {
        var date;
        //clean dates
        for (var i in result) {
          if(!result[i].LastViewedDate){
            result[i].date='not viewed';
          }
          else{
            date = new Date(result[i].LastViewedDate);
            result[i].date=date.toLocaleDateString();
            result[i].time=date.toLocaleTimeString();
          }
        }
        $scope.$evalAsync(function(){
           $scope.result = result;
        });
      }
      canvas.querySalesforce(query,process);
    }

    function navigate(id) {
      cnv.navigate(id,null,true);
    }

  }

}());
