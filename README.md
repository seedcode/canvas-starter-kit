# Canvas Starter Kit
This kit is designed for Javascript developers who want to build a Salesforce app using the Force.com Canvas Framework. It can serve as starting point or template for building your own Canvas app and publishing it as a Managed Package on the AppExchange.

### We've been there!


### What's in the kit?
##### Package Components:
- Visualforce Code for creating a Canvas app in a VF page
- Static Resource Javascript that provides:
  - Resizing your Canvas app within the tab
  - Navigation in Salesforce from the Canvas app
  - A template for publishing and subscribing to events between the VF page and the Canvas app
  - Functionality across VF, Lightning and SF1
- Static Resource CSS for optimizing the Visualforce page in the Tab for VF, Lightning and SF1.
- Apex Classes that allow an Org to use it's own Static Resource in an installed Managed Package.

##### App Components:
- A basic PHP page for authenticating your Canvas app with Salesforce
- A basic OAuth.html page for when users must self-authorize
- A basic callback.html page for OAuth handling
- Javascript functions for handling
  - OAuth
  - CRUD with Salesforce data
  - Publishing and subscribing to events between the VF page and the Canvas app
- A sample Angular app with simple examples of the functionality for re-engineering

##### Managed Package:
We put together a Managed Package of the Sample Angular app with all of the above components so you can see how it works completed. We wanted to provide this as an Unmanaged Package, but Connected/Canvas apps are not permitted in Unmanaged Packages. The Managed Package Components are all in this repository and we have step by step instructions for re-building the App that you can turn into your own Managed Package. Install links for the Managed Package:

- [Production Install](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t36000000xjk4)
- [Sandbox Install](https://test.salesforce.com/packaging/installPackage.apexp?p0=04t36000000xjk4)
