define (function (require) {
    var $  = require('zepto');
    var imagePlayer = require('common/ui/ImagePlayer/showImagePlayer');

    return function () {
        var retina = $('.retina');
        var arrPics = this.picsArray;
        var needScale = 1;
        retina.each(function () {
            var that = $(this);
            that.css('height', that.width() + 'px');
        });
        retina
            .unbind('click')
            .on('click', function () {
                var that = $(this);
                var tempIndex = that.data('index');
                var temp = [];
                var titleArrays = [];
                // temp.push(that.data('src'));
                // if (that.data('title')) {
                //     titleArrays.push(that.data('title'));
                // } else {
                //     titleArrays.push('');
                // }
                that.parent().find('img').each(function (item) {
                    var there = $(this);
                    temp.push(there.data('src'));
                    if (there.data('title')) {
                        titleArrays.push(there.data('title'));
                    } else {
                        titleArrays.push('');
                    }
                    // titleArrays.push(there.data('title'));
                });

                var index = 1;
                if (temp.length > 1) {
                    index = tempIndex;
                }
                arrPics = temp;
                imagePlayer(arrPics, tempIndex, titleArrays, needScale);
        });
    };
});