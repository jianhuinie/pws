define('activity/helloteacher_494cd1f3d0',['require','exports'],function(require,exports){'use strict';exports.init=function(){var e=$('.content');e.on('click','.banner',function(n){var i=$(this),t=i.next('.banner_con');if(t.is(':visible'))t.slideUp(500);else{e.find('.banner_con').hide();var o=i.offset().top+400;$(window).scrollTop(o),t.slideDown(500);}n.preventDefault();});};});