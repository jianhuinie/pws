/**
 * gsx.
 */

require.config({
    'baseUrl': '/src/',
    'packages': [
        {
            'name': 'zepto',
            'location': '../lib/zepto',
            'main': 'zepto.debug'
        },
        {
            'name': 'moment',
            'location': '../lib/moment',
            'main': 'moment'
        },
        {
            'name': 'axios',
            'location': '../lib/axios/dist',
            'main': 'axios'
        },
        {
            'name': 'iscroll',
            'location': '../lib/iscroll',
            'main': 'iscroll'
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
            'name': 'redux-thunk',
            'location': '../lib/redux-thunk/dist',
            'main': 'redux-thunk'
        },
        {
            'name': 'immutable',
            'location': '../lib/immutable/dist',
            'main': 'immutable'
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
        },
        {
            'name': 'antd',
            'location': '../lib/antd',
            'main': 'antd'
        },
        {
            'name': 'dragula',
            'location': '../lib/dragula',
            'main': 'dragula'
        }
    ],
    paths: {
        'gsx-design': '../lib/gsx-design-m/src',
    },
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