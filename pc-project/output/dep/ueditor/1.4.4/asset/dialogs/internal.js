!function(){var e=window.parent;if(dialog=e.$EDITORUI[window.frameElement.id.replace(/_iframe$/,"")],editor=dialog.editor,UE=e.UE,domUtils=UE.dom.domUtils,utils=UE.utils,browser=UE.browser,ajax=UE.ajax,$G=function(e){return document.getElementById(e)},$focus=function(e){setTimeout(function(){if(browser.ie){var t=e.createTextRange();t.collapse(!1),t.select()}else e.focus()},0)},utils.loadFile(document,{href:editor.options.themePath+editor.options.theme+"/dialogbase.css?cache="+Math.random(),tag:"link",type:"text/css",rel:"stylesheet"}),lang=editor.getLang(dialog.className.split("-")[2]),lang)domUtils.on(window,"load",function(){var e=editor.options.langPath+editor.options.lang+"/images/";for(var t in lang["static"]){var o=$G(t);if(o){var a=o.tagName,i=lang["static"][t];if(i.src)i=utils.extend({},i,!1),i.src=e+i.src;if(i.style)i=utils.extend({},i,!1),i.style=i.style.replace(/url\s*\(/g,"url("+e);switch(a.toLowerCase()){case"var":o.parentNode.replaceChild(document.createTextNode(i),o);break;case"select":for(var s,r=o.options,l=0;s=r[l];)s.innerHTML=i.options[l++];for(var n in i)"options"!=n&&o.setAttribute(n,i[n]);break;default:domUtils.setAttributes(o,i)}}else;}})}();