define('common/function/rc4_c97a7cac84',['require','exports'],function(){'use strict';return function(r,n){for(var e=Array(256),t=Array(r.length),o=0;256>o;o++){e[o]=o;var a=(a+e[o]+n.charCodeAt(o%n.length))%256,c=e[o];e[o]=e[a],e[a]=c;}for(var o=0;o<r.length;o++)t[o]=r.charCodeAt(o);for(var f=0;f<t.length;f++){var o=(o+1)%256,a=(a+e[o])%256,c=e[o];e[o]=e[a],e[a]=c;var i=(e[o]+e[a]%256)%256;t[f]=String.fromCharCode(t[f]^e[i]);}return t.join('');};});