var sUsername = new String(CurrentUser.user_logon.toLowerCase());
var sSpecificUsersOnly = '1'; // 0 = All CRM users can use the context menu / 1 = Only Specific users can use the context menu

function addOnloadHandler(newFunction) {    
    if (window.addEventListener) { // W3C standard
        window.addEventListener('load', newFunction, false); // NB **not** 'onload'
    }    
    else if (window.attachEvent) { // Microsoft
        window.attachEvent('onload', newFunction);
    }
}
	 
function CustomContextMenu(Arguments)
{    
    // Global variables
	//alert(">"+Arguments.Base);
	var Base = Arguments.Base ? Arguments.Base : document.documentElement;
	var Width = Arguments.Width ? Arguments.Width : 200;
	var FontColor = Arguments.FontColor ? Arguments.FontColor : 'black';
	var HoverFontColor = Arguments.HoverFontColor ? Arguments.HoverFontColor : 'white';
	var HoverBackgroundColor = Arguments.HoverBackgroundColor ? Arguments.HoverBackgroundColor : '#2257D5';
	var HoverBorderColor = Arguments.HoverBorderColor ? Arguments.HoverBorderColor : 'green';
	var ClickEventListener = Arguments.ClickEventListener ? Arguments.ClickEventListener : function(){ return false; };
	
    var ContextMenuDiv = document.createElement('div');
    var ContextMenuTable = document.createElement('table');
    var Index = 0;
    var EventHandlers = new Array();
	
	// Style Context Menu div
    ContextMenuDiv.id = 'ContextMenu'; 
    ContextMenuDiv.style.position = 'absolute';
    ContextMenuDiv.style.backgroundColor = 'white';
    ContextMenuDiv.style.border = '2px outset white';
    ContextMenuDiv.style.verticalAlign = 'top';
    ContextMenuDiv.style.textAlign = 'left';
	ContextMenuDiv.style.visibility = 'hidden';
	ContextMenuDiv.style.width = (Width + 11) + 'px';
	ContextMenuDiv.style.zIndex = '999';
	
	// Styles Context Menu table
	ContextMenuTable.id = 'ContextMenuTable'; 
	ContextMenuTable.style.width = (Width + 10) + 'px';
	ContextMenuTable.border = 0;
	ContextMenuTable.cellPadding = 0;
	ContextMenuTable.cellSpacing = 0;
	
	// Append Context Menu table into Context Menu div
	ContextMenuDiv.appendChild(ContextMenuTable);
	
	// Public method for adding Context Menu Items
	this.AddItem = function(imgSrc, itemText, isDisabled, commandName)
	{	    
		var Tr = ContextMenuTable.insertRow(Index++);
	    Tr.style.fontFamily = 'Calibri, Verdana, Arial';
	    Tr.style.fontSize = '10pt';
	    Tr.style.fontWeight = 'normal';
	    Tr.style.backgroundColor = 'white';
	    Tr.style.color = isDisabled ? 'gray' : FontColor;
	    Tr.style.cursor = 'default';
		
	    var TdLeft = Tr.insertCell(0);
	    TdLeft.style.width = 25 + 'px';
	    TdLeft.style.height = 25 + 'px';
	    TdLeft.style.textAlign = 'center';
	    TdLeft.style.verticalAlign = 'middle';
	    TdLeft.style.borderTop = '2px solid #E8E3DB';
	    TdLeft.style.borderBottom = '2px solid #E8E3DB';
	    TdLeft.style.borderLeft = '2px solid #E8E3DB';
	    TdLeft.style.backgroundColor = '#E8E3DB';
		
	    var TdCenter = Tr.insertCell(1);
	    TdCenter.style.width = 10 + 'px';
	    TdCenter.style.height = 25 + 'px';
	    TdCenter.innerHTML = '&nbsp;';
	    TdCenter.style.borderTop = '2px solid white';
	    TdCenter.style.borderBottom = '2px solid white';
		
	    var TdRight = Tr.insertCell(2);
	    TdRight.style.width = (Width - 25) + 'px';
	    TdRight.style.height = 25 + 'px';
	    TdRight.style.textAlign = 'left';
	    TdRight.style.verticalAlign = 'middle'; 
	    TdRight.style.fontStyle = isDisabled ? 'italic' : 'normal'; 
	    TdRight.innerHTML = itemText ? itemText : '&nbsp;';
	    TdRight.style.borderTop = '2px solid white';
	    TdRight.style.borderBottom = '2px solid white';
	    TdRight.style.borderRight = '2px solid white';
		
		if(imgSrc)
		{
	        var Img = new Image();	 
	        Img.id = 'Img';    
	        Img.src = imgSrc;
	        Img.style.width = 20 + 'px';	 
	        Img.style.height = 20 + 'px';	  
	        Img.disabled = isDisabled; 
			
	        TdLeft.appendChild(Img);	
	    }
	    else
	        TdLeft.innerHTML = '&nbsp;';
		
	    // Register events
	    if(!isDisabled)
		{	        
			WireUpEventHandler(Tr, 'click', function(){ ClickEventListener(Tr, {CommandName: commandName, Text: itemText, IsDisabled: isDisabled, ImageUrl: Img ? Img.src : ''}) });
			WireUpEventHandler(Tr, 'mouseover', function(){ MouseOver(Tr, TdLeft, TdCenter, TdRight); });
	        WireUpEventHandler(Tr, 'mouseout', function(){ MouseOut(Tr, TdLeft, TdCenter, TdRight); });
	    }
		else
	    {
			WireUpEventHandler(Tr, 'click', function(){ return false; });
	        WireUpEventHandler(TdRight, 'selectstart', function(){ return false; });
	    }
	}	
	
	// Public method for adding Separator Menu Items
	this.AddSeparatorItem = function()
	{
	    var Tr = ContextMenuTable.insertRow(Index++);
	    Tr.style.cursor = 'default';
	    
	    var TdLeft = Tr.insertCell(0);
	    TdLeft.style.width = 25 + 'px';
	    TdLeft.style.height = '1px';
	    TdLeft.style.backgroundColor = '#E8E3DB';
		
	    var TdCenter = Tr.insertCell(1);
	    TdCenter.style.width = 10 + 'px';
	    TdCenter.style.height = '1px';
	    TdCenter.style.backgroundColor = 'gray';
	    
	    var TdRight = Tr.insertCell(2);
	    TdRight.style.width = (Width - 25) + 'px';
	    TdRight.style.height = '1px';
	    TdRight.style.backgroundColor = 'gray';
	}
	
	// Public method for displaying Context Menu
	this.Display = function(e)
	{
		Base.clientHeight = document.body.scrollHeight; // JM - Override as oBase does not appear to cater for scrollable areas!
		
	    e = e ? e : window.event;	    
		
	    var xLeft = e.clientX;
		if(xLeft + ContextMenuDiv.offsetWidth > Base.offsetWidth) {
			xLeft = Base.offsetWidth - ContextMenuDiv.offsetWidth;
		}

		var yTop = e.pageY;
		var nHiddenTop = document.body.scrollTop;
		var nTopPlusOffset = yTop + ContextMenuDiv.offsetHeight;
		nTopPlusOffset = (nTopPlusOffset - ContextMenuDiv.offsetHeight);

	    ContextMenuDiv.style.visibility = 'hidden';
	    ContextMenuDiv.style.left = xLeft + 'px';
        ContextMenuDiv.style.top = yTop + 'px';
        ContextMenuDiv.style.visibility = 'visible';
		
        return false;
	}	
	
	// Public method to hide context Menu
	this.Hide = function()
	{
		ContextMenuDiv.style.visibility='hidden';
	}
	
	// Public method Dispose
	this.Dispose = function()
	{
	    while(EventHandlers.length > 0)
	        DetachEventHandler(EventHandlers.pop());
			
	    document.body.removeChild(ContextMenuDiv);
	}
	
	// Public method GetTotalItems
	this.GetTotalItems = function()
	{
	    return ContextMenuTable.getElementsByTagName('tr').length;
	}
	
	// Mouseover event handler
	var MouseOver = function(Tr, TdLeft, TdCenter, TdRight)
	{	
	     Tr.style.fontWeight = 'bold';
	     Tr.style.color = HoverFontColor;
	     Tr.style.backgroundColor = HoverBackgroundColor;
			
	     TdLeft.style.borderTopColor = HoverBorderColor;
	     TdLeft.style.borderBottomColor = HoverBorderColor;
	     TdLeft.style.borderLeftColor = HoverBorderColor;
	     TdLeft.style.backgroundColor = HoverBackgroundColor;
			
	     TdCenter.style.borderTopColor = HoverBorderColor;
	     TdCenter.style.borderBottomColor = HoverBorderColor;
	        
	     TdRight.style.borderTopColor = HoverBorderColor;
	     TdRight.style.borderBottomColor = HoverBorderColor;
	     TdRight.style.borderRightColor = HoverBorderColor;
	}
	
	// Mouseout event handler
	var MouseOut = function(Tr, TdLeft, TdCenter, TdRight)
	{	
	     Tr.style.fontWeight = 'normal';
	     Tr.style.color = FontColor;
	     Tr.style.backgroundColor = 'white';
	        
	     TdLeft.style.borderTopColor = '#E8E3DB';
	     TdLeft.style.borderBottomColor = '#E8E3DB';
	     TdLeft.style.borderLeftColor = '#E8E3DB';
	     TdLeft.style.backgroundColor = '#E8E3DB';
			
		 TdCenter.style.borderTopColor = 'white';
	     TdCenter.style.borderBottomColor = 'white';
			
	     TdRight.style.borderTopColor = 'white';
	     TdRight.style.borderBottomColor = 'white';
	     TdRight.style.borderRightColor = 'white';
	}
	
	// Private method to wire up event handlers
	var WireUpEventHandler = function(Target, Event, Listener)
	{
	    // Register event
	    if(Target.addEventListener)	   
			Target.addEventListener(Event, Listener, false);	    
	    else if(Target.attachEvent)	   
			Target.attachEvent('on' + Event, Listener);
	    else 
	    {
			Event = 'on' + Event;
			Target.Event = Listener;	 
		}
		
	    // Collect event information through object literal
	    var EVENT = { Target: Target, Event: Event, Listener: Listener }
	    EventHandlers.push(EVENT);
	}
	
	// Private method to detach event handlers
	var DetachEventHandler = function(EVENT)
	{
	    if(EVENT.Target.removeEventListener)	   
			EVENT.Target.removeEventListener(EVENT.Event, EVENT.Listener, false);	    
	    else if(EVENT.Target.detachEvent)	   
	        EVENT.Target.detachEvent('on' + EVENT.Event, EVENT.Listener);
	    else 
	    {
			EVENT.Event = 'on' + EVENT.Event;
			EVENT.Target.EVENT.Event = null;	 
	    }
	}
	
	// Add Context Menu div on the document
	document.body.appendChild(ContextMenuDiv);
	
	// Register events
	WireUpEventHandler(Base, 'click', this.Hide);
	WireUpEventHandler(ContextMenuDiv, 'contextmenu', function(){ return false; });
}

var oCustomContextMenu = null;
var oBase = null; 
var oID = null;


if(sSpecificUsersOnly=='1'){
   // Make the context menu available to specific CRM user accounts only		
   if(sUsername=="admin" || sUsername=="julianm"){
	addOnloadHandler(addSpecifics);	
   }	
}
else {
   // All users get the context menu
   addOnloadHandler(addSpecifics);
}
	
	
function addSpecifics() {
	var id;
	if (document.getElementById("EWARE_MID")) {
		id = document.getElementById("EWARE_MID");
	}
	else {
		if(document.body){
			id = document.body;
		}
	}

	if(id){
		var html = id.innerHTML;	
		var formName = "EntryForm";
		var eleID = "";
		var eleName = "";
		var eleType = "";
		var ele = document.forms[formName].elements;

		for (i=0; i < ele.length; i++){
			if(ele[i].id){eleID = ele[i].id;}
			if(ele[i].name){eleName = ele[i].name;}
			if(ele[i].type){eleType = ele[i].type;}
			
			// DO NOT process any of the following:-
			//    hidden
			//    select-one
			if ((ele[i].type.toLowerCase() != 'hidden') && (ele[i].type.toLowerCase() != 'select-one')) { 
				ele[i].setAttribute("oncontextmenu", "if(this.id){setContextID(this.id);oCustomContextMenu.Display(event);} return false;");
			}	
		}
		
		var script = document.createElement('script');
		var jsCode = String("");
		
		jsCode += "	var Arguments = {";
		jsCode += "		Base: oBase,";
		jsCode += "		Width: 125,";
		jsCode += "		FontColor: null,";
		jsCode += "		HoverFontColor: null,";
		jsCode += "		HoverBackgroundColor: null,";
		jsCode += "		HoverBorderColor: null,";
		jsCode += "		ClickEventListener: OnClick};";
		jsCode += "	oCustomContextMenu = new CustomContextMenu(Arguments);";
		// Adding the icons as embedded base64 data allows us to not rely on external paths etc... 
		jsCode += "	oCustomContextMenu.AddItem('data:image/gif;base64,R0lGODlhgACAAMQQAMryheT4wrDsSPL84L3vZ5znGvj98KLoKtD0lKnqOdf1o8Twduv60bbtWN73spXlC////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjUzRDcwOTcxREQxNUU2MTE4RjE0OTI0NzYyNzI3QTc0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI0ODg1NUFEMUI3NjExRTY5NjRBQjRCNTBBRjNBRkZEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI0ODg1NUFDMUI3NjExRTY5NjRBQjRCNTBBRjNBRkZEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUuMSBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjJFNkE4MEI3NjFCRTYxMTg2MjNGOTA0RDI3NUJFM0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTNENzA5NzFERDE1RTYxMThGMTQ5MjQ3NjI3MjdBNzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAAQACwAAAAAgACAAAAF/yAkjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq32DIEsAsDtArIBhpUaQCwEh4d6zW6zBQKAQjw+Bs7uvH7/iDvqQA4EBXyFhm0CCAOAOAYAaYeRkg8JiowyjoSTm5KVi5csCJqcpJINCqAoDAmlrZsFC5+pEAqjrreRAqigBLi+mwexJKIABlAGDb/KmwkLj2sBTwasy9WkAlC91tuT0U4L3OGH2E4O4ud83kwGtujufU/a1XANXgBncOjqSwO/BwQI9rEIoADPMnJN5JU6AIDOjTvUbglM0q/VgV09BjwrhZAJgFYLjAkJkIzTxCQRN/9hJDJAoaGO/EqtNDKgpCGHTBSQWtAkAKQ9BKCAAybt4x5ZTQRwQhDFZ56gUNodQupkmhuqTEhRsboGKhStZNhgjcnJCiSvXznhjAJpbFZODao4+EdFphWRUloxnbXkJycBJ/kKUeoqmAO8goMY9VVAgDMHgRPXCHAugQACXLK4lbxC6js4mANG5uzy3Z7GmAMgTkzZNKcC9damSun61anVgMzVvkVg9BTCu10lmGllgOfgwHw/QYDcVwPcU0o3f/2nDu3pO+twxd4KbRXp3CV5pyIqfKm9YwYANz9JNpn17A0dgE4GfHw3AFIZQHD9PpsCm91VUH/3jTcLAw4AQID/AMc1VwB9kg1AEBdwNIgOepy1IGEAXDQgAIHLJJBhIwEkuKA1AY44AwMD+kKcijpoZKEhPMEIBDKtwGRjD/YVUgAUCLwoBYiFSENIXGPoBFYTRuk4RSlPQHIAIFA2oaQa7kVRJRMpIWnFlkq0xoaQ5YCZhE1jfncNExXlgeETbW5iYBE9CpCiEfBJ8qYR7PiY3zet3PkDc4dclJNFTPglXzFI9GjIn0lcKWd1IxE51RJ5TlIAAZTywICjh3iJhJi4NIBAljAYoIClkij3A6iv+YGqCVgAwOokcw4RZzgHwGEPF/hwA+ASQ/n3y55F9Gmsc0wQuuwtCUA4hKLPvjarixCSVmttEw4QkkA0DmSqrRsJXEuEqiW0NO4eAkgL5wIz3lcAsnchQK2xdibmAJr3ATbiAPbG5++ODCxwK6/C7JguAvyeE4y5CnPYQLyk/KOAoAqbIKGCDJKC2hfuZiwDA1r82oVoEIus8sost+zyyzDHLPPMNNds880456zzzjz37PPPQAct9NA7hgAAOw==', 'Sentence Case', false, 'Sentence Case');";
		jsCode += "	oCustomContextMenu.AddItem('data:image/gif;base64,R0lGODlhgACAALMPALDsSMryheT4wpznGvj98Ov60df1o6LoKr3vZ/L84KnqObbtWN73stD0lJXlC////yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMzg2MThCRDE1REMxMUU2ODJGNUI5NThBRDI1OEM4MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMzg2MThCRTE1REMxMUU2ODJGNUI5NThBRDI1OEM4MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUzODYxOEJCMTVEQzExRTY4MkY1Qjk1OEFEMjU4QzgzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUzODYxOEJDMTVEQzExRTY4MkY1Qjk1OEFEMjU4QzgzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAADwAsAAAAAIAAgAAABP/wyUmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwajx2BIIF8FQSFmcOBaLoUDoDUMSBYV4WpVjZ1BL4qgHg7baBNBER5HCtPB4C8fs/v+/+AgYKDenZZbIaJiouMjY6PkIt0MJGVlpeYj5MvmZ2en42bLqCkpZ2iLaaqq46oLKywsWtksrWmriu2uqC4Kru/mb0pwMSVwijFya2Iys1zzM7NxyfR1Ye01tKIAAxeLGqYZywJBgfP2Asw4JfiLQTm13VTTC/rlu0tBrPy6eqZ+C0GxIMRIICAGPYqAWRhIICBNxoSRloI8YZESBQr1rj4KKPGGRz/HXn8iPAfyRwhG4086SIlo5Usv5mMuXEmTZA2b5YMpxMnz5472QENem+ov59GW7hcBDOpiKWKmjoFATWR1Kkeqhq6ipWDVjtcu0bMKbbE1zJhy144OyWt2gpszbw1EdftXAl175LIq/cp2b4d+AL+IHhw4L+GMxROPBYp48ZCH29YLNkC5coULmPGi3jzA82bQWMWXZm0ZNOPUTNWnZi1YdeDYQOW3Ze2Xtt3cc/V/Za3Wt9lgYsV3pU4VuNTkTtVnpS5UedDoQOV3lMgpiqeLZzKXkFApy7cJRDA0gl79nK8DmIuYL3UAczeV60nRD9P+Pv48+vfz7+///8ABijgCoAEFmjggQhiFgEAOw==', 'Title Case', false, 'Title Case');";
		jsCode += "	oCustomContextMenu.AddItem('data:image/gif;base64,R0lGODlhgACAAMQQALDsSOT4wsryhfj98Ov60b3vZ5znGqLoKtf1o6nqOdD0lMTwdvL84N73srbtWJXlC////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRDE1MUM1NTE1REMxMUU2QTMzODkyMTYzODZGMTE5OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRDE1MUM1NjE1REMxMUU2QTMzODkyMTYzODZGMTE5OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJEMTUxQzUzMTVEQzExRTZBMzM4OTIxNjM4NkYxMTk4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJEMTUxQzU0MTVEQzExRTZBMzM4OTIxNjM4NkYxMTk4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAEAAsAAAAAIAAgAAABf8gJI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4PBzASibz+i0es1uqxeCuCIQ0AIe+Lx+z+/7/4CBewAFCARUDoKKi4yNewcFh1EBd46Wl5gPBwoDUQiZoKGBBgpRCaKoqXkJkk0CqrCoAk4KsbagBZ1LAbe9lwm6Sby+xIwAu8XJigVKw8rPfg3C0NR8BsFFztXbzEfa29WtRN/g0A7emEIMdA0CBaepDEbki0kDCJWgs9npuwagB+b1WzIAHiZxQegpckLgH6ZS4wYyqYXpXMRLUA5gCnjREpRXEhOGXMIgU50hCgX/RdF46aSQlIGi5HPkUiRGKDMb1QQCE5BMTDt/9Pzzs2VHR6aAHm0EZYDJpYygfMKEjedIJTmZQq3nZOifY1sXNimYaQG/m0wKgJIWViVBtZkMCER75B7LTN3axixCIICArErPWnJDuPAtjoLLUUOATjE1sHMdP0OIUvKzfY0tE0vQTDOxa5093zJAObHoVKSZeD3NCFiT1awFme0aOxSAoKFrD8aNTDejAwtKv/Yd6IADBcKfwC5nwEycBrypLNcjZhrd6np9Yo+MdLvpqN6zEw1f+Tp5H9PznH95db2O9HjcWzUvPwf8B/XRt89f4z5/Hv79995+AsYQYIE3HIhgd38ELtiCgg7KAGGEMExIoQsWXshChhqqwGGHKHwIogkijkhCiSaKgGKKK5o4lSXypLgCSJZEJ6MIgCmC2Y0mvGhJajySwABccQlQVYpEosIYjzlismOKZBQm5ZJBVmnllVhmqeWWXHbp5ZdghinmmGSWaeaZXIYAADs=', 'Proper Case', false, 'Proper Case');";
		jsCode += "	oCustomContextMenu.AddItem('data:image/gif;base64,R0lGODlhgACAAMQQAOT4wsryhbDsSPj98JznGtf1o73vZ7btWOv60cTwdqLoKtD0lKnqOd73svL84JXlC////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMUM3NUJGNTE1REMxMUU2OUZDM0Y4OUExNjgxQzU0MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMUM3NUJGNjE1REMxMUU2OUZDM0Y4OUExNjgxQzU0MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYxQzc1QkYzMTVEQzExRTY5RkMzRjg5QTE2ODFDNTQyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYxQzc1QkY0MTVEQzExRTY5RkMzRjg5QTE2ODFDNTQyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAEAAsAAAAAIAAgAAABf8gJI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHY7LAi+4LB4TE4wE+S0GqwLPN7wuHxOFzAF9Lwerlvs/3QHTAeAhQ8EOw4GhnsHCE4AeIxzCgU+CASTcpZRBZpwBkEJn28MVAykA0EApA8BVG6adkEIrQtUfpqCQq0AVKyar7ykvlPAk8JBvb+fyUDLxs1D0FLHjM4/1FHWhtg+2lDchd494E/igOQ85pDSw5/F1e7KxMzB0/XR9++a8dvzz/LJ20cPnj1k+AzqQ8hvkr9wALMJ/EcwoMKBDAv2O3gt4caFHRsyengu4reJECv/SrxIMaPFjxhDanTIsZtHmiBtijREsp3KkyxTulwJs6XMlzhj6pw5sua4m01zPt1ZqGcTdH/U7WB31WQ5lCV/fg0adijQokKPEk1qdCnSqEqnMuXpNB1UulLtUgVklQnWPVp1cPXrdR1Yn2bHoi2r9uwkTlJyJTZcmEmsyVtJBVZyubFizEs6u13ruYlouW9HPzmtdy5qKKyz3i0UasoisZRlUZEEOkerWVJQ4c5Miorm2YUcSHFwXAhvTZCfeCLb4/mk2lBuL+4xqpWqJwMyffoeRHLlI7EBEfkLiAD5JeFJAQ8yoNWb+UoIkcIuRIH9B/whkR4g0QWhXSsBFtFd/yvKEdHAf/e9J8QA+rWigBH1QXhIgT8UIJ59ZhhRIYSVAOGFhg88YsR0KB6SgIo4IJCAfyiaggSNLb5BwAELACDhCgMAsMABH7bIYRc56vGFAQE06WSTBnyRJCVL4DjllfY1sAR7WHapxy5LLOjlmHu454R1ZKapI4xMDCCcmnBqCYWbcKZJgJxSHFjnlAqwKUUDRe6J4gE/SjGAnoK2cicXkSSqaACFYoEAoo7qQQCkXJwwwAJvVjrHAUdmWoIDC6ApKKiRiorCAA0EIECgXe4YQF+qvuAAAAFEaaV9DAiQwKyp1qoDAMS2+uSxThILgJ/CNuvss9BGK+201FZr7Rm12Gar7bbcduvtt+CGK+645JZr7rnoZhoCADs=', 'Upper Case', false, 'Upper Case');";	
		jsCode += "	oCustomContextMenu.AddItem('data:image/gif;base64,R0lGODlhgACAAMQQALDsSOT4wtf1o8ryhev60aLoKsTwdtD0lKnqOfL84LbtWJznGr3vZ973svj98JXlC////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTQ4NzhBNTE1REMxMUU2QjU4MzkxMTRBOTUzOEZCMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTQ4NzhBNjE1REMxMUU2QjU4MzkxMTRBOTUzOEZCMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFNDg3OEEzMTVEQzExRTZCNTgzOTExNEE5NTM4RkIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFNDg3OEE0MTVEQzExRTZCNTgzOTExNEE5NTM4RkIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAEAAsAAAAAIAAgAAABf8gJI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrM8A6Hq/4LBYoEUCHui0es1uD8pHRXtOVx/gx8C5zkcPEnhJAn10CwSBSwiEbQaISwOLbAGOSgeRa4eUSAGXappJnJ1on5uio6RGoaKoqaYPrEWqnbBEspe0Q7aRuEK6i7xBvoTAQMJ9xD/GfMg+ynXMPc500DzSc9Q71m3YOtps3Dnea+A44p7kNuZp6Omu7DXqp+8y8a/z9O73MfX6+/n9LvgBDPhv4AqBBg8WTIgCIcOGCx+WcChxYsSKIihizHgRo8aNHz12rBiS5EiJJVHnnnyYkuVKhi1hvkwYk+ZMgzVx3hyYk+dOgD2B/uwXlOhQfUWRHr2XlOnSeU2hPn0XlepUdlUFDSAD6iqSBQ8AKMl6ZFDYsV6LOCiARmxXU2UaKGqL1pXdu67clsLLty8fvXn8Ch6cBnArwoj5Go6VuLHdxbUcS+4EOdfky4Qq98LMmY7mIJY6i1bzGQik0ahL/9iDWrTqHmZbuz6SgIHs1EZs38ZdhPXuzq9zcBFDvLjx48iTH2dLemONBHLoOq8xN/j0E6GsXzfBVvt2EgQCZPpOvrz58+jTq1/Pvr379/Djy59Pn0QIADs=', 'Lower Case', false, 'Lower Case');";
		// jsCode += "	oCustomContextMenu.AddSeparatorItem();";
		// jsCode += "	oCustomContextMenu.AddItem(null, 'Browser Menu', false, 'Browser Menu');";
		jsCode += "	oCustomContextMenu.AddSeparatorItem();";
		jsCode += "	oCustomContextMenu.AddItem(null, 'Clear', false, 'Clear');";
		jsCode += "	oCustomContextMenu.AddSeparatorItem();";
		jsCode += "	oCustomContextMenu.AddItem(null, 'Cancel', false, 'Cancel');";
		jsCode += "";	
		script.text = jsCode;
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	else {
		alert("No EWARE_MID or DOCUMENT.BODY");
	}			
	// **************************************
			
}
		
var OnClick = function(Sender, EventArgs)
{		
	switch(EventArgs.CommandName)
	{
		case 'Sentence Case':
			if(oID){
				document.getElementById(oID).value = toSentenceCase(trimStr(document.getElementById(oID).value));
			}
			break;				
		case 'Title Case':
			if(oID){
				document.getElementById(oID).value = trimStr(document.getElementById(oID).value).toTitleCase();
			}
			break;			
		case 'Proper Case':
			if(oID){
				document.getElementById(oID).value = toProperCase(trimStr(document.getElementById(oID).value));
			}
			break;
		case 'Upper Case':
			if(oID){
				document.getElementById(oID).value = trimStr(document.getElementById(oID).value).toUpperCase();
			}				
			break;
		case 'Lower Case':
			if(oID){
				document.getElementById(oID).value = trimStr(document.getElementById(oID).value).toLowerCase();
			}						
			break;
		case 'Clear':
			if(oID){
				document.getElementById(oID).value = "";
			}						
			break;			
		case 'Cancel':
		   break;
	}
	
	document.getElementById(oID).focus(); // Finally puts focus back into the field
	oCustomContextMenu.Hide();   
}

window.onunload = function(){ oCustomContextMenu.Dispose(); }

function setContextID(id){
	if(id){
		oID = id;
	}
}
		
function toProperCase(str)
{
	return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); // Proper Case
}

function toSentenceCase(str)
{
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function trimStr(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

String.prototype.toTitleCase = function() {
	var i, j, str, lowers, uppers;
	str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});

	// Certain minor words should be left lowercase unless they are the first or last words in the string
	lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With', 'Is'];
	for (i = 0, j = lowers.length; i < j; i++)
		str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
		function(txt) {
			return txt.toLowerCase();
	});

	// Certain words such as ID or any ACRONYMS should be converted to upper case
	uppers = ['Crm', 'Id', 'Tv'];
	for (i = 0, j = uppers.length; i < j; i++)
	str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
	uppers[i].toUpperCase());

	return str;
}

// ******************************************************
// **************** Copy/Paste Functions ****************
// ******************************************************
//function getSelectionText(){
//    var selectedText = ""
//    if (window.getSelection){ // all modern browsers and IE9+
//        selectedText = window.getSelection().toString()
//    }
//    return selectedText
//}
//function copySelectionText(id){
//    var copySuccess;
//    try{
//        copySuccess = document.getElementById(id).execCommand("copy");
//    } catch(e){
//        copySuccess = false
//    }
//	alert(copySuccess);
//    return copySuccess
//}
// ******************************************************