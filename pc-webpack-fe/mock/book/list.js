const { mock, Random } = require('mockjs');

module.exports = {
    'GET /api/books': mock({
        status: 0,
        'data|1-10': [
            {
                'id|+1': 1,
                name: /[A-Z][a-z]{8,24}/,
                date: Random.date('yyyy-MM-dd'),
            },
        ],
    }),
};
