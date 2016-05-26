(function() {
  'use strict';

  angular
  .module('app')
  .controller('AppCtrl', ['$scope', AppCtrl]);

  function AppCtrl($scope) {

     $scope.chapters=[
			 {
				 'label':'Overview',
				 'hash':'Overview',
			 },
			 {
				 'label':'The Signed Request',
				 'hash':'SignedRequest',
			 },
			 {
				 'label':'OAuth',
				 'hash':'OAuth',
			 },
			 {
				 'label':'Querying Salesforce Data',
				 'hash':'Query',
			 },
			 {
				 'label':'Editing Salesforce Data',
				 'hash':'Editing',
			 },
			 {
				 'label':'Canvas Events',
				 'hash':'Events',
			 },
       {
         'label':'Resizing',
         'hash':'Resizing',
       },
			 {
				 'label':'Lightning',
				 'hash':'Lightning',
			 },
			 {
				 'label':'Managed Packages',
				 'hash':'Packages',
			 },
			 {
				 'label':'Security Review',
				 'hash':'Security',
			 },

		 ];

		 $scope.selected='Overview';

		 $scope.firstName='';

		 $scope.updateSelected = updateSelected;

     $scope.reAuthorize = reAuthorize;

     function reAuthorize(id){
       document.getElementById(id).blur();
     }

		 function updateSelected(selected) {
			 $scope.selected = selected;
		 }

  }

}());
