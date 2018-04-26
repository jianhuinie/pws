/**
 * @file 三级科目下拉菜单
 * @author niejianhui
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('tribbleSubject', ['ajaxService', '$rootScope', '$timeout', 
            function (ajaxService, $rootScope, $timeout) {
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {Object} options.subjectId 选中的科目ID
                     * @params {Object} options.subjectName 选中的科目第三级名称
                     * @params {Object} options.pathCrumbs  已选中的科目名称
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/tribbleSubject/tpl.html',
                link: function($scope) {
                    //设置选中态
                    function setSubjectActive(subjectList, id) {
                        $.each(subjectList, function (index, item) {
                            if (item.id === id) {
                                item.active = true;
                            }
                            else {
                                item.active = false;
                            }
                        });
                    }

                    //向后端发送请求获取科目列表promise
                    function getSearchResultPromise(params) {
                        return ajaxService.send('/api/tcenter/subjects/list', {data: params || {}, method: 'GET'});
                    }

                    //根据科目找选中的科目ID 和当前级别所在的索引  方便下次查找
                    function findSubject(subjects, subjectName) {
                        var obj = {};
                        $.each(subjects, function (index, item) {
                            if (item.name === subjectName) {
                                obj.subjectId = item.id;
                                obj.index = index;
                                obj.name = item.name;
                                return false;
                            }
                        });
                        return obj;
                    }

                    //设置选中的三级科目菜单
                    function setTribbleActiveSubject(pathCrumbs, subjectId) {
                        var arr = pathCrumbs.split('>');
                        var level1Obj = findSubject($scope.level1Subjects, arr[0]);
                        if (level1Obj.name) {
                            $scope.level1SubjectName = level1Obj.name;
                            $scope.level1SubjectId = level1Obj.subjectId;
                            setSubjectActive($scope.level1Subjects, level1Obj.subjectId);
    
                            $scope.level2Subjects  = $scope.level1Subjects[level1Obj.index].children;
                            var level2Obj = findSubject($scope.level2Subjects, arr[1]);
                            if (level2Obj.name) {
                                $scope.level2SubjectName = level2Obj.name;
                                $scope.level2SubjectId = level2Obj.subjectId;
                                setSubjectActive($scope.level2Subjects, level2Obj.subjectId);
        
                                $scope.level3Subjects  = $scope.level2Subjects[level2Obj.index].children;
                                $scope.level3SubjectName = $scope.options.subjectName;
                                setSubjectActive($scope.level3Subjects, subjectId);
                            }
                            else {
                                $scope.toLevel3Subject($scope.level2Subjects[0]);
                            }
                        }
                        else {
                            $scope.toLevel2Subject($scope.level1Subjects[0]);
                        }
                    }

                    //获取科目列表并初始化
                    function getSearchResult(searchKey, isFromSearch) {
                        getSearchResultPromise({
                            keyword: searchKey
                        })
                        .then(function (response) {
                            if (response.data.length) {
                                $scope.level1Subjects = response.data;
                                var pathCrumbs = $scope.options.pathCrumbs;
                                if (pathCrumbs) {
                                    setTribbleActiveSubject(pathCrumbs, $scope.options.subjectId);
                                }
                                else if (isFromSearch) {
                                    $scope.toLevel2Subject($scope.level1Subjects[0]);
                                }
                            }
                            else {
                                $scope.level1Subjects = [];
                            }
                        });
                    }

                    //由一级科目ID获取二级科目
                    function getLevel2Subjects(level1SubjectId) {
                        $.each($scope.level1Subjects, function (index, item) {
                            if (item.id === level1SubjectId) {
                                $scope.level2Subjects = item.children;
                                return false;
                            }
                        });
                    }

                     //由二级科目ID获取三级科目
                     function getLevel3Subjects(level2SubjectId) {
                        $.each($scope.level2Subjects, function (index, item) {
                            if (item.id === level2SubjectId) {
                                $scope.level3Subjects = item.children;
                                return false;
                            }
                        });
                        setSubjectActive($scope.level3Subjects, '');
                    }

                    getSearchResult('', false);
                    $scope.searchKey = '';

                    //选一级科目到二级科目 + 三级科目
                    $scope.toLevel2Subject = function (level1Subject) {
                        $scope.level1SubjectName = level1Subject.name;
                        var level1SubjectId =  level1Subject.id;
                        $scope.level1SubjectId = level1SubjectId;
                        setSubjectActive($scope.level1Subjects, level1SubjectId);
                        getLevel2Subjects(level1SubjectId);
                        //默认选中二级第一个到三级
                        var level2SubjectId =  $scope.level2Subjects[0].id;
                        $scope.level2SubjectName = $scope.level2Subjects[0].name;
                        $scope.level2SubjectId = $scope.level2Subjects[0].id;
                        setSubjectActive($scope.level2Subjects, level2SubjectId);
                        getLevel3Subjects(level2SubjectId);
                    };

                    //选二级科目到三级科目
                    $scope.toLevel3Subject = function (level2Subject) {
                        $scope.level2SubjectName = level2Subject.name;
                        var level2SubjectId = level2Subject.id;
                        $scope.level2SubjectId = level2SubjectId;
                        setSubjectActive($scope.level2Subjects, level2SubjectId);
                        getLevel3Subjects(level2SubjectId);
                    };

                    //选完三级科目
                    $scope.finishSelectSubject = function (level3Subject) {
                        $scope.level3SubjectName = level3Subject.name;
                        var level3SubjectId = level3Subject.id;
                        $scope.level3SubjectId = level3SubjectId;
                        setSubjectActive($scope.level3Subjects, level3SubjectId);
                        var arr = [];
                        arr.push($scope.level1SubjectName);
                        arr.push($scope.level2SubjectName);
                        arr.push($scope.level3SubjectName);

                        var idsArr = [];
                        idsArr.push($scope.level1SubjectId);
                        idsArr.push($scope.level2SubjectId);
                        idsArr.push($scope.level3SubjectId);

                        $scope.options.onSelected({
                            id: level3SubjectId,
                            pathCrumbs:  arr.join('>'),
                            pathMark:  idsArr.join(',') + ',' + arr.join(',')
                            // eventName: 'selectTribbleSubject'
                        });
                    };
                    
                    //搜索
                    $scope.doSearch = function () {
                        if ($scope.searchKey) {
                            getSearchResult($scope.searchKey, true);
                            $scope.searchKey = '';
                        }
                    };

                    //搜索全部类目
                    $scope.searchAll = function () {
                        getSearchResult('', true);
                    };

                    // //监听选中历史科目
                    // $scope.$on('selectHistorySubject', function (e, data) {
                    //     setTribbleActiveSubject(data.pathCrumbs, data.id);
                    // });

                    //添加watch
                    $scope.$watch('options.subjectId', function (newVal) {
                        if (newVal && $scope.level1Subjects) {
                            setTribbleActiveSubject($scope.options.pathCrumbs, newVal);
                        }
                    });

                }
            };
        }]);
});
