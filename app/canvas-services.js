(function() {
	'use strict';

	angular
		.module('app')
		.factory('canvas', canvas);

	function canvas($sce) {

		return {
      initialize:initialize,
			login:login,
			querySalesforce:querySalesforce,
			editSalesforce:editSalesforce,
			deleteSalesforce:deleteSalesforce,
      chapters:chapters,
		};

		function querySalesforce(query,callback) {
			cnv.querySalesforce(query,process);
			function process(result) {
				if(result && result[0].errorCode) {
					alert(errorCode);
				}
				else{
					callback(result);
				}
			}
		}

		function editSalesforce(object,request,callback) {
			cnv.editSalesforce(object,request,process);
			function process(result) {
				if(result.errors[0]) {
					alert(errorCode.errors[0].errorCode);
				}
				else{
					callback(result.id);
				}
			}
		}

		function deleteSalesforce(object,request,callback) {
			cnv.deleteSalesforce(object,request,process);
			function process(result) {
				if(result && result[0].errorCode) {
					alert(result[0].errorCode);
					callback(true);
				}
				else{
					callback(result[0].success);
				}
			}
		}

    function initialize(callback) {
		  cnv.initialize(checkCanvasLoad);
		    function checkCanvasLoad(result) {
		      if(result.errorCode) {
		        alert(errorCode);
		      }
		      else if (callback) {
		        callback(result);
		      }
		  }
		}

		function login(){
			cnv.loginButton();
		}

    function chapters(){
      return [
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

			 /* Coming soon
 			 {
 				 'label':'Managed Packages',
 				 'hash':'Packages',
 			 },
 			 {
 				 'label':'Security Review',
 				 'hash':'Security',
 			 }
			 */

		 ];
    }


	}
}());
