/**
 * Created by xuzheng on 15/12/15.
 */

require.config({
    'baseUrl': '/src',
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
        },
        {
            'name': 'jockey',
            'location': '../lib/jockey',
            'main': 'jockey'
        },
        {
            'name': 'ga',
            'location': '../lib/ga',
            'main': 'ga'
        },
        {
            'name': 'artTemplate',
            'location': '../lib/artTemplate',
            'main': 'template'
        },
        {
            'name': 'swiper',
            'location': '../lib/swiper/dist/js',
            'main': 'swiper'
        },
        {
            'name': 'react',
            'location': '../lib/react',
            'main': 'react'
        },
        {
            'name': 'react-dom',
            'location': '../lib/react',
            'main': 'react-dom'
        },
        {
            'name': 'redux',
            'location': '../lib/redux',
            'main': 'redux'
        },
        {
            'name': 'react-redux',
            'location': '../lib/react-redux',
            'main': 'react-redux'
        },
        {
            'name': 'react-router',
            'location': '../lib/react-router',
            'main': 'react-router'
        },
        {
            'name': 'react-modal',
            'location': '../lib/react-modal',
            'main': 'react-modal'
        },
        {
            'name': 'css-loader',
            'location': '../lib/require-css',
            'main': 'css'
        }
    ],
    shim: {
        'react': {
            'exports': 'React'
        },
        'react-dom': {
            'exports': 'ReactDOM'
        },
        'react-redux': {
            'exports': 'ReactRedux'
        },
        'redux': {
            'exports': 'Redux'
        },
        'react-router': {
            'exports': 'ReactRouter'
        }
    }
});
initRequireConfig(1);