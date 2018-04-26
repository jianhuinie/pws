/**
 * Created by xuzheng on 16/1/3.
 */
require.config({
    'baseUrl': '../../src/',
    'packages': [
        {
            'name': 'zepto',
            'location': '../lib/zepto',
            'main': 'zepto.debug'
        },
        {
            'name': 'iscroll',
            'location': '../lib/iscroll',
            'main': 'iscroll'
        }
    ]
});