define("echarts/chart/line",["require","../component/base","./base","zrender/shape/BrokenLine","../util/shape/Icon","../util/shape/HalfSmoothPolygon","../component/axis","../component/grid","../component/dataZoom","../config","../util/ecData","zrender/tool/util","zrender/tool/color","../chart"],function(require){function e(e,t,a,o,n){i.call(this,e,t,a,o,n),s.call(this),this.refresh(o)}function t(e,t,i){var s=t.x,a=t.y,n=t.width,l=t.height,r=l/2;if(t.symbol.match("empty"))e.fillStyle="#fff";t.brushType="both";var h=t.symbol.replace("empty","").toLowerCase();if(h.match("star"))r=h.replace("star","")-0||5,a-=1,h="star";else if("rectangle"===h||"arrow"===h)s+=(n-l)/2,n=l;var m="";if(h.match("image"))m=h.replace(new RegExp("^image:\\/\\/"),""),h="image",s+=Math.round((n-l)/2)-1,n=l+=2;if(h=o.prototype.iconLibrary[h]){var p=t.x,u=t.y;e.moveTo(p,u+r),e.lineTo(p+5,u+r),e.moveTo(p+t.width-5,u+r),e.lineTo(p+t.width,u+r);var f=this;h(e,{x:s+4,y:a+4,width:n-8,height:l-8,n:r,image:m},function(){f.modSelf(),i()})}else e.moveTo(s,a+r),e.lineTo(s+n,a+r)}var i=require("../component/base"),s=require("./base"),a=require("zrender/shape/BrokenLine"),o=require("../util/shape/Icon"),n=require("../util/shape/HalfSmoothPolygon");require("../component/axis"),require("../component/grid"),require("../component/dataZoom");var l=require("../config"),r=require("../util/ecData"),h=require("zrender/tool/util"),m=require("zrender/tool/color");return e.prototype={type:l.CHART_TYPE_LINE,_buildShape:function(){this.finalPLMap={},this._bulidPosition()},_buildHorizontal:function(e,t,i,s){for(var a,o,n,l,r,h,m,p,u,f,d=this.series,y=i[0][0],g=d[y],x=g.xAxisIndex,c=this.component.xAxis.getAxis(x),v={},L=0,I=t;I>L&&null!=c.getNameByIndex(L);L++){n=c.getCoordByIndex(L);for(var b=0,_=i.length;_>b;b++){a=d[i[b][0]].yAxisIndex||0,o=this.component.yAxis.getAxis(a),h=r=p=m=o.getCoord(0);for(var S=0,M=i[b].length;M>S;S++)if(y=i[b][S],g=d[y],u=g.data[L],f=null!=u?null!=u.value?u.value:u:"-",v[y]=v[y]||[],s[y]=s[y]||{min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY,sum:0,counter:0,average:0},"-"!==f){if(f>=0)r-=S>0?o.getCoordSize(f):h-o.getCoord(f),l=r;else if(0>f)m+=S>0?o.getCoordSize(f):o.getCoord(f)-p,l=m;if(v[y].push([n,l,L,c.getNameByIndex(L),n,h]),s[y].min>f)s[y].min=f,s[y].minY=l,s[y].minX=n;if(s[y].max<f)s[y].max=f,s[y].maxY=l,s[y].maxX=n;s[y].sum+=f,s[y].counter++}else if(v[y].length>0)this.finalPLMap[y]=this.finalPLMap[y]||[],this.finalPLMap[y].push(v[y]),v[y]=[]}r=this.component.grid.getY();for(var z,b=0,_=i.length;_>b;b++)for(var S=0,M=i[b].length;M>S;S++)if(y=i[b][S],g=d[y],u=g.data[L],f=null!=u?null!=u.value?u.value:u:"-","-"==f){if(this.deepQuery([u,g,this.option],"calculable"))z=this.deepQuery([u,g],"symbolSize"),r+=2*z+5,l=r,this.shapeList.push(this._getCalculableItem(y,L,c.getNameByIndex(L),n,l,"horizontal"))}else;}for(var C in v)if(v[C].length>0)this.finalPLMap[C]=this.finalPLMap[C]||[],this.finalPLMap[C].push(v[C]),v[C]=[];this._calculMarkMapXY(s,i,"y"),this._buildBorkenLine(e,this.finalPLMap,c,"horizontal")},_buildVertical:function(e,t,i,s){for(var a,o,n,l,r,h,m,p,u,f,d=this.series,y=i[0][0],g=d[y],x=g.yAxisIndex,c=this.component.yAxis.getAxis(x),v={},L=0,I=t;I>L&&null!=c.getNameByIndex(L);L++){l=c.getCoordByIndex(L);for(var b=0,_=i.length;_>b;b++){a=d[i[b][0]].xAxisIndex||0,o=this.component.xAxis.getAxis(a),h=r=p=m=o.getCoord(0);for(var S=0,M=i[b].length;M>S;S++)if(y=i[b][S],g=d[y],u=g.data[L],f=null!=u?null!=u.value?u.value:u:"-",v[y]=v[y]||[],s[y]=s[y]||{min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY,sum:0,counter:0,average:0},"-"!==f){if(f>=0)r+=S>0?o.getCoordSize(f):o.getCoord(f)-h,n=r;else if(0>f)m-=S>0?o.getCoordSize(f):p-o.getCoord(f),n=m;if(v[y].push([n,l,L,c.getNameByIndex(L),h,l]),s[y].min>f)s[y].min=f,s[y].minX=n,s[y].minY=l;if(s[y].max<f)s[y].max=f,s[y].maxX=n,s[y].maxY=l;s[y].sum+=f,s[y].counter++}else if(v[y].length>0)this.finalPLMap[y]=this.finalPLMap[y]||[],this.finalPLMap[y].push(v[y]),v[y]=[]}r=this.component.grid.getXend();for(var z,b=0,_=i.length;_>b;b++)for(var S=0,M=i[b].length;M>S;S++)if(y=i[b][S],g=d[y],u=g.data[L],f=null!=u?null!=u.value?u.value:u:"-","-"==f){if(this.deepQuery([u,g,this.option],"calculable"))z=this.deepQuery([u,g],"symbolSize"),r-=2*z+5,n=r,this.shapeList.push(this._getCalculableItem(y,L,c.getNameByIndex(L),n,l,"vertical"))}else;}for(var C in v)if(v[C].length>0)this.finalPLMap[C]=this.finalPLMap[C]||[],this.finalPLMap[C].push(v[C]),v[C]=[];this._calculMarkMapXY(s,i,"x"),this._buildBorkenLine(e,this.finalPLMap,c,"vertical")},_buildOther:function(e,t,i,s){for(var a,o,n=this.series,l={},r=0,h=i.length;h>r;r++)for(var m=0,p=i[r].length;p>m;m++){var u=i[r][m],f=n[u],d=f.xAxisIndex||0;a=this.component.xAxis.getAxis(d);var y=f.yAxisIndex||0;o=this.component.yAxis.getAxis(y);var g=o.getCoord(0);l[u]=l[u]||[],s[u]=s[u]||{min0:Number.POSITIVE_INFINITY,min1:Number.POSITIVE_INFINITY,max0:Number.NEGATIVE_INFINITY,max1:Number.NEGATIVE_INFINITY,sum0:0,sum1:0,counter0:0,counter1:0,average0:0,average1:0};for(var x=0,c=f.data.length;c>x;x++){var v=f.data[x],L=null!=v?null!=v.value?v.value:v:"-";if(L instanceof Array){var I=a.getCoord(L[0]),b=o.getCoord(L[1]);if(l[u].push([I,b,x,L[0],I,g]),s[u].min0>L[0])s[u].min0=L[0],s[u].minY0=b,s[u].minX0=I;if(s[u].max0<L[0])s[u].max0=L[0],s[u].maxY0=b,s[u].maxX0=I;if(s[u].sum0+=L[0],s[u].counter0++,s[u].min1>L[1])s[u].min1=L[1],s[u].minY1=b,s[u].minX1=I;if(s[u].max1<L[1])s[u].max1=L[1],s[u].maxY1=b,s[u].maxX1=I;s[u].sum1+=L[1],s[u].counter1++}else;}}for(var _ in l)if(l[_].length>0)this.finalPLMap[_]=this.finalPLMap[_]||[],this.finalPLMap[_].push(l[_]),l[_]=[];this._calculMarkMapXY(s,i,"xy"),this._buildBorkenLine(e,this.finalPLMap,a,"other")},_buildBorkenLine:function(e,t,i,s){for(var o,l="other"==s?"horizontal":s,p=this.series,u=e.length-1;u>=0;u--){var f=e[u],d=p[f],y=t[f];if(d.type===this.type&&null!=y)for(var g=this._getBbox(f,l),x=this._sIndex2ColorMap[f],c=this.query(d,"itemStyle.normal.lineStyle.width"),v=this.query(d,"itemStyle.normal.lineStyle.type"),L=this.query(d,"itemStyle.normal.lineStyle.color"),I=this.getItemStyleColor(this.query(d,"itemStyle.normal.color"),f,-1),b=null!=this.query(d,"itemStyle.normal.areaStyle"),_=this.query(d,"itemStyle.normal.areaStyle.color"),S=0,M=y.length;M>S;S++){var z=y[S],C="other"!=s&&this._isLarge(l,z);if(!C){for(var A=0,Y=z.length;Y>A;A++)if(o=d.data[z[A][2]],this.deepQuery([o,d,this.option],"calculable")||this.deepQuery([o,d],"showAllSymbol")||"categoryAxis"===i.type&&i.isMainAxis(z[A][2])&&"none"!=this.deepQuery([o,d],"symbol"))this.shapeList.push(this._getSymbol(f,z[A][2],z[A][3],z[A][0],z[A][1],l))}else z=this._getLargePointList(l,z);var N=new a({zlevel:this._zlevelBase,style:{miterLimit:c,pointList:z,strokeColor:L||I||x,lineWidth:c,lineType:v,smooth:this._getSmooth(d.smooth),smoothConstraint:g,shadowColor:this.query(d,"itemStyle.normal.lineStyle.shadowColor"),shadowBlur:this.query(d,"itemStyle.normal.lineStyle.shadowBlur"),shadowOffsetX:this.query(d,"itemStyle.normal.lineStyle.shadowOffsetX"),shadowOffsetY:this.query(d,"itemStyle.normal.lineStyle.shadowOffsetY")},hoverable:!1,_main:!0,_seriesIndex:f,_orient:l});if(r.pack(N,p[f],f,0,S,p[f].name),this.shapeList.push(N),b){var P=new n({zlevel:this._zlevelBase,style:{miterLimit:c,pointList:h.clone(z).concat([[z[z.length-1][4],z[z.length-1][5]],[z[0][4],z[0][5]]]),brushType:"fill",smooth:this._getSmooth(d.smooth),smoothConstraint:g,color:_?_:m.alpha(x,.5)},highlightStyle:{brushType:"fill"},hoverable:!1,_main:!0,_seriesIndex:f,_orient:l});r.pack(P,p[f],f,0,S,p[f].name),this.shapeList.push(P)}}}},_getBbox:function(e,t){var i=this.component.grid.getBbox(),s=this.xMarkMap[e];if(null!=s.minX0)return[[Math.min(s.minX0,s.maxX0,s.minX1,s.maxX1),Math.min(s.minY0,s.maxY0,s.minY1,s.maxY1)],[Math.max(s.minX0,s.maxX0,s.minX1,s.maxX1),Math.max(s.minY0,s.maxY0,s.minY1,s.maxY1)]];else if("horizontal"===t)i[0][1]=Math.min(s.minY,s.maxY),i[1][1]=Math.max(s.minY,s.maxY);else i[0][0]=Math.min(s.minX,s.maxX),i[1][0]=Math.max(s.minX,s.maxX);return i},_isLarge:function(e,t){if(t.length<2)return!1;else return"horizontal"===e?Math.abs(t[0][0]-t[1][0])<.5:Math.abs(t[0][1]-t[1][1])<.5},_getLargePointList:function(e,t){var i;if("horizontal"===e)i=this.component.grid.getWidth();else i=this.component.grid.getHeight();for(var s=t.length,a=[],o=0;i>o;o++)a[o]=t[Math.floor(s/i*o)];return a},_getSmooth:function(e){if(e)return.3;else return 0},_getCalculableItem:function(e,t,i,s,a,o){var n=this.series,l=n[e].calculableHolderColor||this.ecTheme.calculableHolderColor,r=this._getSymbol(e,t,i,s,a,o);return r.style.color=l,r.style.strokeColor=l,r.rotation=[0,0],r.hoverable=!1,r.draggable=!1,r.style.text=void 0,r},_getSymbol:function(e,t,i,s,a,o){var n=this.series,l=n[e],r=l.data[t],h=this.getSymbolShape(l,e,r,t,i,s,a,this._sIndex2ShapeMap[e],this._sIndex2ColorMap[e],"#fff","vertical"===o?"horizontal":"vertical");if(h.zlevel=this._zlevelBase+1,this.deepQuery([r,l,this.option],"calculable"))this.setCalculable(h),h.draggable=!0;return h},getMarkCoord:function(e,t){var i=this.series[e],s=this.xMarkMap[e],a=this.component.xAxis.getAxis(i.xAxisIndex),o=this.component.yAxis.getAxis(i.yAxisIndex);if(t.type&&("max"===t.type||"min"===t.type||"average"===t.type)){var n=null!=t.valueIndex?t.valueIndex:null!=s.maxX0?"1":"";return[s[t.type+"X"+n],s[t.type+"Y"+n],s[t.type+"Line"+n],s[t.type+n]]}return["string"!=typeof t.xAxis&&a.getCoordByIndex?a.getCoordByIndex(t.xAxis||0):a.getCoord(t.xAxis||0),"string"!=typeof t.yAxis&&o.getCoordByIndex?o.getCoordByIndex(t.yAxis||0):o.getCoord(t.yAxis||0)]},refresh:function(e){if(e)this.option=e,this.series=e.series;this.backupShapeList(),this._buildShape()},ontooltipHover:function(e,t){for(var i,s,a=e.seriesIndex,o=e.dataIndex,n=a.length;n--;)if(i=this.finalPLMap[a[n]])for(var l=0,r=i.length;r>l;l++){s=i[l];for(var h=0,m=s.length;m>h;h++)if(o===s[h][2])t.push(this._getSymbol(a[n],s[h][2],s[h][3],s[h][0],s[h][1],"horizontal"))}},addDataAnimation:function(e){for(var t=this.series,i={},s=0,a=e.length;a>s;s++)i[e[s][0]]=e[s];for(var o,n,l,r,h,m,p,s=this.shapeList.length-1;s>=0;s--)if(h=this.shapeList[s]._seriesIndex,i[h]&&!i[h][3]){if(this.shapeList[s]._main&&this.shapeList[s].style.pointList.length>1){if(m=this.shapeList[s].style.pointList,n=Math.abs(m[0][0]-m[1][0]),r=Math.abs(m[0][1]-m[1][1]),p="horizontal"===this.shapeList[s]._orient,i[h][2]){if("half-smooth-polygon"===this.shapeList[s].type){var u=m.length;this.shapeList[s].style.pointList[u-3]=m[u-2],this.shapeList[s].style.pointList[u-3][p?0:1]=m[u-4][p?0:1],this.shapeList[s].style.pointList[u-2]=m[u-1]}this.shapeList[s].style.pointList.pop(),p?(o=n,l=0):(o=0,l=-r)}else{if(this.shapeList[s].style.pointList.shift(),"half-smooth-polygon"===this.shapeList[s].type){var f=this.shapeList[s].style.pointList.pop();p?f[0]=m[0][0]:f[1]=m[0][1],this.shapeList[s].style.pointList.push(f)}p?(o=-n,l=0):(o=0,l=r)}this.zr.modShape(this.shapeList[s].id,{style:{pointList:this.shapeList[s].style.pointList}},!0)}else if(i[h][2]&&this.shapeList[s]._dataIndex===t[h].data.length-1){this.zr.delShape(this.shapeList[s].id);continue}else if(!i[h][2]&&0===this.shapeList[s]._dataIndex){this.zr.delShape(this.shapeList[s].id);continue}this.shapeList[s].position=[0,0],this.zr.animate(this.shapeList[s].id,"").when(500,{position:[o,l]}).start()}}},o.prototype.iconLibrary.legendLineIcon=t,h.inherits(e,s),h.inherits(e,i),require("../chart").define("line",e),e}),define("echarts/util/shape/HalfSmoothPolygon",["require","zrender/shape/Base","zrender/shape/util/smoothBezier","zrender/tool/util","zrender/shape/Polygon"],function(require){function e(e){t.call(this,e)}var t=require("zrender/shape/Base"),i=require("zrender/shape/util/smoothBezier"),s=require("zrender/tool/util");return e.prototype={type:"half-smooth-polygon",buildPath:function(e,t){var s=t.pointList;if(!(s.length<2))if(t.smooth){var a=i(s.slice(0,-2),t.smooth,!1,t.smoothConstraint);e.moveTo(s[0][0],s[0][1]);for(var o,n,l,r=s.length,h=0;r-3>h;h++)o=a[2*h],n=a[2*h+1],l=s[h+1],e.bezierCurveTo(o[0],o[1],n[0],n[1],l[0],l[1]);e.lineTo(s[r-2][0],s[r-2][1]),e.lineTo(s[r-1][0],s[r-1][1]),e.lineTo(s[0][0],s[0][1])}else require("zrender/shape/Polygon").prototype.buildPath(e,t)}},s.inherits(e,t),e});