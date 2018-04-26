/**
 * @file 选择科目和推荐科目
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict'

    var service = require('../service');
    var autoScrollUp = require('cc/function/autoScrollUp');

    function formatClassifyList(list) {
        var classifyListOne = [];
        var classifyListTwo = [];
        var classifyListThree = [];

        $.each(
            list,
            function (indexOne, valueOne) {

                classifyListOne.push({
                    id: valueOne.id,
                    name: valueOne.name,
                    parentId: valueOne.parent_id
                });
                $.each(
                    valueOne.children,
                    function (indexTwo, valueTwo) {
                        var list = [];
                        list.push({
                            id: valueTwo.id,
                            name: valueTwo.name,
                            parentId: valueTwo.parent_id
                        });

                        if (!classifyListTwo[valueOne.id]) {
                            classifyListTwo[valueOne.id] = list;
                        }
                        else {
                            classifyListTwo[valueOne.id] = classifyListTwo[valueOne.id].concat(list)
                        }

                        $.each(
                            valueTwo.children,
                            function (indexThree, vlaueThree) {
                                var list = [];
                                list.push({
                                    id: vlaueThree.id,
                                    name: vlaueThree.name,
                                    parentId: vlaueThree.parent_id
                                });

                                if (!classifyListThree[valueTwo.id]) {
                                     classifyListThree[valueTwo.id] = list;
                                }
                                else {
                                    classifyListThree[valueTwo.id] = classifyListThree[valueTwo.id].concat(list)
                                }
                            }
                        );
                    }
                );
            }
        );

        return {
            classifyListOne: classifyListOne,
            classifyListTwo: classifyListTwo,
            classifyListThree: classifyListThree
        }
    }

    return Ractive.extend({
        template: require('html!./SubjectSelector.html'),
        data: function () {
            return {
                style: require('text!./SubjectSelector.styl'),
                subjectName: '',
                oneName: '',
                twoName: '',
                courseClassifyOptions: {
                    name: 'classify',
                    value: '',
                    placeholder: '输入关键词快速查找分类',
                    className: 'course-classify fluid'
                },
                courseClassifyList: {
                    classifyListOne: null,
                    classifyListTwo: null,
                    classifyListThree: null
                },
                chooseClassifyId: {
                    Id: '',
                    twoId: ''
                },
                recommendClassify: '',
                options: {
                    id: '',
                    name: '',
                    hidden: false,
                    path_array: []
                }
            };
        },
        components: {
            SubjectSelect: require('../../../../common/component/SubjectSelect'),
            Input: require('../../../../common/component/Input'),
        },
        onrender: function () {
            var me = this;
            var container = $(me.getElement());

            // me.oberve('options.refresh', function () {
            //     me.set('courseClassifyOptions.value','');
            // });
            // me.bindData({
            //     'activeSubject.threeId': 'options.id'
            // });

            me.observe('options.hidden', function (hidden) {
                if (hidden === false) {
                    container
                    .find('.row')
                    .each(function () {
                        var list = $(this);
                        autoScrollUp(
                            list,
                            list.find('.active')
                        );
                    });
                }
            });

            service
            .getHistorySubject()
            .then(function (response) {
                me.set('recommendClassify', response.data);
            });

            service
            .getSubjectList({
                keyword: ''
            })
            .then(function (response) {
                var data = {
                    courseClassifyList: formatClassifyList(response.data)
                };

                me.defaultChoose();

                $.each(
                    me.get('options.path_array'),
                    function (index, value) {
                        if (index == 0) {
                            data['chooseClassifyId.Id'] = value.id;
                        }
                        else if (index == 1){
                            data['chooseClassifyId.twoId'] = value.id;
                        }
                    }
                );

                me.set(data);

            });

            me.on('searchByEnter', function () {
                me.search();
            });

        },
        checkOneClassify: function (data) {
            var me = this;
            me.set({
                'chooseClassifyId.Id': data.id,
                'chooseClassifyId.twoId': '',
                'oneName': data.name
            });
            var courseList = me.get('courseClassifyList');
            var twoList = courseList.classifyListTwo;
            if (twoList) {
                me.checkTwoClassify(twoList[data.id][0]);
            }
        },
        checkTwoClassify: function (data) {
            var me = this;
            var subjectName = me.get('oneName') + '>' + data.name;
            me.set({
                'chooseClassifyId.twoId': data.id,
                'twoName': subjectName
            });
        },
        checkThreeClassify: function (data) {
            var me = this;
            var subjectName = me.get('twoName') + '>' + data.name;

            var id = data.id;

            me.set({
                'options.id': id,
                'options.name': subjectName
            });
            me.fire(
                'selectSubject',
                {
                    id: id,
                    subject: subjectName
                }
            );
        },
        selectSubject: function (data) {
            var me = this;
            var subject = '';
            subject = data.name
                    + '>'
                    + data.children[0].name
                    + '>'
                    + data.children[0].children[0].name;
            var id = data.children[0].children[0].id;

            me.set({
                'options.id': id,
                'options.name': subject
            });
            me.fire(
                'selectSubject',
                {
                    subject: subject
                }
            );
        },
        selectHistorySubject: function (data) {
            var me = this;
            var subjectName = data.path_crumbs;
            me.set({
                'options.id': data.id,
                'options.name': subjectName
            });
            me.fire(
                'selectSubject',
                {
                    subject: subjectName
                }
            );
        },
        search: function () {
            var me = this;
            service
            .getSubjectList({
                keyword: me.get('courseClassifyOptions.value')
            })
            .then(function (response) {
                me.set({
                    'courseClassifyList': formatClassifyList(response.data)
                });
                me.defaultChoose();
            });
        },
        defaultChoose: function () {
            var me = this;
            var courseList = me.get('courseClassifyList');
            var oneList = courseList.classifyListOne;
            var twoList = courseList.classifyListTwo;
            if (oneList) {
                me.checkOneClassify(oneList[0]);
                var oneId = oneList[0].id;
                if (twoList) {
                    me.checkTwoClassify(twoList[oneId][0]);
                }
            }
        },
        blankSearch: function () {
            var me = this;
            service
            .getSubjectList({
                keyword: ''
            })
            .then(function (response) {
                me.set({
                    'courseClassifyOptions.value': ''
                });

                me.set({
                    'courseClassifyList': formatClassifyList(response.data)
                });
                me.defaultChoose();
            });
        }

    });
})