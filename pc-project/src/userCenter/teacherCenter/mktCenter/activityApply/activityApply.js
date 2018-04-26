define(function(require, exports) {

    'use strict';

    var qrcode = require('../../../common/function/qrcode');
    var renderImage = require('../../../common/function/renderImage');

    exports.init = function (data){

        new Ractive({
            el: '#container',
            template: require('html!./activityApply.html'),
            data: {
                checkedTabIndex: 0,
                newActivityIndex: -1,
                enrolledActivityIndex: -1,
                newActivityList: data.new_activity.list,
                enrolledActivityList: data.enrolled_activity.list
            },
            doActiveNewActivity: function (index) {
                this.set('newActivityList[' + this.get('newActivityIndex') + '].active', false);
                this.set('newActivityList[' + index + '].active', true);
                this.set('newActivityIndex', index);
            },
            doActiveEnrolledActivity: function (index) {
                this.set('enrolledActivityList[' + this.get('enrolledActivityIndex') + '].active', false);
                this.set('enrolledActivityList[' + index + '].active', true);
                this.set('enrolledActivityIndex', index);
            },
            onrender: function () {

                var container = $(this.getElement());

                container.find('.code').each(function () {

                    var element = $(this);

                    qrcode({
                        element: element,
                        text: element.data('url'),
                        width: 90,
                        height: 90
                    });

                });

                renderImage(container);

            }
        });



    }

});