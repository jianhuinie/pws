define("common/rules",["require","exports"],function(require,exports){exports.max=function(e){return+this.value<=+e},exports.min=function(e){return+this.value>=+e},exports.maxLen=function(e){return(this.value+"").length<=+e},exports.minLen=function(e){return(this.value+"").length>=+e},exports.required=function(e){var n=this.value+"";if("false"===e)if(!n)return{force:!0};else return!0;else return n.length>0},exports.number=function(e){return!/^\d+$/g.test(this.value)^"true"===e},exports.isCnNewID=function(){var e=this.value+"",n=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],t=[1,0,"X",9,8,7,6,5,4,3,2];if(/^\d{17}\d|x$/i.test(e)){for(var r,u=0,i=0;i<e.length-1;i++)u+=parseInt(e.substr(i,1),10)*n[i];return r=u%11,t[r]==e.substr(17,1).toUpperCase()}else return!1}});