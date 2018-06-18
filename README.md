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

# How to Implement

1)  Decide whether you need to make the context menu available to *all* users or just a specific list of usernames

2)  Login to the Sage CRM Server with local administrative privilages

3)  Download the JavaScript file called zInputContextMenu.js to your Desktop.

    Please Note: - The filename is prefixed with the letter 'z' to ensure that when Sage CRM loads it's libraries

4)  Make any changes you need to the file and when ready place it in the following location: -

    [Base CRM Installation Location]/CRM/WWWRoot/js/custom/
  
    <h6>Example</h6>
    <img src="https://github.com/julianmummery/sagecrm-context-menu/blob/master/contextMenuSetup.png">
  
 5)  In order to make the changes take effect, all users must logout of Sage CRM and then log back in again
 
 Please note: - By making changes to the JavaScript file and if it is already running in a LIVE environment. Users may also have to clear their browsers *cache*

