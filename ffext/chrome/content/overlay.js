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
		xhr.open("POST","http://devel.virtual-labs.ac.in/alipi/menu",true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(String(content.window.location.href));
	    }
	}    
    },
    testContext : function()
    {
        var el = content.document.createElement('iframe');
	var sel = content.window.getSelection(); //.getRangeAt(0).cloneContents();
	var temp = sel.focusNode;
	if(elementTagName != 'IMG')
	{
	    if(sel.focusNode.parentNode.id == '' || sel.focusNode.parentNode.id == 'undefined')
	    {
		while(temp.parentNode.tagName != 'BODY')
		{
		    temp = temp.parentNode;
		    if(temp.id)
		    {
			var st = content.document.getElementById(temp.id);
			st.style.borderColor = "red";
			st.style.borderStyle = "dotted";
			if(confirm("This is the selection you have made for re-narration.  Do you want to expand the selection?"))
			{
			    st.style.borderColor = "";
			    st.style.borderStyle = "";
			    continue;
			}
			else
			{
			    x = content.document.getElementById(temp.id).appendChild(el);
			    el.setAttribute('src',"http://devel.virtual-labs.ac.in/alipi/rich/index.html?parent="+encodeURIComponent(content.window.location.href)+"&id="+temp.id);
			    tName = content.document.getElementById(temp.id).tagName
			    el.setAttribute('id','MyFrame');
			    el.setAttribute('width','100%');
			    g = temp.innerHTML.replace('<iframe id="MyFrame" src="http://devel.virtual-labs.ac.in/alipi/rich/index.html?parent='+encodeURIComponent(content.window.location.href)+'&amp;id='+temp.id+'" width="100%"></iframe>','');
			    h = g.replace(/\s{2,}/g,"");
			    alert("You Have selected "+h);
			    f = el.contentDocument.getElementById('richText');
			    if( tName == 'UL' || tName == 'OL')
			    {
				f.innerHTML = '<' + tName.toLowerCase() +'>' + h + '</' + tName.toLowerCase() +'>' ;
			    }
			    else 
			    {
				f.innerHTML = content.document.getElementById(temp.id).innerHTML;
			    }

			    content.document.getElementById('MyFrame').scrollIntoView();
			    break;
			}
		    }
		}
	    }
	    else
	    {
		var st = content.document.getElementById(temp.parentNode.id);
		content.document.getElementById(temp.parentNode.id).appendChild(el);
		el.setAttribute('src',"http://devel.virtual-labs.ac.in/alipi/rich/index.html?parent="+encodeURIComponent(content.window.location.href)+"&id="+st.id);
		el.setAttribute('id','MyFrame');
		el.setAttribute('width','100%');
		st.style.borderColor = "red";
		st.style.borderStyle = "dotted";
		g = st.innerHTML.replace('<iframe id="MyFrame" src="http://devel.virtual-labs.ac.in/alipi/rich/index.html?parent='+encodeURIComponent(content.window.location.href)+'&amp;id='+st.id+'" width="100%"></iframe>','');
		alert("You have selected the below content for re-narration"+g);
		f = el.contentDocument.getElementById('richText');
		f.innerHTML = g;
		a = content.document.getElementById('MyFrame');
		a.scrollIntoView();
	    }
	}
	else
	{
	    var st = content.document.getElementById(elementId);
	    content.document.getElementsByTagName('BODY')[0].appendChild(el);
	    el.setAttribute('src',"http://devel.virtual-labs.ac.in/alipi/rich/indeximg.html?parent="+encodeURIComponent(content.window.location.href+"&id="+elementId));
	    el.setAttribute('id','MyFrame');
	    el.setAttribute('width','100%');
	    st.style.borderColor = "red";
	    st.style.borderStyle = "dotted";
	    alert("You have selected an image for replacment <img src="+'"'+content.document.getElementById(elementId).src+'"</img>');   
	    a = content.document.getElementById('MyFrame');
	    a.scrollIntoView();
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
		if(xhr.responseText == "None")
		{
		    a11ypi.clearMenu();
		}
		else
		{
		    a11ypi.createMenu(JSON.parse(xhr.responseText));
		}
	    }
	}
	xhr.open("POST","http://devel.virtual-labs.ac.in/alipi/menu",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(String(url));
    },
    getURL: function(e) {
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"] //The service branch which handles the "Window".
	    .getService(Components.interfaces.nsIWindowMediator);
	var recentWindow = wm.getMostRecentWindow("navigator:browser");
	recentWindow ? recentWindow.content.document.location : null;
	var url = content.window.location;
	content.window.location = "http://devel.virtual-labs.ac.in/alipi/replace?url="+url+"&lang="+e.getAttribute("value");
	content.window.reload();
    },
};
window.addEventListener("load", function () { a11ypi.onLoad(); }, false);
gBrowser.addEventListener("DOMContentLoaded", a11ypi.test, false);