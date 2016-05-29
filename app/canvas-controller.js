(function() {
  'use strict';

  angular
  .module('app')
  .controller('AppCtrl', ['$scope','$location','canvas', AppCtrl]);

  function AppCtrl($scope,$location,canvas) {

     $scope.firstName='';

     $scope.chapters=canvas.chapters();

		 $scope.selected= !$scope.selected ? 'Overview' : $scope.selected ;

		 $scope.updateSelected = updateSelected;

     function updateSelected(selected,hash) {
			 $scope.selected = selected;
       $scope.result = '';
       $scope.newId = '';
       $scope.success='false';
       var url = $location.url(hash);
		 }


  }

}());
