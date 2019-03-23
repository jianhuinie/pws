const { mock } = require('mockjs');

module.exports = {
    // 使用 mockjs 生成数据，参考：https://github.com/nuysoft/Mock/wiki/Syntax-Specification
    'GET /api/list/random': mock({
        status: 0,
        'data|1-10': [
            {
                'id|+1': 1,
                username: /[A-Z][a-z]{4,8}/,
                'sex|1': true,
            },
        ],
    }),

    'GET /api/user': {
        status: 0,
        data: {
            id: 1,
            username: 'kenny',
            sex: true,
        },
    },

    'GET /api/user/list': {
        status: 0,
        data: [
            {
                id: 1,
                username: 'kenny',
                sex: true,
            },
            {
                id: 2,
                username: 'kitty',
                sex: true,
            },
        ],
    },

    'POST /api/login/account': (req, res) => {
        const { password, username } = req.body;
        if (password === '888888' && username === 'admin') {
            return res.json({
                status: 'ok',
                code: 0,
                token: 'sdfsdfsdfdsf',
                data: {
                    id: 1,
                    username: 'kenny',
                    sex: 6,
                },
            });
        } else {
            return res.status(403).json({
                status: 403,
                data: 'error',
            });
        }
    },

    'DELETE /api/user/:id': (req, res) => {
        console.log('---->', req.body);
        console.log('---->', req.params.id);
        res.send({ status: 0, data: '删除成功！' });
    },
};
