/**
 * Created by xuzheng on 15/6/15.
 */
define(function (require, exports) {

    'use strict';
    var lazyLoadImage = require('common/lazyLoadImage');
    var observer = require('common/mvc/observer');

    return function ($controlWrap, mvcObject) {
        var $select = $controlWrap.find('select');

        function update() {
            var data_code = mvcObject.get('countryCode') || '';
            var data_item = $select.find('[value="' + data_code + '"]');
            var data_index = data_item.index();
            var current_index = $select.get(0).selectedIndex;
            if (data_index != current_index) {
                $select.get(0).selectedIndex = data_index;
            }
            var $countryText = $controlWrap.find('.country_text');
            $countryText.find('span').html(data_item.data('code'));
            $countryText.find('img')
                .attr('data-src', data_item.data('pic'));
            lazyLoadImage.init($countryText.find('img'), true);
        }

        $select.change(function () {
            var $selectedOptions = $select.find('option').eq(this.selectedIndex);
            mvcObject.set('countryCode', $selectedOptions.val());
        });
        observer.addListener(mvcObject, 'countrycode_changed', update);
        mvcObject.set('countryCode', $select.val() || '');
    };
});
