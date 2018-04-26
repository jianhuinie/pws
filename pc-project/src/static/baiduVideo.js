/**
 * @file 百度助手js
 * @author tangrongyan
 */

define(function(require, exports) {

    'use strict';
    var Tab = require('cobble/ui/Tab');
    
   
    exports.init = function() {
        
        
                        $('#main').each(
                                function() {
                                    new Tab({
                                        trigger: 'click',
                                        navActiveClass: 'active',
                                        navSelector: '.tab-nav',
                                        contentSelector: '.tab-panel',
                                        element: $(this),
                                        index: 0
                                    });
                                }
                        );
        



    };
});