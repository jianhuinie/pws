define(function (require, exports) {

    var Validator = require('common/Validator');
    var store = require('common/store');
    var service = require('common/service');
    var cookie = require('cobble/util/cookie');
    var Dialog = require('cobble/ui/Dialog');
    var Editor = require('common/component/Editor');

    var Select = require('cobble/form/Select');

    var CategorySelect = require('common/center/component/CategorySelect');
    var AddressDialog = require('common/component/AddressDialog');
    var EditGuideDialog = require('./schedue/EditGuideDialog');
    var courseClassify = require('./basicInfo/courseClassify');

    var holder, categorySelect, subjectSelect, addressSelect, validator;

    var eventEmitter;

    var addressDialog;
    var org_id, errorMsgs;

    //判断老师免费在线授课人数
    var judgeMember = function () {
        var checkbox = holder.find('input[name="lesson_way"]');
        var live ;
        $.each(checkbox, function(i, obj){
            var me = $(obj);
            if (me.is(':checked')) {
                live = i;
            }
        });
        if(live == 1) {
            if(holder.find('input[name="price"]').val() == 0) {
                var max_student = holder.find('input[name="maxStudent"]').val() ;
                if (store.get('vip_level') == 0 ) {
                    if (max_student > 500) {
                        if (org_id == 0) {
                            alert({
                                title: '温馨提示',
                                content: '非会员用户免费直播课最高上限500人，开通会员获得更高上限',
                                width: 300,
                                skinClass: 'vip-dialog',
                                buttons: [
                                    {
                                        text: '立即开通',
                                        type: 'primary',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_center";
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '了解详情',
                                        type: 'default',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_detail?type=freeLive";
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        else {
                            alert({
                                title: '温馨提示',
                                content: '非会员用户免费直播课最高上限500人，联系机构开通会员获得更高上限',
                                width: 300,
                                skinClass: 'vip-dialog',
                                buttons: [
                                    {
                                        text: '我知道了',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        holder.find('input[name="maxStudent"]').val(0).focus();
                    }
                }
                else if (store.get('vip_level') == 1) {
                    if (max_student > 1000) {
                        if (org_id == 0) {
                            alert({
                                title: '温馨提示',
                                content: '普通会员用户免费直播课最高上限1000人，开通会员获得更高上限',
                                width: 300,
                                skinClass: 'vip-dialog',
                                buttons: [
                                    {
                                        text: '立即开通',
                                        type: 'primary',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_center";
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '了解详情',
                                        type: 'default',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_detail?type=freeLive";
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        else {
                            alert({
                                title: '温馨提示',
                                content: '普通会员用户免费直播课最高上限1000人，联系机构开通更高级别会员获得更高上限',
                                width: 300,
                                skinClass: 'vip-dialog',
                                buttons: [
                                    {
                                        text: '我知道了',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        holder.find('input[name="maxStudent"]').val(0).focus();
                    }
                }
                else if (store.get('vip_level') == 2) {
                    if (max_student > 3000) {
                        if (org_id == 0) {
                            alert({
                                title: '温馨提示',
                                content: '高级会员用户免费直播课最高上限3000人，开通超级会员获得更高上限',
                                width: 300,
                                skinClass: 'vip-dialog',
                                buttons: [
                                    {
                                        text: '立即开通',
                                        type: 'primary',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_center";
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '了解详情',
                                        type: 'default',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_detail?type=freeLive";
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        else {
                            alert({
                                title: '温馨提示',
                                content: '高级会员用户免费直播课最高上限3000人，联系机构开通更高级别会员获得更高上限',
                                width: 300,
                                skinClass: 'vip-dialog',
                                buttons: [
                                    {
                                        text: '我知道了',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        holder.find('input[name="maxStudent"]').val(0).focus();
                    }
                }
            }
        }
    }

    var initCategory = function () { // 科目
        var selectedSubject;
        var categorySelect = new CategorySelect({
            element: holder,
            onChange: function (e, data) {
                eventEmitter.emit('category-change', data);
            },
            onloadData: function () {
                if (selectedSubject = info.selected_subject){
                    categorySelect.setValue(selectedSubject);
                }
            }
        });

        return categorySelect;
    };

    var initAddress = function () {
        var addressSelect = new Select({
            element: holder.find('.address-selector'),
            name: 'address',
            onChange: function (e, data) {
                data = $.extend(true, {}, data);
                eventEmitter.emit('address-change', data);
            }
        });

        var userAddressId = holder.find('.address-selector li.active').data('value');
        if (userAddressId) {
            addressSelect.setValue(userAddressId);
        }

        return addressSelect;
    };

    var initSubject = function () { // 已设科目列表
        var initData;
        var subjectSelect = new Select({
            element: holder.find('.exists-subjects'),
            name: 'subject',
            onChange: function (e, data) {
                eventEmitter.emit('category-change', data);
            }
        });

        if (initData = info.selected_subject){
            subjectSelect.setValue(initData[2].id);
        }

        return subjectSelect;
    };

    var initValidator = function () {
        var validator = new Validator({
            rules: {
                required: function (val) {
                    return !!val;
                },
                num: function (val) {
                    return !isNaN(val);
                },
                max: function (max) {
                    return +this.value <= +max;
                },
                maxlength: function (len) {
                    return this.value.length <= +len;
                },
                maxPrice: function () {
                    return (999999.99 - this.value) >= 0;
                },
                lessThanorigin: function () {
                    var originalPrice = $.trim(holder.find('[name="originalPrice"]').val());
                    var price = $.trim(holder.find('[name="price"]').val());
                    if (!originalPrice && price) {
                        return true
                    } else if (originalPrice && price) {
                        if (+price <= +originalPrice) {
                            return true;
                        }
                    }
                    return false;
                },
                dependsOffline: function () {
                    var way = holder.find('[name="lesson_way"]:checked').val();
                    var offline = 4;
                    if (way == offline) {
                        return true;
                    } else {
                        return {
                            force: true
                        }
                    }
                },
                optional: function (val) {
                    if (!val) {
                        return {
                            force: true
                        }
                    } else {
                        return true;
                    }
                },
                radixpoint: function (len) {
                    var val = this.value;
                    var reg = new RegExp('^\\d+(?:\\.\\d{1,' + len + '})?$');
                    return reg.test(val);
                },
                integer: function (val) {
                    return /^\d+$/g.test(val);
                }
                /*,
                onlineMaxnum: function (val) {
                    var lessonWay = holder.find('[name="lesson_way"]:checked').val();
                    if (lessonWay == '2' && val > 5000) {
                        return false;
                    }
                    return true;
                }*/
            },
            elements: {
                name: ['required', 'maxlength:' + store.get('courseNameWords')],
                category: ['required'],
                lessonWay: ['required'],
                address: ['dependsOffline', 'required'],
                price: ['required', 'num', 'radixpoint:2', 'maxPrice', 'lessThanorigin'],
                originalPrice: ['optional', 'num', 'radixpoint:2', 'maxPrice', 'lessThanorigin'],
                maxStudent: ['required', 'num', 'integer'], // , 'onlineMaxnum'
                courseInfor: ['required','maxlength:200']
            },
            notifier: {
                '*': function (result, type, name) {
                    var $tipContainer = $(this).parents('.form-controls').find('.input-tip-container');
                    var msg;
                    if (name === 'category') {
                        var classCategoryNode = holder.find('.class-category-container');
                        var existsSubjectsNode = holder.find('.exists-subjects-container');
                        if (classCategoryNode.is(':visible')) {
                            $tipContainer = classCategoryNode.find('.input-tip-container');
                        } else if (existsSubjectsNode.is(':visible')) {
                            $tipContainer = existsSubjectsNode.find('.input-tip-container');
                        } else {
                            $tipContainer = holder.find('.classify-keyword-container').find('.input-tip-container');
                        }
                    } else if (name === 'lessonWay') {
                        $tipContainer = holder.find('[name="lesson_way"]').closest('.form-controls').find('.input-tip-container');
                    } else if (name === 'address') {
                        $tipContainer = holder.find('.address-selector').parent().parent().find('.input-tip-container');
                    }

                    if (type == 'lessThanorigin' && result) {
                        var $tipContainer1 = holder.find('[name="price"]').parent().parent().find('.input-tip-container');
                        var $tipContainer2 = holder.find('[name="originalPrice"]').parent().parent().find('.input-tip-container');
                        $tipContainer1.removeClass('invalid').addClass('valid').find('.icon-info-circle').text('');
                        $tipContainer2.removeClass('invalid').addClass('valid').find('.icon-info-circle').text('');
                    }

                    if (result) {
                        $tipContainer.removeClass('invalid').addClass('valid').find('.icon-info-circle').text('');
                    } else {
                        $tipContainer.addClass('invalid').removeClass('valid');
                        if (msg = errorMsgs[name][type]) {
                            $tipContainer.find('.icon-info-circle').text(msg);
                        }
                    }
                }
            },
            vals: {
                category: function () {
                    if (holder.find('.class-category-container').is(':visible')) {
                        return categorySelect.getValue();
                    }
                    if (holder.find('.exists-subjects-container').is(':visible')) {
                        return subjectSelect.getValue();
                    }
                    if (holder.find('.classify-keyword-container').is(':visible')) {
                        return false; // 查询科目，返回值为false
                    }
                    return true; // 不可更改科目时直接返回true
                },
                lessonWay: function () {
                    return holder.find('[name="lesson_way"]:checked').val();
                },
                address: function () {
                    return addressSelect.getValue();
                },
                maxStudent: function () {
                    var val = holder.find('[name="maxStudent"]').val();
                    return +val;
                }
            }
        });

        validator.init(holder);

        validator.add('category');
        if (!store.get('totalPay')) {
            validator.add('lessonWay');
        }
        validator.add('address');

        return validator;
    };
    // 获取科目信息
    var getCategoryLabel = function () {

        var labels = [];
        var textClass = categorySelect.categorySelect1.labelSelector;
        if (holder.find('.class-category-container').is(':visible')) {
            labels.push(categorySelect.categorySelect1.element.find(textClass).text());
            labels.push(categorySelect.categorySelect2.element.find(textClass).text());
            labels.push(categorySelect.categorySelect3.element.find(textClass).text());
        } else {
            labels.push(subjectSelect.element.find(textClass).text());
        }
        return labels;
    };

    var formatAddressData = function (datas) {
        var address = [];
        $.each(datas, function (idx, item) {
            address.push({
                text: item.regular_address.location_addr,
                value: item.id
            });
        });
        return address;
    };

    exports.init = function (evt, datas) {

        // 错误信息
        errorMsgs = {
            name: {
                required: '班课名称不能为空',
                maxlength: '不能超过' + store.get('courseNameWords') + '个字符'
            },
            category: {
                required: '班课科目不能为空'
            },
            lessonWay: {
                required: '请选择一种上课方式'
            },
            address: {
                required: '请选择上课地址'
            },
            price: {
                required: '请输入现价',
                num: '价格只能为数字',
                radixpoint: '价格最多只能为2位小数',
                maxPrice: '价格最高为999999.99',
                lessThanorigin: '现价不能高于原价'
            },
            originalPrice: {
                num: '价格只能为数字',
                radixpoint: '价格最多只能为2位小数',
                maxPrice: '价格最高为999999.99',
                lessThanorigin: '原价不能低于现价'
            },
            maxStudent: {
                required: '请输入最大班课人数，且不能为0',
                num: '班课人数只能是数字',
                integer: '班课人数只能整数'// ,
                // onlineMaxnum: '在线课程班级最大人数不能超过5000'
            },
            courseInfor: {
                required: '请描述课程信息'
            }
        };

        holder = this;

        //是否是机构老师
        service
        .getUserBasicInfo()
        .done(function (response) {
            if (response.code === 0) {
                org_id = response.data.org_id;
            }
        });
        var freeCourseHint = holder.find('.for-freecourse');

        var noteEditor = new Editor({
            element: holder.find('.form-editor'),
            maxLength: 200
        });
        noteEditor.setValue(
            noteEditor.getValue()
        );

        holder.noteEditor = noteEditor;

        eventEmitter = evt;

        info = store.get('basicInfo') || {};

        var classCategoryContainer = holder.find('.class-category-container');
        var existsSubjectsContainer = holder.find('.exists-subjects-container');
        var classifyKeywordContainer = holder.find('.classify-keyword-container');
        var classAddressItem = holder.find('.class-address');

        courseClassify.init(
            classifyKeywordContainer,
            function (data) {
                if (data && data.subject_path) {
                    categorySelect.setValue(data.subject_path);
                }
                holder.find('.to-class-category').trigger('click');
            }
        );

        categorySelect = initCategory();
        addressSelect = initAddress();
        subjectSelect = initSubject();
        var addressData = info.address_list || [];
        addressData = formatAddressData(addressData);
        validator = initValidator({
            categorySelect: categorySelect
        });

        eventEmitter.on('category-change', function (events, data) {
            validator.validate('category');
        });

        eventEmitter.on('address-change', function (events, data) {
            validator.validate('address');
        });

        holder
        .on('blur', '[name="maxStudent"]', function () {
            //是否需要限制班课人数
            //2016-01-19 24:00:00之前创建的课程人数不做限制
            var is_limit = 1;
            var create_time = store.get('basicInfo').create_time
            if (create_time < '1453219200') {
                is_limit = 0;
            }
            //验证班课最大人数
            if (is_limit) {
                //判断班课最大人数
                judgeMember();
            }

        })
        .on('change', '[name="lesson_way"]', function () {
            var isOfflineClass = this.value === '4';
            classAddressItem.toggle(isOfflineClass);
            validator.validate('lessonWay');

            if (this.value == 2) {

                store.set('lessonWay', 2);
                if (store.get('price') == 0) {
                    freeCourseHint.show();
                }

                holder.find('.pad-type-tip').addClass('show');
                service.onLineTip()
                .done(function (response) {
                    if (response.code == 0) {
                        var isFirstOnline = response.data.is_first_online_class_course;
                        var networkSpeedNotice = response.data.network_speed_notice;
                        if (isFirstOnline) {
                            holder.find('.first-live').show();
                        }
                        if (networkSpeedNotice) {
                            holder.find('.forign-ip').show();
                        }
                    }
                });
                var notip = cookie.get('classCourse-liveinfo-notip');
                if (notip) {
                    return;
                }
                var content = ''
                    + '<div class="msg-content-title">'
                        + '跟谁学直播课须知'
                    + '</div>'
                    + '<div class="dialog-content">'
                        + '<ul class="info-con">'
                            + '<li>1、请事先熟悉跟谁学直播课<a class="download" href="http://www.genshuixue.com/guide/teacher_layout?a=teacher&op=online" target="_blank">授课流程</a>，注意开课时间，建议直播前半小时进入课堂，提前测试设备及网络环境，等待直播课开始；</li>'
                            + '<li>2、建议首选联通、电信网络—4M或以上独享带宽，上课时建议用网线连接、不建议WIFI连接，可能会造成直播卡顿，无法进入直播等情况；</li>'
                            + '<li>3、使用电脑直播授课效果最为流畅，功能也最为完善,强烈推荐使用跟谁学直播助手，<a class="download" href="http://www.genshuixue.com/static/windows" target="_blank" style="color:orange">点击下载</a>；</li>'
                            + '<li>4、课堂注意事项：直播老师请注意开课时间并提前到课，不迟到、早退、旷课，保证正常直播课的授课效果；</li>'
                            + '<li>5、如有问题：可通过电话4000-910-910，010-86448910（服务时间9：00-23：00），邮件service@genshuixue.com与跟谁学客服及时取得联系，我们的客服会耐心帮您解决问题；</li>'
                            + '<li>6、<span class="text-error">如果您在国外</span>，跨国的网络情况可能无法保证，请确保您连通国内所有网站速度正常，谨慎开课；</li>'
                            + '<li>7、<span class="text-error">老师在开课前4小时可以进入教室上传课件或备课。</span></li>'
                            + '<li>8、<span class="text-error">如平时想体验直播或备课，可随时使用体验教室。</span></li>'
                        + '</ul>'
                        + '<div class="info-checkbox">'
                            + '<label class="form-checkbox checked">'
                                + '<input type="checkbox" name="confirm_check" value="1" checked/>我已阅读并同意该须知'
                            + '</label>'
                            + '</br>'
                            + '<label class="form-checkbox checked">'
                                + '<input type="checkbox" name="confirm_check" value="2"/>不再提醒我'
                            + '</label>'
                        + '</div>'
                    + '</div>'
                    + '<div class="dialog-action">'
                        + '<button class="btn btn-primary btn-confirm">'
                            + '我知道了'
                        + '</button>'
                    + '</div>';

                var dialog = new Dialog({
                    title: '温馨提示',
                    skinClass: 'dialog-lesson-way',
                    content: content,
                    width: 880
                });
                var ele = dialog.element;
                var checkresulte = 0;
                ele
                .on('change', ':checkbox[name="confirm_check"]', function(e) {
                    var checkbox = ele.find(':checkbox[name="confirm_check"]');
                    checkresulte = 0;
                    $.each(checkbox, function(i, obj){
                        var me = $(obj);
                        if (me.is(':checked')) {
                            checkresulte = checkresulte + parseInt(me.prop('value'));
                        }
                    });

                    //如果只选择不再提醒
                    if (checkresulte == 0 || checkresulte == 2) {
                        ele.find('.btn-confirm').attr('disabled', true);
                        ele.find(':radio[value="4"]').click();
                    } else {
                        //选中我知道了
                        ele.find('.btn-confirm').removeAttr('disabled');
                    }
                    //两个都选，才写cookie记录不再提醒
                })
                .on('click', '.dialog-close', function(e) {
                    if (checkresulte == 0 || checkresulte == 2) {
                        ele.find('.btn-confirm').attr('disabled', true);
                    }
                    element.find(':radio[value="4"]').click();
                })
                .on('click', '.btn-confirm', function(e) {
                    dialog.hide();
                    if (checkresulte == 3) {
                        cookie.set('classCourse-liveinfo-notip', 'true');
                    }
                });
            } else {
                freeCourseHint.hide();
                holder.find('.online-tip').hide();
                holder.find('.pad-type-tip').removeClass('show');
            }
        })

        .on('blur', '[name="price"]', function () {
            var price = $(this).val();
            store.set('price', price);
            if (store.get('lessonWay') == 2 && price == 0) {
                freeCourseHint.show();
            } else {
                freeCourseHint.hide();
            }
        })

        .on('click', '.add-address', function () {

            if (!addressDialog) {
                addressDialog = new AddressDialog({
                    onSuccess: function (data, area, repsoneData) {
                        var adddata = {
                            text: repsoneData.location_addr,
                            value: repsoneData.id
                        };
                        addressData.push(adddata);
                        addressSelect.refresh({
                             data: addressData,
                             value: repsoneData.id
                        });

                        //addressSelect.setValue(data.value);
                        holder.find('.address-selector-container').removeClass('hide');
                        if (addressData.length >= 10) {
                            holder.find('.add-address').hide();
                        }
                    }
                });
            } else {
                $('.location-addr textarea').attr('disabled', true);
            }

            addressDialog.dialog.show();
        })

        .on('click', '.from-exists', function () { // 从已设科目中选择
            classifyKeywordContainer.addClass('hide');
            classCategoryContainer.addClass('hide');
            existsSubjectsContainer.removeClass('hide');
        })

        .on('click', '.to-class-category', function () { // 从全部科目中选择
            classifyKeywordContainer.addClass('hide');
            classCategoryContainer.removeClass('hide');
            existsSubjectsContainer.addClass('hide');
        })

        .on('click', '.subjects-search', function () { // 科目查询
            classCategoryContainer.addClass('hide');
            existsSubjectsContainer.addClass('hide');
            classifyKeywordContainer.removeClass('hide');
        })

        .on('click', '.edit-guide', function () {
            new EditGuideDialog({
                onSuccess: function (data) {
                    var text = holder.find('.textarea');
                    text.val(data.courseInfo);
                    text.focus();
                }
            });
        });
    };

    exports.validate = function (name) {
        return validator.validate(name);
    };

    exports.getData = function () {
        var limit = holder.find('[name = "limit"]');
        var name = $.trim(holder.find('input[name="name"]').val());
        if (holder.find('.class-category-container').is(':visible')) {
            var subject = categorySelect.getValue();
        } else {
            var subject = subjectSelect.getValue();
        }
        var lessonWay = info.lesson_way;
        if (!store.get('totalPay')) {
            lessonWay = holder.find('[name="lesson_way"]:checked').val();
        }
        var address = addressSelect.getValue();
        // var lessonTarget = $.trim(holder.find('input[name="target"]').val());
        // var crowd = $.trim(holder.find('input[name="crowd"]').val());
        var price = $.trim(holder.find('input[name="price"]').val());
        var originalPrice = $.trim(holder.find('input[name="originalPrice"]').val());
        var maxStudent = +$.trim(holder.find('input[name="maxStudent"]').val());
        var information = $.trim(holder.find('.textarea').val());
        var limitChecked ="";
        if (limit.prop("checked") == true) {
            limitChecked = 1;
        }
        else {
            limitChecked = 0;
        }
        return {
            name: name,
            subject: subject,
            lesson_way: lessonWay,
            address: address,
            // target: lessonTarget,
            // student_desc: crowd,
            information: information,
            price: price,
            original_price: originalPrice,
            max_student: maxStudent,
            categoryLabels: getCategoryLabel(),
            is_auto_incr: limitChecked
        };
    };
});