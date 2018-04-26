/**
 * @file 获取教学科目
 * @path /api/tcenter/courses/one-on-one-course/subjects
 * @author niejianhui
 */
var mockCreatFunction = function () {
    'use strict';

    var obj = {
        code: 0,
        pageDto: null,
        error: null,
        redirect_url: 'http://0.0.0.0:8108/detail.html'
    };

    obj.data = {
        query_one_on_one_course_subjects: [
            {
                id: "101",
                parent_id: "0",
                level: 1,
                name: "小学",
                remark_name: "小学",
                children: [
                    {
                        id: "201",
                        parent_id: "101",
                        level: 2,
                        name: "数学",
                        remark_name: "小学数学",
                        children: [],
                        categories: [
                            {
                                id: "300",
                                parent_id: "201",
                                level: 3,
                                name: "全部",
                                remark_name: "五年级数学"
                            },
                            {
                                id: "301",
                                parent_id: "201",
                                level: 3,
                                name: "五年级数学1",
                                remark_name: "五年级数学"
                            },
                            {
                                id: "302",
                                parent_id: "201",
                                level: 3,
                                name: "五年级数学2",
                                remark_name: "五年级数学"
                            },
                            {
                                id: "303",
                                parent_id: "201",
                                level: 3,
                                name: "五年级数学3",
                                remark_name: "五年级数学"
                            },
                            {
                                id: "304",
                                parent_id: "201",
                                level: 3,
                                name: "五年级数学3",
                                remark_name: "五年级数学"
                            }
                        ]
                    },
                    {
                        id: "202",
                        parent_id: "101",
                        level: 2,
                        name: "英语",
                        remark_name: "小学英语",
                        children: [],
                        categories: [
                            {
                                id: "314",
                                parent_id: "202",
                                level: 3,
                                name: "五年级英语1",
                                remark_name: "五年级英语"
                            },
                            {
                                id: "315",
                                parent_id: "202",
                                level: 3,
                                name: "五年级英语2",
                                remark_name: "五年级数学"
                            },
                            {
                                id: "316",
                                parent_id: "202",
                                level: 3,
                                name: "五年级英语3",
                                remark_name: "五年级数学"
                            },
                            {
                                id: "316",
                                parent_id: "202",
                                level: 3,
                                name: "全部",
                                remark_name: "五年级数学"
                            },
                            {
                                id: "317",
                                parent_id: "202",
                                level: 3,
                                name: "五年级英语4",
                                remark_name: "五年级数学"
                            }

                        ]
                    }
                ]
            },
            {
                "id": "102",
                "parent_id": "0",
                "level": 1,
                "name": "大学",
                "remark_name": "大学",
                "children": [
                    {
                        "id": "203",
                        "parent_id": "102",
                        "level": 2,
                        "name": "考研",
                        "remark_name": "考研",
                        "children": [
                            {
                                "id": "451",
                                "parent_id": "203",
                                "level": 3,
                                "name": "SMBA",
                                "remark_name": "SMBA"
                            },
                            {
                                "id": "452",
                                "parent_id": "203",
                                "level": 3,
                                "name": "MPA",
                                "remark_name": "MPA"
                            },
                            {
                                "id": "453",
                                "parent_id": "203",
                                "level": 3,
                                "name": "MPAcc",
                                "remark_name": "MPAcc"
                            },
                            {
                                "id": "458",
                                "parent_id": "203",
                                "level": 3,
                                "name": "MEM",
                                "remark_name": "MEM"
                            }

                        ],
                        "categories": []
                    },
                    {
                        "id": "204",
                        "parent_id": "102",
                        "level": 2,
                        "name": "工程图学",
                        "remark_name": "工程图学",
                        "children": [
                            {
                                "id": "551",
                                "parent_id": "204",
                                "level": 3,
                                "name": "工程图学1",
                                "remark_name": "工程图学1"
                            },
                            {
                                "id": "552",
                                "parent_id": "204",
                                "level": 3,
                                "name": "工程图学2",
                                "remark_name": "工程图学2"
                            },
                            {
                                "id": "553",
                                "parent_id": "204",
                                "level": 3,
                                "name": "工程图学3",
                                "remark_name": "工程图学3"
                            },
                            {
                                "id": "558",
                                "parent_id": "204",
                                "level": 3,
                                "name": "工程图学4",
                                "remark_name": "工程图学4"
                            }

                        ],
                        "categories": []
                    }
                ]
            },
            {
                "id": "103",
                "parent_id": "0",
                "level": 1,
                "name": "中考",
                "remark_name": "中考",
                "children": [
                    {
                        "id": "205",
                        "parent_id": "103",
                        "level": 2,
                        "name": "英语",
                        "remark_name": "中考英语",
                        "children": [],
                        "categories": [
                            // {
                            //     id: '239',
                            //     level: 3,
                            //     name: '全部',
                            //     parent_id: 238
                            // }
                        ]
                    },
                    {
                        "id": "206",
                        "parent_id": "103",
                        "level": 2,
                        "name": "政治",
                        "remark_name": "中考政治",
                        "children": [],
                        "categories": []
                    }
                ]
            }
        ]
    }


    return obj;
};
