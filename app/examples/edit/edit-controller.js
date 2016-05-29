(function() {
  'use strict';

  angular
  .module('app')
  .controller('EditCtrl', ['$scope','canvas', EditCtrl]);

  function EditCtrl($scope,canvas) {

    $scope.newTask = newTask;

    $scope.deleteTask = deleteTask;

    $scope.newId = '';

    $scope.success = 'false';

    $scope.navigate = navigate;

    function newTask(){
      document.getElementById('newTask').blur();
      var due = new Date();
      due.setDate(due.getDate()+1);
      due = due.toISOString();
      var request = {
        'ActivityDate':due.substring(0,10),
        'Subject':'Test Task From the canvas-starter-kit',
      };
      canvas.editSalesforce('Task',request,process);
      function process(result) {
        $scope.$evalAsync(function(){
           $scope.newId = result;
           $scope.success = true;
        });
      }
    }

    function deleteTask(id) {
      canvas.deleteSalesforce('Task',id,process);
      function process(result) {
        if(result) {
          $scope.$evalAsync(function(){
             $scope.newId = '';
             $scope.success = false;
          });
        }
      }
    }

    function navigate(id) {
      cnv.navigate(id,null,true);
    }

  }

}());
