/**
 * @author hurry
 * @date 2016/06/15
 */

define(function(require) {
    'use strict';
    var setShare = require('common/share/initialize');
    
    return function(page_data) {
        function setShareInfo() {
            var options = {
                title: "顶级好课免费送",
                content: "50000人每天必看的人生开挂技能！别错过每一个实现人生逆袭的机会！",
                img: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/576125407509a.jpeg',
                url: location.href
            };
            setShare(options);
        }
        setShareInfo();
    };
});