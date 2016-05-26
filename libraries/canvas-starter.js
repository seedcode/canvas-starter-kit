var cnv = (function(storage) {
	'use strict';
	return {

		initialize: initialize,
		publish: publish,
		getSRData: getSRData,

	};

  //initialization function requests the signed request and stores it for the session
	function initialize(callback) {

		//we are logged in and can retrieve and decode our signed request for our calls to salesforce.
		Sfdc.canvas.client.refreshSignedRequest(function(data) {
			if (data.status === 200) {
				var signedRequest = data.payload.response;
				var part = signedRequest.split('.')[1];
				//decode and save for this session.
				storage.sr = JSON.parse(Sfdc.canvas.decode(part));
				//publish an event to resize the outer frame, now that we're loaded.
				publish('cnv.resize');
				callback(storage.sr);
			}
			else if(data.status===0){
				result = {
						'errorCode':'No response from Salesforce. Check Internet Connection.',
						'message':'No response from Salesforce. Check Internet Connection.',
					};
				callback(result);
				return;
			}
			else if (data.payload[0] && data.payload[0].errorCode) {
				result = {
						'errorCode':data.payload[0].errorCode,
						'message':"Salesforce Error: " + cleanError(data.payload[0].message),
				};
				callback(result);
				return;
			}
		});
	}

  //general purpose publish function for publishing events to the parent window/salesforce
	//these events must be set up as subscriptions in the static resource.
	function publish(event, payload) {
		Sfdc.canvas.client.publish(storage.sr.client, {
			"name": event,
			"payload": payload,
		});
	}

  function getSRData(object) {
		return storage[object];
	}

	function getKey() {

	}

}(
	//settings session storage for the signed request, etc.
	//enter your consumer key
	{

	}
));
