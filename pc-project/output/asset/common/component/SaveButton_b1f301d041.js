define('common/component/SaveButton_b1f301d041',['require'],function(){'use strict';function t(t){$.extend(this,t),this.init();}return t.prototype={init:function(){var t=this,n=t.element,e=n.html();if('BUTTON'!==n.prop('tagName'))throw new Error('SaveButton 必须使用 button 标签');var i=function(){var i=t.save();if(i)n.focus(),n.prop('disabled',!0),n.html(t.saveText||'正在保存...'),i.always(function(){setTimeout(function(){n.prop('disabled',!1),n.html(e);},10);});return!1;};if(n.click(i),t.form)t.form.submit(function(){return i(),!1;});}},t;});