/**
 * @file 班课预览
 * @author jiahuayan
 */

 define(function (require, exports) {
    
    'use strict'

    var store = require('common/store');
    var Dialog = require('cobble/ui/Dialog');
    require('tpl!./preview.tpl');

    exports.init = function(datas) {

        var lesswayMap = {
            '4': '线下授课',
            '2': '在线授课（支持手机观看）'
        };
        var total_pay = store.get('totalPay');
        var course_number = store.get('courseNumber');
        datas.basicData.lesson_way = lesswayMap[datas.basicData.lesson_way];
        datas.basicData.total_pay = total_pay;
        if (!course_number) {
            course_number = '11111111';
        } 
        datas.basicData.course_number = course_number;
        var photobox = $('#class-course-photo');
        var photoitems = photobox.find('.uploaded-item img');
        var coverid = datas.photoData.cover;
        var coversrc = '';
        $.each(datas.photoData.photos, function(i, item) {
            item.src = $(photoitems[i]).attr('src');
            if (coverid && item.storage_id == coverid) {
                coversrc = item.src;
            }
        });
        
        datas.photoData.cover = {
            id: coverid,
            url: coversrc
        }

        var retireFlagMap = {
            '0': '随时可退',
            '1': '开班前1小时不可退',
            '2': '第' + datas.quitData.retire_length + '节课开始后不可退'
        };
        datas.quitData.retire_flag = retireFlagMap[datas.quitData.retire_flag];

        var chabanFlagMap = {
            '1': '不可插班',
            '2': '第' + datas.quitData.chaban_quota + '节课开始前可插班',
            '3': '随时可插班'
        };
        datas.quitData.chaban_flag = chabanFlagMap[datas.quitData.chaban_flag];

        var schedueItem = $('#class-course-schedue .plan-item');
        var planList = datas.schedueData.planList;
        var courseLength = 0;
        $.each(planList, function(i, item) {
            var start = item.startTime;
            var end = item.endTime;
            var length = (end - start) / (60 * 60) ;
            courseLength += length; 
            var $schedueItem = $(schedueItem[i]);
            var time = $schedueItem.find('.course-date').html() 
                + ' '
                + $schedueItem.find('.start-time').html()
                + '至'
                + $schedueItem.find('.end-time').html();
            var teacher = '';
            var content = $schedueItem.find('.added-content').html() || '';
            if ($schedueItem.find('.selected-teacher').length) {
                teacher = $schedueItem.find('.selected-teacher').html();
            } else {
                teacher = store.get('teacherInfo').display_name;
            }
            
            item.length = length;
            item.time = time;
            item.content = content;
            item.teacher = teacher;
        });
        datas.schedueData.planList.courseLength = courseLength;
        var teacherList = store.get('teacherList');
        var organization = store.get('organization');
        var teacherInfo = store.get('teacherInfo');
        var isOrganization = false;
        if (teacherList) {
            isOrganization = true;
            if (!organization.avatar) {
                organization.avatar = 'http://test.genshuixue.com/asset/img/org/logo_35c5eacab8.jpg';
            }
        }
        datas.tplData = {
            isOrganization: isOrganization,
            organization: organization,
            teacherInfo: teacherInfo
        }
        
        //计算时长，保存图片地址 上课方式
        var content = Simplite.render('privew', datas);
        var dialog = new Dialog({
            title: '班课预览',
            content: content,
            skinClass: 'dialog-preview',
            width: 1100
        });
    };
 });