var d = window.opener.a11ypi.init();
alert("hell");
x = document.getElementById('id2');
alert(x.value);
// function richEdit() {
//     tinyMCE.init({
//             // General options
//     mode : "exact",
//     elements : "id2",
//     theme : "simple",
//     skin : "o2k7",
//     plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,inlinepopups,autosave",

//     // Theme options
//     //theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
//     //theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
//     //theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
//     //theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak,restoredraft",
//     theme_advanced_toolbar_location : "top",
//     theme_advanced_toolbar_align : "left",
//     theme_advanced_statusbar_location : "bottom",
//     theme_advanced_resizing : "true"
// });
// }
// function content() {
// p = window.opener.document.getElementById(temp.id);
// q = document.getElementById('div2');
// q.innerHTML = p.innerHTML;
// }

// function shalini() {
// x = window.opener.document.getElementById('dummy');
// y = document.getElementById('id2');
// document.getElementById('div2').style.display = "none";
// document.getElementById('aud').disabled = true;
// y.innerHTML = x.innerHTML;
// richEdit();
// }

// function check() {
//     if (document.getElementById('ip_bro').checked == true) {
//       document.form1.browse.disabled = true;
//       document.form1.url.disabled = false;
//       document.form1.browse.value = "";
//    }
//   else {
//       document.form1.browse.disabled = false;
//       document.form1.url.disabled = true;
//       document.form1.url.value = "";
//    }
// }

// function audio_call() {
// x = document.getElementById('id2');
// document.getElementById('div2').style.display = "none";
// x.innerHTML = "<form name='form1' method='POST' action='' enctype='multipart/form-data'><input id='ip_bro' name='aud_nar' type='radio' onClick='check()'/><label>Audio URL Path</label>&nbsp;&nbsp;<input name='url' type='url' value='' disabled/><br><br><input name='aud_nar' type='radio' onClick='check()'checked='checked'/><label>From Computer</label>&nbsp;&nbsp;<input name='browse' type='file' name='myfile' value='' /><br><br><input type='submit' /></form>";
// document.getElementById('txt').disabled = true;
// }

// function lan() {
// if (document.getElementById('lang').value.length >= "3") {
// document.getElementById('div3').style.display = "block";
// }
// else {
// alert("Please enter not less than 3 characters");
// }
// }