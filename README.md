# Sage CRM Context Menu
Implements a customisable right-click context menu to all editable form fields withing Sage CRM.

I original wrote this functionality because I was getting tired of manually correcting capitalisation in datafields.

It can be extended by a JavaScript Developer to add other menu items. All of which can be made available to **all** users or you can specify a list of usernames that will get the context menu served to their browsers. 

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


<h5>Title Case - Result</h5>

<img src="https://github.com/julianmummery/sagecrm-context-menu/blob/master/contextMenuAfterClick.png">

# How to Implement

1)  Decide whether you need to make the context menu available to **all** users or just a specific list of usernames

2)  Login to the Sage CRM Server with local administrative privilages

3)  Download the JavaScript file called **zInputContextMenu.js** to your Desktop.

    **Please Note: -** The filename is prefixed with the letter **'z'** to ensure that when Sage CRM loads it's libraries alphabetically it will get to our custom .JS file last. When extending any platform you would be wise to treat the core systems files as a dependency, so by loading it at the end we mitigate any risk of browser loading syntax errors!  

4)  Make any changes you need to the file and when ready place it in the following location: -

    **[Base CRM Installation Location]/CRM/WWWRoot/js/custom/**
  
    <h5>Example</h5>
    
    <img src="https://github.com/julianmummery/sagecrm-context-menu/blob/master/contextMenuSetup.png">
  
 5)  In order to make the changes take effect, all users must logout of Sage CRM and then log back in again
 
     **Please note: -** By making changes to the JavaScript file and if it is already running in a LIVE environment. Users may also have to clear their browser **cache**


# Points of Interest

1)  The variable called **sSpecificUsersOnly** is being set on line 2 of the .JS code file. This may need to be changed! By default it is set to **'1'** which is set to only allow the 'admin' user access to the right-click context menu. This is intentional as a lot of these Sage CRM systems being worked on in **LIVE** environments. Change this value from **'1'** to **'0'** when you want to allow **all** users access to the context menu

    **<h5>Example</h5>**
    var sSpecificUsersOnly = '1'; // 0 = All CRM users can use the context menu / 1 = Only Specific users can use the context menu


2)  Adding the context menu icons as **embedded base64 data allows** us to not rely on external paths etc...
    Normal images can easily be converted and implemented into the existing code using an **online base64 image converter**


If you would like to take a look at my other Projects / Examples please use the following link: -
<a shref="https://julianmummery.github.io" target="_blank">https://julianmummery.github.io</a>
