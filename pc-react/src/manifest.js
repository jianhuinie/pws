/**
 * gsx.
 */

require.config({
    'baseUrl': '/src/',
    'packages': [
        {
            'name': 'dragula',
            'location': '../lib/dragula',
            'main': 'dragula'
        },
        {
            'name': 'antd',
            'location': '../lib/antd3',
            'main': 'antd'
        },
        {
            'name': 'moment',
            'location': '../lib/moment',
            'main': 'moment'
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
        }
    ]
    // shim: {
    //     'react': {
    //         'exports': 'React'
    //     },
    //     'react-dom': {
    //         'exports': 'ReactDOM'
    //     },
    //     'react-redux': {
    //         'exports': 'ReactRedux'
    //     },
    //     'redux': {
    //         'exports': 'Redux'
    //     },
    //     'react-router': {
    //         'exports': 'ReactRouter'
    //     }
    // }
});
initRequireConfig(1);