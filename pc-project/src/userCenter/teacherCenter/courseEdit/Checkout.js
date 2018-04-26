define(function (require, exports, module) {

    'use strict';

    return Ractive.extend({
        template: require('html!./Checkout.html'),
        data: function () {
            return {
                options: {
                    name: '',
                    value: '',
                    text: '',
                    checked: true,
                    priceInputOptions: {
                        name: '',
                        value: '',
                        placeholder: '',
                        className: '',
                        disabled: true,
                        focus: false
                    }
                }
            };
        },
        toggleStatus: function () {

            var checked = !this.get('options.checked');

            this.set(
                'options.checked',
                checked
            );

            this.set(
                'options.priceInputOptions.focus',
                checked
            );
        },
        onrender: function () {

            var me = this;
            me.observe('options.checked', function (checked) {

                if ($.type(checked) !== 'boolean') {
                    checked = false;
                }

                $(me.getElement()).find(':checkbox').prop('checked', checked);

                me.set('options.priceInputOptions.disabled', !checked);

                if (!checked) {
                    me.set('options.priceInputOptions.value', '');
                }

            });

        },
        components: {
            Input: require('../../common/component/Input')
        }
    });

});