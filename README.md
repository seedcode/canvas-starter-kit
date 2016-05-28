# Canvas Starter Kit
This kit is designed for Javascript developers who want to build a Salesforce app using the Force.com Canvas Framework. It can serve as starting point or template for building your own Canvas app and publishing it as a Managed Package on the AppExchange.

### We've been there!
This kit is the result of our journey bringing our [DayBack Web App](http://DayBack.Com) to the Salesforce [AppExchange](https://appexchange.salesforce.com/listingDetail?listingId=a0N30000000qp64EAA). We learned a lot during this experience, some things easy, some things a little harder and wanted to share those with people who are where we were when we started. We also wanted to provide a simpler "Hello World" Experience for prospective Canvas users. The Java example provided by Salesforce is very good, but a little complicated for Javascript folks (like us) who are maybe a little more comfortable with a simple PHP page than a full Java web app.

### Help us out!
Although we are very pleased with how we incorporated our app using the techniques in this kit, we're sure there are better methods we missed (or mis-understood). Please Contribute!

### What's in the kit?
##### Package Components:
- Visualforce Code for creating a Canvas app in a VF page
- Static Resource Javascript that provides:
  - Resizing your Canvas app within the tab
  - Navigation in Salesforce from the Canvas app
  - A template for publishing and subscribing to events between the VF page and the Canvas app
  - Functionality across VF, Lightning and SF1
- Static Resource CSS for optimizing the Visualforce page in the Tab for VF, Lightning and SF1.
- Apex Classes that allow an Org to use its own Static Resource in an installed Managed Package.

##### App Components:
- [The Salesforce Canvas Javascript SDK](https://github.com/forcedotcom/SalesforceCanvasJavascriptSDK)
- A basic PHP page for authenticating your Canvas app with Salesforce
- A basic OAuth.html page for when users must self-authorize
- A basic callback.html page for OAuth handling
- Simplified Javascript functions for handling
  - OAuth
  - CRUD with Salesforce data
  - Publishing and subscribing to events between the VF page and the Canvas app
- A sample Angular app with simple examples of the functionality for re-engineering

##### Managed Package:
We put together a Managed Package of the Sample Angular app with all of the above components so you can see how it works completed. We wanted to provide this as an Unmanaged Package, but Connected/Canvas apps are not permitted in Unmanaged Packages. The Managed Package Components are all in this repository and we have step by step instructions, below, for re-building the App that you can turn into your own Managed Package. Install links for the Managed Package:

- [Production Install](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t36000000xjk4)
- [Sandbox Install](https://test.salesforce.com/packaging/installPackage.apexp?p0=04t36000000xjk4)

### Building the Kit in Your Org

##### A Hosted App
The idea behind Canvas is that you have an existing Web App you'd like to bring into Salesforce, so presumably your app is currently already hosted. Salesforce does require https for your app to work in Canvas. You can get around this a little bit in development by making a browser exception to the PHP endpoint, but not with the OAuth callback endpoint.
If you are starting from the very beginning, than [Heroku](https://www.heroku.com/) and [Appfog](https://www.ctl.io/appfog/) are excellent services for hosting your app, and Salesforce provides a [Heroku Quickstart](https://developer.salesforce.com/docs/atlas.en-us.salesforce1api.meta/salesforce1api/heroku_quick_start.htm) path for developers.

The only server technology the kit requires is PHP. Once your hosting is set up, deploy the whole kit, except for the packageComponents folder. You can now set up the components in your Salesforce Developer Org.

##### Adding the Package components
You will need to do this in a Salesforce Development Org. Only Development orgs can create Canvas apps and Managed Packages. We recommend going ahead and setting up a [namespace prefix](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_namespace_prefix.htm) for your org now, if you don't already have one. You can't do Unmanaged Packages with Canvas, and you need the prefix for the managed one.

Please follow the following steps in order to re-create the kit app in your org.

1. **Set Up the Canvas App**
  1. Go To SetUp / Create / apps
  2. Scroll Down to Connected Apps and click New
  3. Name your App and fill in the other required fields in the top section
  4. Enable OAuth Settings
    1. For the Callback URL specify **https:/<yourdomain>/oauth/callback.html**
    2. Enable OAuth Scopes. If you're not sure what to do here, we recommend starting with **Access and manage your data** and **Access your basic information**
  5. Skip down to the Canvas App Settings and check Force.com Canvas
    1. For the Canvas App URL, enter **https:/<yourdomain>/php/canvas.php**
    2. For Access Method, choose **Signed Request (POST)**
    3. For Locations, choose (at least) **Visualforce Page**
  6. Click Save
  7. You will now be brought to the Detail Page. From here please copy the following three values. We need to add these to our PHP pages to allow the handshaking between our app and Canvas:
    1. **Consumer Key**
    2. **Consumer Secret** (You need to click to reveal it)
    3. **Callback URL**

2. **Add App Consumer Data to PHP Pages**
  1. In the Hosted app find the [canvas.php](https://github.com/seedcode/canvas-starter-kit/blob/master/php/canvas.php) and the [consumerData.php](https://github.com/seedcode/canvas-starter-kit/blob/master/php/consumerData.php) pages in the app's php folder.
  2. In the canvas.php page enter the consumer secret on line 10 in the spot reserved by _&lt;consumer secret for your connected/canvas app&gt;_.
  3. In the consumerData.php file enter your consumer key on line 2 in the spot reserved by _&lt;consumer key for your connected/canvas app&gt;_.
  4. In the consumerData.php file enter your callback URL on line 3 in the spot resrerved by _&lt;callback url for your connected/canvas app&gt;_.

3. **Create the Custom Setting**
    1. Go To SetUp/Develop/Custom Settings
    2. Click New
    3. Name the Custom Setting Definition **alternateJavascript**
    4. Setting Type should be **Hierarchy**
    5. Visibility should be **public**
    6. Description should be "The name of an alternate javascript file for use by the canvas visualforce page."
    7. Click Save
    8. Now click New in the Custom Fields section
    9. Name the Field Resource Name
    10. Set the Type to Text and give it a length of 100
    11. Click Save

4. **Upload the Static Resources**
  1. Go To SetUp/Develop/Static Resources
  2. Click New
  3. Name the Static Resource **canvasStatic** and upload the [canvas-static.js](https://github.com/seedcode/canvas-starter-kit/blob/master/packageComponents/staticresources/canvas-static.js) file from the [packageComponents/staticrecources/](https://github.com/seedcode/canvas-starter-kit/tree/master/packageComponents/staticresources) folder
  4. Find the [styles](https://github.com/seedcode/canvas-starter-kit/tree/master/packageComponents/staticresources/styles) folder in the same [packageComponents/staticrecources/](https://github.com/seedcode/canvas-starter-kit/tree/master/packageComponents/staticresources) folder and zip it
  5. Once the styles folder is zipped create a new static resource named **style_reources** and upload the zipped folder to this resource.

5. **Create the Apex Classes**
  1. Go To SetUp/Develop/Apex Classes
  2. Click New
  3. Paste in the contents of the [AlternateResource.apex](https://github.com/seedcode/canvas-starter-kit/blob/master/packageComponents/apexClasses/AlternateResource.apex) file
  4. Click Save
  5. Managed Packages require [75% Testing Coverage](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_testing_best_practices.htm), so repeat the above steps for the [AlternateResourceTest.apex](https://github.com/seedcode/canvas-starter-kit/blob/master/packageComponents/apexClasses/AlternateResourceTest.apex) file for this coverage.
  6. You can then click Run Test from the Test Class. (Hopefully it passes!)
  7. If you've set up your development org prefix, then add it to the appropriate spot in both classes.
    1. In [AlternateResource.apex](https://github.com/seedcode/canvas-starter-kit/blob/master/packageComponents/apexClasses/AlternateResource.apex), change lines 7 and 12 to pre='<yourprefix__>'
    2. In [AlternateResourceTest.apex](https://github.com/seedcode/canvas-starter-kit/blob/master/packageComponents/apexClasses/AlternateResourceTest.apex) do the same for lines 13 and 23
  8. Run the test again (just to be sure!)

6. **Create the Visualforce page**
  1. Go To SetUp/Develop/Visualforce Pages
  2. Click New
  3. Name the page **Canvas Starter**
  4. Click the checkbox for **Available for Salesforce mobile apps and Lightning Pages**
  5. In the code section paste in the contents of our [Canvas_Starter.vf](https://github.com/seedcode/canvas-starter-kit/blob/master/packageComponents/Canvas_Starter.vf) page.
  6. Click Save
  7. In the Visualforce Page List View, click on Security and enable the Profiles that have access to this page.

7. **Create the Visualforce Tab**
  1. Go To SetUp/Create/Tabs
  2. Click New in the Visualforce Tab section
  3. Name the Tab **Canvas Starter**
  4. Select a Tab style
  5. Click Save

##### You should now be able to access the app as a Visualforce tab in Visualforce or Lightning!

[![Hello](images/vf.png)](images/vf.png)

### Javascript Function Reference

_coming soon!_
