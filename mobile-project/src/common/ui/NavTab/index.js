define(function () {
	// var itemTpl = '<li class="nav-tab-item"></li>';
	var defaultOptions = {};
	/**
	 * 导航页签
	 * @param {Object} options [description]
	 * @param {jQuery} options.element 父元素
	 * @param {?=string} options.defaultValue 默认值，没有默认第一个id
	 * @param {function<id, e>} options.onSelected 选中回调
	 * @param {Array.<Object>} options.dataSource 数据源
	 * @param {string} options.dataSource.id 数据源
	 * @param {string} options.dataSource.name 数据源
	 */
	function NavTab(options) {
		this.options = $.extend({}, defaultOptions, options);
		this.init();
	}

	NavTab.prototype = {
		init: function () {
			var me = this;
			var container = $('<ul class="nav-tab-container"></ul>');
			var items = '';
			var ds = me.options.dataSource;
			var defaultValue = me.options.defaultValue;
			if (defaultValue + '' !== defaultValue) {
				defaultValue = ds[0].id;
			}
			if (ds && ds.length) {
				ds.forEach(function (v) {
					var className;
					if (v.id === defaultValue) {
						className = 'active';
					}
					items += ''
						+ '<li class="nav-tab-item ' + className + '" data-id="' + v.id + '">'
						+	v.name
						+ '</li>';
				});
			}
			container.on('click', '.nav-tab-item', function (e) {
				var target = $(e.target);
				if ($.isFunction(me.options.onSelected)) {
					me.options.onSelected(target.data('id'), e);
				}
				target.addClass('active');
				target.siblings().removeClass('active');
				e.stopPropagation();
			});
			container.append(items);
			me.options.element.append(container);
		},
		setValue: function () {

		},
		dispose: function () {

		}
	};

	return NavTab;
});