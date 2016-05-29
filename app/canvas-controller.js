(function() {
  'use strict';

  angular
  .module('app')
  .controller('AppCtrl', ['$scope','$window','$location','canvas', AppCtrl]);

  function AppCtrl($scope,$window,$location,canvas) {

     $scope.chapters=canvas.chapters();

		 $scope.selected= !$scope.selected ? 'Overview' : $scope.selected ;

		 $scope.updateSelected = updateSelected;

     $scope.reAuthorize = reAuthorize;

     $scope.recentAccounts = recentAccounts;

     $scope.newTask = newTask;

     $scope.deleteTask = deleteTask;

     $scope.navigate = navigate;

     $scope.runQuery = runQuery;

     $scope.clearResult = clearResult;

     $scope.example1Result = '';

     $scope.result = '';

     $scope.newId = '';

     $scope.firstName='';

     $scope.queryResult='';

     $scope.success='false';

     $scope.queryEdit='SELECT Id,Name,LastViewedDate\nFROM Account\nORDER BY LastViewedDate DESC NULLS LAST\nLIMIT 6';

     function reAuthorize(id){
       document.getElementById(id).blur();
       canvas.login();
     }

		 function updateSelected(selected,hash) {
			 $scope.selected = selected;
       $scope.result = '';
       $scope.newId = '';
       $scope.success='false';
       var url = $location.url(hash);
		 }

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

     function clearResult() {
       document.getElementById('clearResult').blur();
       $scope.queryResult='';
     }

  }

}());
