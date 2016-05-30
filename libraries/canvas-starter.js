var cnv = (function(storage) {
	'use strict';
	return {

		initialize: initialize,
		login:login,
		logout:logout,
		refresh:refresh,
		querySalesforce:querySalesforce,
		editSalesforce:editSalesforce,
		deleteSalesforce:deleteSalesforce,
		publish: publish,
		navigate:navigate,
	};

	function initialize(callback) {

		//we are logged in and can retrieve and decode our signed request for our calls to salesforce.
		Sfdc.canvas.client.refreshSignedRequest(function(data) {
			if (data.status === 200) {
				var signedRequest = data.payload.response;
				var part = signedRequest.split('.')[1];
				//decode and save for this session.
				storage.sr = JSON.parse(Sfdc.canvas.decode(part));
				//publish an event to resize the outer frame, now that we're loaded.
				publish('cnvstart.resize');
				if (callback) {
						callback(storage.sr);
				}
			}
			else if(data.status===0 && callback){
				result = {
						'errorCode':'No response from Salesforce. Check Internet Connection.',
						'message':'No response from Salesforce. Check Internet Connection.',
					};
				callback(result);
				return;
			}
			else if (data.payload[0] && data.payload[0].errorCode && callback) {
				result = {
						'errorCode':data.payload[0].errorCode,
						'message':"Salesforce Error: " + cleanError(data.payload[0].message),
				};
				callback(result);
				return;
			}
		});
	}

	function querySalesforce(query, callback) {

		//clean our query
		var newQuery = query.replace(/( |\r|\n)/g, '+');

    //retrieve our url from the SR object
		var url = storage.sr.context.links.restUrl + "query/?q=" + newQuery;

		var sr = storage.sr;
		if(!storage.sr.client.oauthToken) {
			alert('Error: Access Token Not Available.');
			return;
		}

		//Make first call
    Sfdc.canvas.client.ajax(url, {
	    client: storage.sr.client,
	    success: function(data) {
		    if (data.status && data.payload) {
			    process(data);
		    }
		    else {
			    var result = {'payload':[
				    {
					    'errorCode':'No response from Salesforce. Check Internet Connection.',
					    'message':'No response from Salesforce. Check Internet Connection.',
				    }
			    ]};
			    callback(result);
			    return;
		    }
	    }
    });

	  function process(d) {
	    if (d.done === false) { //additional results initiate next call
		    var nUrl = d.nextRecordsUrl;
		    Sfdc.canvas.client.ajax(nUrl, {
			    client: sr.client,
			    success: function(data) {
						if (data.status && data.payload) {
					    process(data);
				    }
				    else {
					    var result = [
						    {
							    'errorCode':'No response from Salesforce. Check Internet Connection.',
							    'message':'No response from Salesforce. Check Internet Connection.',
						    }
					    ];
					    callBack(result);
					    return;
				    }
			    }
		    });
	    }
	    callback(d);
    }
  }

  function editSalesforce(object, request, callback) {

    var url;
		//if we have an id then remove from the object and save for our PATCH url
		var id = false;
    if(request.Id) {
      id = request.Id;
			delete request.Id;
		}
		//signed request for links and client
		var sr = storage.sr;
    //Make call
		//New Record
		if(!id) {
			url = sr.context.links.sobjectUrl + object + "/";
      Sfdc.canvas.client.ajax(url, {
	      client: sr.client,
	      contentType: "application/json",
	      method: 'POST',
	      data: JSON.stringify(request),
	      success: function(data) {
		      processPost(data);
	      }
      });
	  }
		//edit record
		else {
			url = sr.context.links.sobjectUrl + object + "/" + id + "/";
      Sfdc.canvas.client.ajax(url, {
	      client: sr.client,
	      contentType: "application/json",
	      method: 'PATCH',
	      data: JSON.stringify(request),
	      success: function(data) {
		      processPatch(data);
	      }
      });
		}

    function processPatch(result){
			if(result.status!==0 && !result.payload) {
	      //no errors
	      result = {
		      'Id': 'id',
	      };
			}
      else if(result.status===0) {
	     //no internet connection
	     //make our own error message
	     result = {
			  'errorCode':'No response from Salesforce. Check Internet Connection.',
			  'message':'No response from Salesforce. Check Internet Connection.',
			  };
		  }
			else {
				//salesforce error
			}
		  callback(result);
    }

		function processPost(result){
			if(result.status===201 && result.payload) {
				result = result.payload;
			}
			else if(result.status===0) {
			 //no internet connection
			 //make our own error message
			 result = {
				'errorCode':'No response from Salesforce. Check Internet Connection.',
				'message':'No response from Salesforce. Check Internet Connection.',
				};
			}
			callback(result);
		}
  }

	function deleteSalesforce(object, id, callback) {

		//sr and base url are in storage.
		var sr = storage.sr;
		var url = sr.context.links.sobjectUrl + object + "/" + id + "/";

		//Make call
		Sfdc.canvas.client.ajax(url, {
			client: sr.client,
			contentType: "application/json",
			method: 'DELETE',
			success: function(data) {
				checkResult(data);
			}
		});

		//internal callback for constructing return object.
		function checkResult(result) {
      if (result.status===0) {
				//no internet?
				result.payload=[
				  {
					  'errorCode':'No response from Salesforce. Check Internet Connection.',
					  'message':'No response from Salesforce. Check Internet Connection.',
					}
				];
		  }
			else if (result.status===204){
				result.payload=[
					{
						'success':true,
					}
				];
			}
			callback(result.payload);
		}
	}

	function navigate(id,url,newWindow) {
		if(id) {
			publish ( "cnvstart.navigate" , {
				'id':id,
				'url' : url,
				'new' : newWindow } );
		}
	}

	function publish(event, payload) {
		Sfdc.canvas.client.publish(storage.sr.client, {
			"name": event,
			"payload": payload,
		});
	}

  function login() {
		console.log('foo');
		loginAction();
	}

  function logout(loginPage) {
		//remove the token from the client object and the canvas object
		if(storage.sr && storage.sr.client) {
		  storage.sr.client.oauthToken='';
		}
		Sfdc.canvas.oauth.logout();
		if(loginPage) {
			window.location.assign('/oauth/sfOauth.html?loginUrl='+encodeURIComponent(storage.sr.context.links.loginUrl));
		}
	}

  function refresh(){
		window.location.assign('/index.html#/Overview');
    //Sfdc.canvas.oauth.childWindowUnloadNotification(hash);
	}

  //private functions

	function loginAction(consumerData) {

    var url;
		//retrieve our key if we don't have it
		if(!consumerData) {
			getConsumerData(loginAction);
			return;
		}

    //remove all currebt access tokens
		logout();

		//if loginUrl is a parameter, then we're in the oauth page and can use the parameter to determine our target
		var params = decodeURIComponent(location.search);
		if(params.indexOf('loginUrl')!==-1){
      url = decodeURIComponent(location.search.split("=")[1]);
		}
		else {
			//determine the url from the signed request
			url = storage.sr.context.links.loginUrl;
		}

		//if we don't get login.salesforce, then we're in a sandbox.
		if(url.indexOf('login.salesforce.com')!==-1) {
			url = "https://login.salesforce.com/services/oauth2/authorize";
		}
		else {
			url = "https://test.salesforce.com/services/oauth2/authorize";
		}
		//begin login/authorize process
		Sfdc.canvas.oauth.login(
			{uri : url,
				params: {
					response_type : "token",
					client_id : consumerData.key,
					redirect_uri : encodeURIComponent(consumerData.url)
			}});
	}

	function getConsumerData(callback) {
		var result;
    var request = new XMLHttpRequest();
		request.open('GET','/php/consumerData.php');
		//request.setRequestHeader('Content-Type','text/plain;charset=UTF-8');
		request.onreadystatechange = function(){
			if(request.readyState===4 && request.status===200) {
				result=JSON.parse(request.responseText);
				callback(result);
			}
		};
		request.send(null);
	}

}(
	//settings session storage for the signed request, etc.
	{}
));
