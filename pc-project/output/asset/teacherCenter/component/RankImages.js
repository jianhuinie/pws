define("teacherCenter/component/RankImages",function(){function e(e){$.extend(this,{enable:!1},e),this.init()}function t(e,t){var f=e.offset(),o={width:e.width(),height:e.height(),offsetTop:f.top,offsetLeft:f.left};if(t)o.offsetTop=f.top+t.offsetTop,o.offsetLeft=f.left+t.offsetLeft;return o}function f(e,t){for(var f,o,n=t[0].offset,s=n.width,i=n.height,a=t.length-1;a>=0;a--)if(f=t[a],o=f.offset,e.left+s/2>=o.offsetLeft&&e.top+i/2>=o.offsetTop)if(e.left+s/2<=o.offsetLeft+s&&e.top+i/2<=o.offsetTop+i)return f}function o(){var e=this,f=e.container,o={offsetTop:0,offsetLeft:0},n=e.containerSize=t(f,o),i={offsetTop:0-n.offsetTop,offsetLeft:0-n.offsetLeft},a=e.elementsOffset=[];$.each(f.find(e.elementSelector),function(e,f){{var o=$(f);o.offset()}o.attr("data-index",e),a.push({ele:o,offset:t(o,i)})}),f.css({position:"relative",height:n.height}),$.each(a,function(e,t){var f=t.offset;t.ele.css({position:"absolute",top:f.offsetTop,left:f.offsetLeft,zIndex:2})}),e.initElementsOffset=s(a)}function n(e){$.each(e,function(e,t){var f=t.offset;t.ele.css({top:f.offsetTop,left:f.offsetLeft}).data("index",e)})}function s(e){for(var t,f=[],o=0,n=e.length;n>o;o++)t=e[o],f.push({ele:t.ele,offset:$.extend({},t.offset)});return f}function i(e,t,f){var o,n=f[e],s=f[t];f[e]=s,f[t]=n,s.ele.data("index",e),n.ele.data("index",t),o=s.offset.offsetLeft,s.offset.offsetLeft=n.offset.offsetLeft,n.offset.offsetLeft=o,o=s.offset.offsetTop,s.offset.offsetTop=n.offset.offsetTop,n.offset.offsetTop=o}return e.prototype.init=function(){var e,t,n,s,a,r,l,p=this,d=p.elementSelector,c=["start","drag","end"];if(0==p.container.length)return!1;else return o.call(p),p.container.on("mousedown",d,function(f){var o,i;if(p.enable)n=$(this),o=n.data("index"),i=p.elementsOffset[o].offset,t=n.clone().html(""),t.css({border:"dotted 1px #aaa",width:n.width(),height:n.height(),zIndex:1}),n.parent().append(t),e=c[0],s=p.elementsOffset[o],r={x:f.pageX,y:f.pageY},l={left:i.offsetLeft,top:i.offsetTop},n.css("zIndex",3)}).on("drag",function(){return!1}).on("mousemove",function(t){if(p.enable){if(e===c[0])e=c[1];if(e===c[1]){var o,i={x:t.pageX-r.x,y:t.pageY-r.y};if(a)clearTimeout(a);a=setTimeout(function(){var e={left:l.left+i.x,top:l.top+i.y};if(n.css(e),o=f(e,p.elementsOffset)){if(o.ele.data("index")!=n.data("index"))o.ele.css({left:l.left,top:l.top});if(o!==s&&s.ele.data("index")!=n.data("index"))s.ele.css({left:s.offset.offsetLeft,top:s.offset.offsetTop});s=o}else if(s.ele.data("index")!=n.data("index"))s.ele.css({left:s.offset.offsetLeft,top:s.offset.offsetTop})},0)}}}).on("selectstart",function(){if(e===c[1])return!1;else return void 0}),void $("body").on("mouseup",function(){if(p.enable)if(e===c[1]){if(e=c[2],t.remove(),s)s.ele.css({left:l.left,top:l.top}),n.css({left:s.offset.offsetLeft,top:s.offset.offsetTop,zIndex:2}),i(n.data("index"),s.ele.data("index"),p.elementsOffset),p.onDrop(n,s.ele);else n.css({left:l.left,top:l.top,zIndex:2});clearTimeout(a)}})},e.prototype.enableRank=function(){this.enable=!0},e.prototype.disableRank=function(){this.enable=!1},e.prototype.getItemsInOrder=function(){return this.elementsOffset},e.prototype.resetOrder=function(){return this.elementsOffset=s(this.initElementsOffset),n(this.initElementsOffset),this.onReset(),this},e.prototype.onReset=function(){return this},e.prototype.onDrop=function(){return this},e});