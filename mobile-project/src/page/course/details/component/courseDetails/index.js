/**
 * 图文详情
 */
define(function (require) {

    var $ = require('zepto');

    return function () {
        var allBtn = $('.course-info .all-info');
        // alert(allBtn);
        var imgText = $('.img-text').find('.img-intro');
        var height = 0;

        // 寻找图片，并计算图片的高度
        var imgs = imgText.find('img');
        //alert(imgs.length);
        if (imgs.length > 0) {
            $.each(imgs, function () {
                $(this).load(function () {
                    height = imgText.height();
                   // alert(height);
                    if (height < 460) {
                        $('.img-text').css('margin-bottom', 0);
                    } else {
                        $('.img-text').css('margin-bottom', 60);

                    }
                });
            });

        } else {
            height = imgText.height();
            if (height < 460) {
                $('.img-text').css('margin-bottom', 0);
            }
        }

        allBtn.on('click', function () {
            $('.img-text').css('height', 'auto');
            $('.img-text-content .wrap').css('max-height', 'none');
            $('.img-text-content .clip').css('max-height', 'none').css('margin-bottom', '0');

            allBtn.hide();

        });
    }
});
