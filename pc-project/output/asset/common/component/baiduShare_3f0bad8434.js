define('common/component/baiduShare_3f0bad8434',['require','exports'],function(require,exports){'use strict';var e='<div class="baidu-share bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a ><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博" ></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a><a href="#" class="bds_tieba" data-cmd="tieba" title="分享到百度贴吧"></a></div>';exports.init=function(a){var t=a.element;if(t.jquery)t=t[0];var d=document.createElement('div');d.innerHTML=e;var i=d.firstChild;t.parentNode.replaceChild(i,t),window._bd_share_config={common:{bdSnsKey:{},bdText:a.text,bdMini:1,bdMiniList:!1,bdPic:a.image,bdStyle:0,bdSize:24,bdUrl:a.url},share:{}};var s=document.getElementsByTagName('head')[0],r=s.appendChild(document.createElement('script'));r.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/3600000);};});