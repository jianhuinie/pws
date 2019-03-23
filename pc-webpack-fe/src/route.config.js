export default [
    {
        title: '学生端',
        path: '/detail',
        name: 'cellClass',
        layout: 'BlankLayout',
        exact: false,
        routes: [
            {
                path: 'cellClass/:id',
                title: '课程详情页',
                component: 'detail/cellClass',
                exact: false
            }
        ]
    }
];
