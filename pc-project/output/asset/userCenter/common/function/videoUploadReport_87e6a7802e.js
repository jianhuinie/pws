define('cc/util/browser',['require','exports','module'],function(){'use strict';function e(e){var i,o;return $.each(r,function(r,a){var s=a[1].exec(e);if(s){if(i=a[0],o=s[1])if(o=o.replace(/_/g,'.'),a[2])o=parseInt(o,10)+a[2]+'.0';return!1;}}),{name:i||'',version:o||''};}var r=[['alipay',/alipay/],['wechat',/micromessenger/],['baiduApp',/baiduboxapp/],['baidu',/baidubrowser/],['baidu',/bdbrowser/],['uc',/ucbrowser/],['uc',/ucweb/],['qq',/qqbrowser/],['qqApp',/qq/],['ie',/iemobile[ \/]([\d_.]+)/],['ie',/msie[ \/]([\d_.]+)/],['ie',/trident[ \/]([\d_.]+)/,4],['chrome',/chrome[ \/]([\d_.]+)/],['firefox',/firefox[ \/]([\d_.]+)/],['opera',/opera(?:.*version)?[ \/]([\d_.]+)/],['safari',/version[ \/]([\d_.]+) safari/],['safari',/safari/]],i=e(navigator.userAgent.toLowerCase());if(i.name)i[i.name]=!0;return i;}),define('userCenter/common/function/videoUploadReport_87e6a7802e',['require','exports','module','cc/util/browser'],function(require){'use strict';var e=require('cc/util/browser');return function(r){WAT.send(WAT.toUrl('pb0.genshuixue.com','/gs.gif'),{type:'video_upload',stype:r.isSuccess?'success':'failure',user_number:userData.number,user_role:userData.type,guid:WAT.getCookie('__guid__'),fid:r.fid,video_name:r.videoName,video_size:r.videoSize,cdn_host:r.cdnHost,upload_time:r.uploadTime,browser:e.name,_timestamp:$.now()});};});