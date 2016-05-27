//local javascript VF Page.

/*

The MIT License (MIT)

Copyright (c) 2016 SeedCode

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

var cnv = (function() {
	"use strict";

	var config;
	//Get the initial window height so this works correctly on mobile.
	var initialWindowHeight = window.innerHeight;

	//Public methods
	return {
		subscribe: subscribe,
		init: init,
		resize: resize,
		publish: publish,
	};

	//publish to canvas
  function publish(eventName, payload) {
	Sfdc.canvas.controller.publish(
		{
			name : eventName,
			payload : payload,
		}
	);
}


	//Use the cnv.publish(<eventname>,<payload>) to call these events from your canvas app.
	function subscribe() {
		Sfdc.canvas.controller.subscribe(
			[
				//this allows us to publish a resize event from within dayback
				{
					"name": "cnvstart.resize",
					"onData": function(e) {
						resize(e);
					}
				},
				{
	       "name": "cnvstart.navigate",
	       "onData": navigate,
       },

				//#############################################################
				//#############################################################
				//#############################################################
				//add your event subscription events here separated by commas
				//Use a unique name with the dbk prefix
				//follow the syntax from the above events

























	    //#############################################################
			] //end array of subscriptions
		);
	}




	//!!You shouldn't need to edit below this line!!

	function init(initialConfig) {

		//Assign config to global var
		config = initialConfig;

		//Resize our view so the iframes are sized correctly
		resize();

		//Add resize event listener
		window.addEventListener("resize", function() {
			resize();
		});
	}

	//function for resizing canvas in vf page.
	//Called after load and resize from vf page.

	function resize(e) {
		var height, target;

		//If we are on mobile web we don't want to run
		//resize as there is a salesforce bug currently
		if (isMobileWeb()) {
			//Mobile web site
			height = getMobileHeight();
		}
		else if (isMobileOne()) {
			//Mobile app
			height = getMobileHeight();
		}
		else if (isLightningDesktop()) {
			//Lightning Desktop
			height = window.innerHeight;
		}
		else {
			//Desktop
			height = getHeight();
		}

		target = {
			"canvas": "cnvstart"
		};

		Sfdc.canvas.controller.resize({
			"height": height + "px"
		}, target);

		//Returns the height we would like to set the iframe height to
		function getHeight() {
			var headerElement, footerElement, bodyElement, bodyOffset, height;
			try {
				headerElement = document.querySelector(".bPageHeader");
				footerElement = document.querySelector(".bPageFooter");
				bodyElement = document.querySelector(".bodyDiv");
				bodyOffset = bodyElement.offsetHeight - bodyElement.clientHeight;

				height = window.innerHeight - headerElement.offsetHeight - footerElement.offsetHeight - bodyOffset;
			}
			catch(error) {
				height = window.innerHeight - 132;
			}
			return height;
		}

		//Returns the height we would like to set the iframe height to on mobile devices
		function getMobileHeight() {
			var height = initialWindowHeight;
			return height;
		}
	}

	//Functions to determine what platform we are running on
	function isClassicDesktop() {
		var theme = config.theme;
		return theme === 'Theme1' || theme === 'Theme2' || theme === 'Theme3';
	}

	function isLightningDesktop() {
		var theme = config.theme;
		return theme === 'Theme4d';
	}

	function isMobileOne() {
		var theme = config.theme;
		return theme === 'Theme4t';
	}

	//Check if we are on the mobile lightning sites
	function isMobileWeb() {
		var url = window.location.href;
		var matchString = "Host=web";
		return url.indexOf(matchString) > -1;
	}

	function navigate (e) {
		var newTab = e.new;
		var url = e.url;
		var id = e.id;
		var view = e.view;
		if(!url && id) {
			url="/"+id;
		}
		if( ( isLightningDesktop() || isMobileOne() ) && id ){
			if(view){
				sforce.one.navigateToSObject(id,view);
			}
			else {
				sforce.one.navigateToSObject(id);
			}
		}
		else if (newTab && url) {
			window.open(url);
		}
		else if(url) {
			window.location.assign(url);
		}
	}

}());
