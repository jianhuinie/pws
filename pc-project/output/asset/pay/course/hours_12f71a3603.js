define('pay/course/hours_12f71a3603',['require','exports','common/store_a1a35b3dfc'],function(require,exports){'use strict';function o(o){var n=e.find('.course-combo');n.find('.'+d).removeClass(d),o.addClass(d);var s=o.data('json');a.set({comboId:s.id,hours:s.hours,discount:s.discount||10});}function n(){var n=i.find('.form-radio');n.click(),n=r.find('.form-radio'),n.removeClass('checked'),i.addClass(d),r.removeClass(d),c.prop('disabled',!0),r.find('.form-group').removeClass('has-error');var s=i.find('.'+d);if(0===s.length)s=i.find('.combo-item:eq(0)');o(s);}function s(){var o=r.find('.form-radio');o.click(),o=i.find('.form-radio'),o.removeClass('checked'),i.removeClass(d),r.addClass(d),c.prop('disabled',!1),c.focus(),a.set({comboId:null,hours:0,discount:10});}var e=$('.course-hours'),i=e.find('.course-combo'),r=e.find('.course-custom'),c=e.find('[name="hours"]'),a=require('common/store_a1a35b3dfc'),d='active';exports.init=function(r){if(0!==e.length)e.on('change',':radio',function(o){if(0==$(o.currentTarget).val())n();else s();r.onChange();}).on('click','.combo-item',function(){if(n(),i.hasClass(d))o($(this)),r.onChange();}).on('click','.input-group',function(){s();}),r.onChange();};});