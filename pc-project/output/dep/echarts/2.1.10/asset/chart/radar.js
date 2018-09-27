define("echarts/chart/radar",["require","../component/base","./base","zrender/shape/Polygon","../component/polar","../config","../util/ecData","zrender/tool/util","zrender/tool/color","../util/accMath","../chart"],function(require){function e(e,r,a,s,n){t.call(this,e,r,a,s,n),i.call(this),this.refresh(s)}var t=require("../component/base"),i=require("./base"),r=require("zrender/shape/Polygon");require("../component/polar");var a=require("../config"),s=require("../util/ecData"),n=require("zrender/tool/util"),o=require("zrender/tool/color");return e.prototype={type:a.CHART_TYPE_RADAR,_buildShape:function(){this.selectedMap={},this._symbol=this.option.symbolList,this._queryTarget,this._dropBoxList=[],this._radarDataCounter=0;for(var e,t=this.series,i=this.component.legend,r=0,s=t.length;s>r;r++)if(t[r].type===a.CHART_TYPE_RADAR)if(this.serie=this.reformOption(t[r]),this.legendHoverLink=t[r].legendHoverLink||this.legendHoverLink,e=this.serie.name||"",this.selectedMap[e]=i?i.isSelected(e):!0,this.selectedMap[e]){if(this._queryTarget=[this.serie,this.option],this.deepQuery(this._queryTarget,"calculable"))this._addDropBox(r);this._buildSingleRadar(r),this.buildMark(r)}this.addShapeList()},_buildSingleRadar:function(e){for(var t,i,r,a,s=this.component.legend,n=this.serie.data,o=this.deepQuery(this._queryTarget,"calculable"),l=0;l<n.length;l++)if(r=n[l].name||"",this.selectedMap[r]=s?s.isSelected(r):!0,this.selectedMap[r]){if(s){if(i=s.getColor(r),t=s.getItemShape(r))t.style.brushType=this.deepQuery([n[l],this.serie],"itemStyle.normal.areaStyle")?"both":"stroke",s.setItemShape(r,t)}else i=this.zr.getColor(l);a=this._getPointList(this.serie.polarIndex,n[l]),this._addSymbol(a,i,l,e,this.serie.polarIndex),this._addDataShape(a,i,n[l],e,l,o),this._radarDataCounter++}else;},_getPointList:function(e,t){for(var i,r,a=[],s=this.component.polar,n=0,o=t.value.length;o>n;n++)if(r=null!=t.value[n].value?t.value[n].value:t.value[n],i="-"!=r?s.getVector(e,n,r):!1)a.push(i);return a},_addSymbol:function(e,t,i,r,a){for(var n,o=this.series,l=this.component.polar,h=0,p=e.length;p>h;h++)n=this.getSymbolShape(this.deepMerge([o[r].data[i],o[r]]),r,o[r].data[i].value[h],h,l.getIndicatorText(a,h),e[h][0],e[h][1],this._symbol[this._radarDataCounter%this._symbol.length],t,"#fff","vertical"),n.zlevel=this._zlevelBase+1,s.set(n,"data",o[r].data[i]),s.set(n,"value",o[r].data[i].value),s.set(n,"dataIndex",i),s.set(n,"special",h),this.shapeList.push(n)},_addDataShape:function(e,t,i,a,n,l){var h=this.series,p=[i,this.serie],d=this.getItemStyleColor(this.deepQuery(p,"itemStyle.normal.color"),a,n,i),u=this.deepQuery(p,"itemStyle.normal.lineStyle.width"),c=this.deepQuery(p,"itemStyle.normal.lineStyle.type"),g=this.deepQuery(p,"itemStyle.normal.areaStyle.color"),f=this.deepQuery(p,"itemStyle.normal.areaStyle"),y={zlevel:this._zlevelBase,style:{pointList:e,brushType:f?"both":"stroke",color:g||d||("string"==typeof t?o.alpha(t,.5):t),strokeColor:d||t,lineWidth:u,lineType:c},highlightStyle:{brushType:this.deepQuery(p,"itemStyle.emphasis.areaStyle")||f?"both":"stroke",color:this.deepQuery(p,"itemStyle.emphasis.areaStyle.color")||g||d||("string"==typeof t?o.alpha(t,.5):t),strokeColor:this.getItemStyleColor(this.deepQuery(p,"itemStyle.emphasis.color"),a,n,i)||d||t,lineWidth:this.deepQuery(p,"itemStyle.emphasis.lineStyle.width")||u,lineType:this.deepQuery(p,"itemStyle.emphasis.lineStyle.type")||c}};if(s.pack(y,h[a],a,i,n,i.name,this.component.polar.getIndicator(h[a].polarIndex)),l)y.draggable=!0,this.setCalculable(y);y=new r(y),this.shapeList.push(y)},_addDropBox:function(e){var t=this.series,i=this.deepQuery(this._queryTarget,"polarIndex");if(!this._dropBoxList[i]){var r=this.component.polar.getDropBox(i);r.zlevel=this._zlevelBase,this.setCalculable(r),s.pack(r,t,e,void 0,-1),this.shapeList.push(r),this._dropBoxList[i]=!0}},ondragend:function(e,t){var i=this.series;if(this.isDragend&&e.target){var r=e.target,a=s.get(r,"seriesIndex"),n=s.get(r,"dataIndex");this.component.legend&&this.component.legend.del(i[a].data[n].name),i[a].data.splice(n,1),t.dragOut=!0,t.needRefresh=!0,this.isDragend=!1}},ondrop:function(e,t){var i=this.series;if(this.isDrop&&e.target){var r,a,n=e.target,o=e.dragged,l=s.get(n,"seriesIndex"),h=s.get(n,"dataIndex"),p=this.component.legend;if(-1===h)r={value:s.get(o,"value"),name:s.get(o,"name")},i[l].data.push(r),p&&p.add(r.name,o.style.color||o.style.strokeColor);else{var d=require("../util/accMath");r=i[l].data[h],p&&p.del(r.name),r.name+=this.option.nameConnector+s.get(o,"name"),a=s.get(o,"value");for(var u=0;u<a.length;u++)r.value[u]=d.accAdd(r.value[u],a[u]);p&&p.add(r.name,o.style.color||o.style.strokeColor)}t.dragIn=t.dragIn||!0,this.isDrop=!1}},refresh:function(e){if(e)this.option=e,this.series=e.series;this.backupShapeList(),this._buildShape()}},n.inherits(e,i),n.inherits(e,t),require("../chart").define("radar",e),e}),define("echarts/component/polar",["require","./base","zrender/shape/Text","zrender/shape/Line","zrender/shape/Polygon","zrender/shape/Circle","zrender/shape/Ring","../config","zrender/tool/util","../util/coordinates","../util/accMath","../util/smartSteps","../component"],function(require){function e(e,i,r,a,s){t.call(this,e,i,r,a,s),this.refresh(a)}var t=require("./base"),i=require("zrender/shape/Text"),r=require("zrender/shape/Line"),a=require("zrender/shape/Polygon"),s=require("zrender/shape/Circle"),n=require("zrender/shape/Ring"),o=require("../config"),l=require("zrender/tool/util"),h=require("../util/coordinates");return e.prototype={type:o.COMPONENT_TYPE_POLAR,_buildShape:function(){for(var e=0;e<this.polar.length;e++)this._index=e,this.reformOption(this.polar[e]),this._queryTarget=[this.polar[e],this.option],this._createVector(e),this._buildSpiderWeb(e),this._buildText(e),this._adjustIndicatorValue(e),this._addAxisLabel(e);for(var e=0;e<this.shapeList.length;e++)this.zr.addShape(this.shapeList[e])},_createVector:function(e){for(var t,i=this.polar[e],r=this.deepQuery(this._queryTarget,"indicator"),a=r.length,s=i.startAngle,n=2*Math.PI/a,o=this._getRadius(),l=i.__ecIndicator=[],p=0;a>p;p++)t=h.polar2cartesian(o,s*Math.PI/180+n*p),l.push({vector:[t[1],-t[0]]})},_getRadius:function(){var e=this.polar[this._index];return this.parsePercent(e.radius,Math.min(this.zr.getWidth(),this.zr.getHeight())/2)},_buildSpiderWeb:function(e){var t=this.polar[e],i=t.__ecIndicator,r=t.splitArea,a=t.splitLine,s=this.getCenter(e),n=t.splitNumber,o=a.lineStyle.color,l=a.lineStyle.width,h=a.show,p=this.deepQuery(this._queryTarget,"axisLine");this._addArea(i,n,s,r,o,l,h),p.show&&this._addLine(i,s,p)},_addAxisLabel:function(e){for(var t,r,a,s,r,n,o,h,p,d,u=require("../util/accMath"),c=this.polar[e],g=this.deepQuery(this._queryTarget,"indicator"),f=c.__ecIndicator,y=this.deepQuery(this._queryTarget,"splitNumber"),_=this.getCenter(e),v=0;v<g.length;v++)if(t=this.deepQuery([g[v],c,this.option],"axisLabel"),t.show){if(a={},a.textFont=this.getFont(),a=l.merge(a,t),a.lineWidth=a.width,r=f[v].vector,n=f[v].value,h=v/g.length*2*Math.PI,p=t.offset||10,d=t.interval||0,!n)return;for(var m=1;y>=m;m+=d+1)s=l.merge({},a),o=u.accAdd(n.min,u.accMul(n.step,m)),s.text=this.numAddCommas(o),s.x=m*r[0]/y+Math.cos(h)*p+_[0],s.y=m*r[1]/y+Math.sin(h)*p+_[1],this.shapeList.push(new i({zlevel:this._zlevelBase,style:s,draggable:!1,hoverable:!1}))}},_buildText:function(e){for(var t,r,a,s,n,o,l,h=this.polar[e],p=h.__ecIndicator,d=this.deepQuery(this._queryTarget,"indicator"),u=this.getCenter(e),c=0,g=0,f=0;f<d.length;f++)if(s=this.deepQuery([d[f],h,this.option],"name"),s.show){if(l=this.deepQuery([s,h,this.option],"textStyle"),r={},r.textFont=this.getFont(l),r.color=l.color,"function"==typeof s.formatter)r.text=s.formatter.call(this.myChart,d[f].text,f);else if("string"==typeof s.formatter)r.text=s.formatter.replace("{value}",d[f].text);else r.text=d[f].text;if(p[f].text=r.text,t=p[f].vector,Math.round(t[0])>0)a="left";else if(Math.round(t[0])<0)a="right";else a="center";if(!s.margin)t=this._mapVector(t,u,1.2);else o=s.margin,c=t[0]>0?o:-o,g=t[1]>0?o:-o,c=0===t[0]?0:c,g=0===t[1]?0:g,t=this._mapVector(t,u,1);if(r.textAlign=a,r.x=t[0]+c,r.y=t[1]+g,s.rotate)n=[s.rotate/180*Math.PI,t[0],t[1]];else n=[0,0,0];this.shapeList.push(new i({zlevel:this._zlevelBase,style:r,draggable:!1,hoverable:!1,rotation:n}))}else;},getIndicatorText:function(e,t){return this.polar[e]&&this.polar[e].__ecIndicator[t]&&this.polar[e].__ecIndicator[t].text},getDropBox:function(e){var t,i,e=e||0,r=this.polar[e],a=this.getCenter(e),s=r.__ecIndicator,n=s.length,o=[],l=r.type;if("polygon"==l){for(var h=0;n>h;h++)t=s[h].vector,o.push(this._mapVector(t,a,1.2));i=this._getShape(o,"fill","rgba(0,0,0,0)","",1)}else if("circle"==l)i=this._getCircle("",1,1.2,a,"fill","rgba(0,0,0,0)");return i},_addArea:function(e,t,i,r,a,s,n){for(var o,l,h,p,d=this.deepQuery(this._queryTarget,"type"),u=0;t>u;u++){if(l=(t-u)/t,n){if("polygon"==d)p=this._getPointList(e,l,i),o=this._getShape(p,"stroke","",a,s);else if("circle"==d)o=this._getCircle(a,s,l,i,"stroke");this.shapeList.push(o)}if(r.show)h=(t-u-1)/t,this._addSplitArea(e,r,l,h,i,u)}},_getCircle:function(e,t,i,r,a,n){var o=this._getRadius();return new s({zlevel:this._zlevelBase,style:{x:r[0],y:r[1],r:o*i,brushType:a,strokeColor:e,lineWidth:t,color:n},hoverable:!1,draggable:!1})},_getRing:function(e,t,i,r){var a=this._getRadius();return new n({zlevel:this._zlevelBase,style:{x:r[0],y:r[1],r:t*a,r0:i*a,color:e,brushType:"fill"},hoverable:!1,draggable:!1})},_getPointList:function(e,t,i){for(var r,a=[],s=e.length,n=0;s>n;n++)r=e[n].vector,a.push(this._mapVector(r,i,t));return a},_getShape:function(e,t,i,r,s){return new a({zlevel:this._zlevelBase,style:{pointList:e,brushType:t,color:i,strokeColor:r,lineWidth:s},hoverable:!1,draggable:!1})},_addSplitArea:function(e,t,i,r,a,s){var n,o,l,h,p,d=e.length,u=t.areaStyle.color,c=[],d=e.length,g=this.deepQuery(this._queryTarget,"type");if("string"==typeof u)u=[u];if(o=u.length,n=u[s%o],"polygon"==g)for(var f=0;d>f;f++)c=[],l=e[f].vector,h=e[(f+1)%d].vector,c.push(this._mapVector(l,a,i)),c.push(this._mapVector(l,a,r)),c.push(this._mapVector(h,a,r)),c.push(this._mapVector(h,a,i)),p=this._getShape(c,"fill",n,"",1),this.shapeList.push(p);else if("circle"==g)p=this._getRing(n,i,r,a),this.shapeList.push(p)},_mapVector:function(e,t,i){return[e[0]*i+t[0],e[1]*i+t[1]]},getCenter:function(e){var e=e||0;return this.parseCenter(this.zr,this.polar[e].center)},_addLine:function(e,t,i){for(var r,a,s=e.length,n=i.lineStyle,o=n.color,l=n.width,h=n.type,p=0;s>p;p++)a=e[p].vector,r=this._getLine(t[0],t[1],a[0]+t[0],a[1]+t[1],o,l,h),this.shapeList.push(r)},_getLine:function(e,t,i,a,s,n,o){return new r({zlevel:this._zlevelBase,style:{xStart:e,yStart:t,xEnd:i,yEnd:a,strokeColor:s,lineWidth:n,lineType:o},hoverable:!1})},_adjustIndicatorValue:function(e){for(var t,i,r=this.polar[e],a=this.deepQuery(this._queryTarget,"indicator"),s=a.length,n=r.__ecIndicator,o=this._getSeriesData(e),l=r.boundaryGap,h=r.splitNumber,p=r.scale,d=require("../util/smartSteps"),u=0;s>u;u++){if("number"==typeof a[u].max)t=a[u].max,i=a[u].min||0;else{var c=this._findValue(o,u,h,l);i=c.min,t=c.max}if(!p&&i>=0&&t>=0)i=0;if(!p&&0>=i&&0>=t)t=0;var g=d(i,t,h);n[u].value={min:g.min,max:g.max,step:g.step}}},_getSeriesData:function(e){for(var t,i,r,a=[],s=this.component.legend,n=0;n<this.series.length;n++)if(t=this.series[n],t.type==o.CHART_TYPE_RADAR){i=t.data||[];for(var l=0;l<i.length;l++)if(r=this.deepQuery([i[l],t,this.option],"polarIndex")||0,r==e&&(!s||s.isSelected(i[l].name)))a.push(i[l])}else;return a},_findValue:function(e,t,i,r){function a(e){(e>s||void 0===s)&&(s=e),(n>e||void 0===n)&&(n=e)}var s,n,o,l;if(e&&0!==e.length){if(1==e.length)n=0;if(1!=e.length)for(var h=0;h<e.length;h++)o="undefined"!=typeof e[h].value[t].value?e[h].value[t].value:e[h].value[t],a(o);else{l=e[0];for(var h=0;h<l.value.length;h++)a("undefined"!=typeof l.value[h].value?l.value[h].value:l.value[h])}var p=Math.abs(s-n);if(n-=Math.abs(p*r[0]),s+=Math.abs(p*r[1]),n===s)if(0===s)s=1;else if(s>0)n=s/i;else s/=i;return{max:s,min:n}}},getVector:function(e,t,i){e=e||0,t=t||0;var r=this.polar[e].__ecIndicator;if(!(t>=r.length)){var a,s=this.polar[e].__ecIndicator[t],n=this.getCenter(e),o=s.vector,l=s.value.max,h=s.value.min;if("undefined"==typeof i)return n;switch(i){case"min":i=h;break;case"max":i=l;break;case"center":i=(l+h)/2}if(l!=h)a=(i-h)/(l-h);else a=.5;return this._mapVector(o,n,a)}},isInside:function(e){var t=this.getNearestIndex(e);if(t)return t.polarIndex;else return-1},getNearestIndex:function(e){for(var t,i,r,a,s,n,o,l,p,d=0;d<this.polar.length;d++){if(t=this.polar[d],i=this.getCenter(d),e[0]==i[0]&&e[1]==i[1])return{polarIndex:d,valueIndex:0};if(r=this._getRadius(),s=t.startAngle,n=t.indicator,o=n.length,l=2*Math.PI/o,a=h.cartesian2polar(e[0]-i[0],i[1]-e[1]),e[0]-i[0]<0)a[1]+=Math.PI;if(a[1]<0)a[1]+=2*Math.PI;if(p=a[1]-s/180*Math.PI+2*Math.PI,Math.abs(Math.cos(p%(l/2)))*r>a[0])return{polarIndex:d,valueIndex:Math.floor((p+l/2)/l)%o}}},getIndicator:function(e){var e=e||0;return this.polar[e].indicator},refresh:function(e){if(e)this.option=e,this.polar=this.option.polar,this.series=this.option.series;this.clear(),this._buildShape()}},l.inherits(e,t),require("../component").define("polar",e),e}),define("echarts/util/coordinates",["require","zrender/tool/math"],function(require){function e(e,t){return[e*i.sin(t),e*i.cos(t)]}function t(e,t){return[Math.sqrt(e*e+t*t),Math.atan(t/e)]}var i=require("zrender/tool/math");return{polar2cartesian:e,cartesian2polar:t}});