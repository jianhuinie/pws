!function(t){function i(t,i,e){for(var o=4,a=[];o--;)a[o]=Math.round(i.rgba[o]+(t.rgba[o]-i.rgba[o])*(1-e));return"rgba("+a.join(",")+")"}var e,o=t.Axis,a=t.Chart,n=t.Point,r=t.Pointer,l=t.each,s=t.extend,h=t.merge,p=t.pick,m=t.numberFormat,d=t.getOptions(),c=t.seriesTypes,u=d.plotOptions,f=t.wrap,x=t.Color,g=function(){};d.mapNavigation={buttonOptions:{align:"right",verticalAlign:"bottom",x:0,width:18,height:18,style:{fontSize:"15px",fontWeight:"bold",textAlign:"center"}},buttons:{zoomIn:{onclick:function(){this.mapZoom(.5)},text:"+",y:-32},zoomOut:{onclick:function(){this.mapZoom(2)},text:"-",y:0}}},t.splitPath=function(t){var i;for(t=t.replace(/([A-Za-z])/g," $1 "),t=t.replace(/^\s*/,"").replace(/\s*$/,""),t=t.split(/[ ,]+/),i=0;i<t.length;i++)if(!/[a-zA-Z]/.test(t[i]))t[i]=parseFloat(t[i]);return t},t.maps={},f(o.prototype,"getSeriesExtremes",function(t){var i,e,o=this.isXAxis,a=[];l(this.series,function(t,i){if(t.useMapGeometry)a[i]=t.xData,t.xData=[]}),t.call(this),i=p(this.dataMin,Number.MAX_VALUE),e=p(this.dataMax,Number.MIN_VALUE),l(this.series,function(t,n){if(t.useMapGeometry)i=Math.min(i,t[o?"minX":"minY"]),e=Math.max(e,t[o?"maxX":"maxY"]),t.xData=a[n]}),this.dataMin=i,this.dataMax=e}),f(o.prototype,"setAxisTranslation",function(t){var i,o,a,n=this.chart,r=n.plotWidth/n.plotHeight,l=this.isXAxis,s=n.xAxis[0];if(t.call(this),"map"===n.options.chart.type&&!l&&s.transA!==e)this.transA=s.transA=Math.min(this.transA,s.transA),i=(s.max-s.min)/(this.max-this.min),a=i>r?this:s,o=(a.max-a.min)*a.transA,a.minPixelPadding=(a.len-o)/2}),f(a.prototype,"render",function(i){var e=this,o=e.options.mapNavigation;if(i.call(e),e.renderMapNavigation(),o.zoomOnDoubleClick)t.addEvent(e.container,"dblclick",function(t){e.pointer.onContainerDblClick(t)});if(o.zoomOnMouseWheel)t.addEvent(e.container,void 0===document.onmousewheel?"DOMMouseScroll":"mousewheel",function(t){e.pointer.onContainerMouseWheel(t)})}),s(r.prototype,{onContainerDblClick:function(t){var i=this.chart;if(t=this.normalize(t),i.isInsidePlot(t.chartX-i.plotLeft,t.chartY-i.plotTop))i.mapZoom(.5,i.xAxis[0].toValue(t.chartX),i.yAxis[0].toValue(t.chartY))},onContainerMouseWheel:function(t){var i,e=this.chart;if(t=this.normalize(t),i=t.detail||-(t.wheelDelta/120),e.isInsidePlot(t.chartX-e.plotLeft,t.chartY-e.plotTop))e.mapZoom(i>0?2:.5,e.xAxis[0].toValue(t.chartX),e.yAxis[0].toValue(t.chartY))}}),f(r.prototype,"init",function(t,i,e){if(t.call(this,i,e),e.mapNavigation.enableTouchZoom)this.pinchX=this.pinchHor=this.pinchY=this.pinchVert=!0}),s(a.prototype,{renderMapNavigation:function(){var t,i,e,o=this,a=this.options.mapNavigation,n=a.buttons,r=function(){this.handler.call(o)};if(a.enableButtons)for(t in n)if(n.hasOwnProperty(t))e=h(a.buttonOptions,n[t]),i=o.renderer.button(e.text,0,0,r).attr({width:e.width,height:e.height}).css(e.style).add(),i.handler=e.onclick,i.align(s(e,{width:i.width,height:i.height}),null,"spacingBox")},fitToBox:function(t,i){return l([["x","width"],["y","height"]],function(e){var o=e[0],a=e[1];if(t[o]+t[a]>i[o]+i[a])if(t[a]>i[a])t[a]=i[a],t[o]=i[o];else t[o]=i[o]+i[a]-t[a];if(t[a]>i[a])t[a]=i[a];if(t[o]<i[o])t[o]=i[o]}),t},mapZoom:function(t,i,e){if(!this.isMapZooming){var o,a=this,n=a.xAxis[0],r=n.max-n.min,l=p(i,n.min+r/2),s=r*t,h=a.yAxis[0],m=h.max-h.min,d=p(e,h.min+m/2),c=m*t,u=l-s/2,f=d-c/2,x=p(a.options.chart.animation,!0),g=a.fitToBox({x:u,y:f,width:s,height:c},{x:n.dataMin,y:h.dataMin,width:n.dataMax-n.dataMin,height:h.dataMax-h.dataMin});if(n.setExtremes(g.x,g.x+g.width,!1),h.setExtremes(g.y,g.y+g.height,!1),o=x?x.duration||500:0)a.isMapZooming=!0,setTimeout(function(){a.isMapZooming=!1},o);a.redraw()}}}),u.map=h(u.scatter,{animation:!1,nullColor:"#F8F8F8",borderColor:"silver",borderWidth:1,marker:null,stickyTracking:!1,dataLabels:{verticalAlign:"middle"},turboThreshold:0,tooltip:{followPointer:!0,pointFormat:"{point.name}: {point.y}<br/>"},states:{normal:{animation:!0}}});var y=t.extendClass(n,{applyOptions:function(i,e){var o=n.prototype.applyOptions.call(this,i,e);if(o.path&&"string"==typeof o.path)o.path=o.options.path=t.splitPath(o.path);return o},onMouseOver:function(){clearTimeout(this.colorInterval),n.prototype.onMouseOver.call(this)},onMouseOut:function(){var t=this,e=+new Date,o=x(t.options.color),a=x(t.pointAttr.hover.fill),r=t.series.options.states.normal.animation,l=r&&(r.duration||500);if(l&&4===o.rgba.length&&4===a.rgba.length)delete t.pointAttr[""].fill,clearTimeout(t.colorInterval),t.colorInterval=setInterval(function(){var n=(new Date-e)/l,r=t.graphic;if(n>1)n=1;if(r)r.attr("fill",i(a,o,n));if(n>=1)clearTimeout(t.colorInterval)},13);n.prototype.onMouseOut.call(t)}});c.map=t.extendClass(c.scatter,{type:"map",pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},colorKey:"y",pointClass:y,trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:g,supportsDrilldown:!0,getExtremesFromAll:!0,useMapGeometry:!0,init:function(i){var o,a,n,r,s,h,p,d,u,f,x=this,g=i.options.legend.valueDecimals,y=[],b="horizontal"===i.options.legend.layout;if(t.Series.prototype.init.apply(this,arguments),h=x.options.colorRange,p=x.options.valueRanges)l(p,function(i){if(a=i.from,n=i.to,o="",a===e)o="< ";else if(n===e)o="> ";if(a!==e)o+=m(a,g);if(a!==e&&n!==e)o+=" - ";if(n!==e)o+=m(n,g);y.push(t.extend({chart:x.chart,name:o,options:{},drawLegendSymbol:c.area.prototype.drawLegendSymbol,visible:!0,setState:function(){},setVisible:function(){}},i))}),x.legendItems=y;else if(h){if(a=h.from,n=h.to,r=h.fromLabel,s=h.toLabel,u=b?[0,0,1,0]:[0,1,0,0],!b)f=r,r=s,s=f;d={linearGradient:{x1:u[0],y1:u[1],x2:u[2],y2:u[3]},stops:[[0,a],[1,n]]},y=[{chart:x.chart,options:{},fromLabel:r,toLabel:s,color:d,drawLegendSymbol:this.drawLegendSymbolGradient,visible:!0,setState:function(){},setVisible:function(){}}],x.legendItems=y}},drawLegendSymbol:c.area.prototype.drawLegendSymbol,drawLegendSymbolGradient:function(t,i){var e,o,a,n,r,l=t.options.symbolPadding,s=p(t.options.padding,8),h=this.chart.renderer.fontMetrics(t.options.itemStyle.fontSize).h,m="horizontal"===t.options.layout,d=p(t.options.rectangleLength,200);if(m)e=-(l/2),o=0;else e=-d+t.baseline-l/2,o=s+h;if(i.fromText=this.chart.renderer.text(i.fromLabel,o,e).attr({zIndex:2}).add(i.legendGroup),a=i.fromText.getBBox(),i.legendSymbol=this.chart.renderer.rect(m?a.x+a.width+l:a.x-h-l,a.y,m?d:h,m?h:d,2).attr({zIndex:1}).add(i.legendGroup),n=i.legendSymbol.getBBox(),i.toText=this.chart.renderer.text(i.toLabel,n.x+n.width+l,m?e:n.y+n.height-l).attr({zIndex:2}).add(i.legendGroup),r=i.toText.getBBox(),m)t.offsetWidth=a.width+n.width+r.width+2*l+s,t.itemY=h+s;else t.offsetWidth=Math.max(a.width,r.width)+l+n.width+s,t.itemY=n.height+s,t.itemX=l},getBox:function(t){var i=Number.MIN_VALUE,e=Number.MAX_VALUE,o=Number.MIN_VALUE,a=Number.MAX_VALUE;l(t||this.options.data,function(t){for(var n=t.path,r=n.length,l=!1,s=Number.MIN_VALUE,h=Number.MAX_VALUE,p=Number.MIN_VALUE,m=Number.MAX_VALUE;r--;)if("number"==typeof n[r]&&!isNaN(n[r])){if(l)s=Math.max(s,n[r]),h=Math.min(h,n[r]);else p=Math.max(p,n[r]),m=Math.min(m,n[r]);l=!l}t._maxX=s,t._minX=h,t._maxY=p,t._minY=m,i=Math.max(i,s),e=Math.min(e,h),o=Math.max(o,p),a=Math.min(a,m)}),this.minY=a,this.maxY=o,this.minX=e,this.maxX=i},translatePath:function(t){var i,e=this,o=!1,a=e.xAxis,n=e.yAxis;for(t=[].concat(t),i=t.length;i--;)if("number"==typeof t[i]){if(o)t[i]=Math.round(a.translate(t[i]));else t[i]=Math.round(n.len-n.translate(t[i]));o=!o}return t},setData:function(){t.Series.prototype.setData.apply(this,arguments),this.getBox()},translate:function(){var t=this,i=Number.MAX_VALUE,e=Number.MIN_VALUE;t.generatePoints(),l(t.data,function(o){if(o.shapeType="path",o.shapeArgs={d:t.translatePath(o.path)},"number"==typeof o.y)if(o.y>e)e=o.y;else if(o.y<i)i=o.y}),t.translateColors(i,e)},translateColors:function(t,o){var a,n,r=this.options,s=r.valueRanges,h=r.colorRange,p=this.colorKey;if(h)a=x(h.from),n=x(h.to);l(this.data,function(l){var m,d,c,u,f=l[p];if(s){for(c=s.length;c--;)if(m=s[c],a=m.from,n=m.to,(a===e||f>=a)&&(n===e||n>=f)){d=m.color;break}}else if(h&&void 0!==f)u=1-(o-f)/(o-t),d=null===f?r.nullColor:i(a,n,u);if(d)l.color=null,l.options.color=d})},drawGraph:g,drawDataLabels:g,drawPoints:function(){var i=this,e=i.xAxis,o=i.yAxis,a=i.colorKey;l(i.data,function(t){if(t.plotY=1,null===t[a])t[a]=0,t.isNull=!0}),c.column.prototype.drawPoints.apply(i),l(i.data,function(t){var i=t.dataLabels,n=e.toPixels(t._minX,!0),r=e.toPixels(t._maxX,!0),l=o.toPixels(t._minY,!0),s=o.toPixels(t._maxY,!0);if(t.plotX=Math.round(n+(r-n)*p(i&&i.anchorX,.5)),t.plotY=Math.round(l+(s-l)*p(i&&i.anchorY,.5)),t.isNull)t[a]=null}),t.Series.prototype.drawDataLabels.call(i)},animateDrilldown:function(t){var i,e=this.chart.plotBox,o=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],a=o.bBox,n=this.chart.options.drilldown.animation;if(!t)i=Math.min(a.width/e.width,a.height/e.height),o.shapeArgs={scaleX:i,scaleY:i,translateX:a.x,translateY:a.y},l(this.points,function(t){t.graphic.attr(o.shapeArgs).animate({scaleX:1,scaleY:1,translateX:0,translateY:0},n)}),delete this.animate},animateDrillupFrom:function(t){c.column.prototype.animateDrillupFrom.call(this,t)},animateDrillupTo:function(t){c.column.prototype.animateDrillupTo.call(this,t)}}),u.mapline=h(u.map,{lineWidth:1,backgroundColor:"none"}),c.mapline=t.extendClass(c.map,{type:"mapline",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth",fill:"backgroundColor"},drawLegendSymbol:c.line.prototype.drawLegendSymbol}),u.mappoint=h(u.scatter,{dataLabels:{enabled:!0,format:"{point.name}",color:"black",style:{textShadow:"0 0 5px white"}}}),c.mappoint=t.extendClass(c.scatter,{type:"mappoint"}),t.Map=function(i,e){var o,a={endOnTick:!1,gridLineWidth:0,labels:{enabled:!1},lineWidth:0,minPadding:0,maxPadding:0,startOnTick:!1,tickWidth:0,title:null};return o=i.series,i.series=null,i=h({chart:{type:"map",panning:"xy"},xAxis:a,yAxis:h(a,{reversed:!0})},i,{chart:{inverted:!1}}),i.series=o,new t.Chart(i,e)}}(Highcharts);