//alipi
var a11ypi = {
    auth : " ",
    loc:" ",
    elementTagName: " ",
    elementId: " ",
    onLoad: function() {
    // initialization code
	this.initialized = true;
	this.strings = document.getElementById("a11ypi-strings");
	gBrowser.addEventListener('contextmenu', a11ypi.captureElement, false);
    },
    captureElement : function(e)
    {
	elementId = e.originalTarget.id;
	elementTagName = e.originalTarget.tagName;
    },

    test:function(e)
    {
	if(e.originalTarget instanceof HTMLDocument)
	{
	    if(content.window.location.href != 'about:blank' || content.window.location.href != 'about:config')
	    {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
		    if(xhr.readyState == 4)
		    {
			if(xhr.responseText == "None")
			{
			   
			}
			else
			{
			    var message = 'Re-narration available';
			    var nb = gBrowser.getNotificationBox();
			    var n = nb.getNotificationWithValue('re-narration available');
			    if(n) 
			    {
				n.label = message;
			    } 
			    else 
			    {
				// var buttons = [{
				// 	label: 'Button',
				// 	accessKey: 'B',
				// 	popup: '',
				// 	callback: null
				// }];
				
				const priority = nb.PRIORITY_INFO_HIGH;
				nb.appendNotification(message, 're-narration available',
						      'chrome://browser/skin/Info.png',
						      priority);
			    }
			}
		    }
		};
		xhr.open("POST","http://localhost/menu",true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(String(content.window.location.href));
	    }
	}    
    },

   testContext : function()
    {
	document.getElementById('thepanel').openPopup(document.getElementById('addon-bar'),'after_start'); //Opens the panel at the bottom of the screen
	divs = content.document.getElementsByTagName("*");
	for(i=0; i<divs.length; i++) {
	    if(divs[i].tagName != "HTML" && divs[i].tagName != "LINK" && divs[i].tagName != "SCRIPT" && divs[i].tagName != "META" && divs[i].tagName != "BODY" && divs[i].tagName != "IMG" && divs[i].m4pageeditcontrol != "true" && divs[i].tagName != "BUTTON") {
                divs[i].setAttribute("m4pageedittype","text");
            }
            else if(divs[i].tagName == "IMG") {
                divs[i].setAttribute("m4pageedittype","image")
            }
        }
        var v = content.document.getElementsByTagName("head");
        var a = content.document.createElement("script");
        c = v[0].appendChild(a);
       // c.setAttribute("src","http://x.a11y.in/alipi/page_edit.js");
       // c.setAttribute("type","text/javascript");
    },
    

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
    getIndex : function (currentNode)
    {
    	var kids = currentNode.parentNode.childNodes;
    	var j = 0;
    	for(var i=0; i< kids.length; i++)
    	    {
    		if (currentNode.nodeName == kids[i].nodeName)
    		    j++;
    		if (currentNode == kids[i]) 
    		    {
    			return j; 
    		    }
    		else 
    		    continue;
    	    }
    	return -1;
    },

    makePath : function (currentNode){
	var path = '';
	while(! currentNode.id)
	    {
		index = a11ypi.getIndex(currentNode);
		//alert(index); // 
		path = currentNode.tagName+'['+index+']/'+path;
		currentNode = currentNode.parentNode;
	    }
	path = '//'+currentNode.tagName+'[@id='+"'"+currentNode.id+"'"+']/'+path;
	path = path.substring(0, path.length -1);
	return path;
    },
    
    getxPath : function ()
    {
	var doc = content.document;
	//we get the selections 
	var selection =  content.window.getSelection();
	var str = '';
	//for every range in the selection
	for (var i = 0; i < selection.rangeCount; i++) {
	    var currentNode = selection.getRangeAt(i).commonAncestorContainer;
	    var path = '';
	    var index = -1;
	    
	    if (currentNode.nodeName != "#text"){
		path = a11ypi.makePath(currentNode);
	    }
	    else{ 
		path = a11ypi.makePath(currentNode.parentNode);
		 }
	    
	    alert ("xpath\n"+path);
	    var nodes = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE,null);
	    try{
		var result = nodes.iterateNext();
		while (result)
		    {
			alert(result.textContent);
			alert ("result\n"+str);
			result=nodes.iterateNext();
		    }
	    }
	    catch (e)
		{
		    dump( 'error: Document tree modified during iteration ' + e );
		}
	}
    },
    
    

    onMenuPopUp: function(e) {
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"] //The service branch which handles the "Window".
	    .getService(Components.interfaces.nsIWindowMediator);
	var recentWindow = wm.getMostRecentWindow("navigator:browser");
	a11ypi.ajax(content.window.location);
	return "True";
    },
    createMenu: function(menu_list) {
	var xyz = document.getElementById("menu-button");
	for(var i in menu_list)
	{
	    var newel = document.createElement("menuitem");
	    newel.setAttribute("label",menu_list[i]);
	    newel.setAttribute("value",menu_list[i]);
	    newel.setAttribute("oncommand","a11ypi.getURL(event.target);");
	    xyz.appendChild(newel);
	}
    },
    clearMenu: function() {
	var xyz = document.getElementById("menu-button");
	while(null!= xyz.firstChild)
	{
	    xyz.removeChild(xyz.firstChild);
	}
    },
    ajax: function(url) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
	    if(xhr.readyState == 4)
	    {
	
		if(xhr.responseText == 'empty')
		{
		    a11ypi.clearMenu();
		    alert("no re-narration available for this web page");
		}
		else
		{
			
		    a11ypi.createMenu(JSON.parse (xhr.responseText));
		}
	    }
	}
	xhr.open("POST","http://localhost/menu",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(String(url));
    },
    //Yass


    evaluate: function(path,newContent){
	//evaluate the path
	var nodes = content.document.evaluate(path, content.document, null, XPathResult.ANY_TYPE,null);
	try{
	    var result = nodes.iterateNext();
	    while (result)
		{
		    if (result.nameTag == "img" || result.nameTag =='IMG'){
			result.setAttribute('src',newContent);
		    }
		    else{
			result.textContent = newContent;
		    }
		    result=nodes.iterateNext();
		}
	}
	catch (e)
	    {
		dump( 'error: Document tree modified during iteration ' + e );
	    }
    },
    
    getURL: function(e) {
	//var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
	//var recentWindow = wm.getMostRecentWindow("navigator:browser");
	//recentWindow ? recentWindow.content.document.location : null;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
	    if(xhr.readyState == 4)
		{
		    if(xhr.responseText =='empty')
			{
			    a11ypi.clearMenu();
			    alert("An internal server error occured, please try later.");
			}
		    else
			{
			    
			    d ={}
			    var response=xhr.responseText.substring(3).split('###');
			    for (var j= 0; j< response.length ; j++){
				chunk = response[j].substring(1).split('&');
				
				for (var i= 0; i< chunk.length ; i++){
				    pair =chunk[i].split("::");
				    key = pair[0];
				    value = pair[1];
				    d[key] = value;
				}
			    path = d['xpath'];
			    newContent = d['data'];
			    a11ypi.evaluate(path,newContent);
			    }
			}
		}
	}
	var url = content.window.location;
	var lang=e.getAttribute("value");
	var data="url="+encodeURIComponent(url)+"&lang="+encodeURIComponent(lang);
	
	xhr.open("POST","http://localhost/replace",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(data);//
	
	///content.window.location = "http://localhost/replace?url="+url+"&lang="+e.getAttribute("value");
	//content.window.reload();
    },
};
window.addEventListener("load", function () { a11ypi.onLoad(); }, false);
gBrowser.addEventListener("DOMContentLoaded", a11ypi.test, false);
