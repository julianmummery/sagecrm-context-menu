# Sage CRM Context Menu
Implements a customisable right-click context menu to all editable form fields withing Sage CRM.

I original wrote this functionality because I was getting tired of manually correcting capitalisation in datafields.

It can be extended by a JavaScript Developer to add other menu items. All of which can be made available to *all* users or you can specify a list of usernames that will get the context menu served to their browsers. 

Here is a custom JavaScript file that can be extended with your own functionality.

Currently implements: -

<ul>
  <li>Sentance Case</li>
  <li>Title Case</li>
  <li>Proper Case</li>
  <li>Upper Case</li>
  <li>Lower Case</li>
  <li>Clear</li>
  <li>Cancel</li>
</ul>

<img src="https://github.com/julianmummery/sagecrm-context-menu/blob/master/SageCRM-Context-Menu-Example.png">
<br/>
# How to Implement
<br/>
1)  Decide whether you need to make the context menu available to *all* users or just a specific list of usernames

2)  Login to the Sage CRM Server with local administrative privilages

3)  Download the JavaScript file called zInputContextMenu.js and place it in the following location: -

    [Base CRM Installation Location]/CRM/WWWRoot/js/custom/
  
    <h6>Example</h6>
    <img src="https://github.com/julianmummery/sagecrm-context-menu/blob/master/contextMenuSetup.png">
  
  

