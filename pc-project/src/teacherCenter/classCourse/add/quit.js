/**
 * 报班设置
 */
define(function (require, exports) {

    var Validator = require('common/Validator');
    var store = require('common/store');
    var cookie = require('cobble/util/cookie');
    var Dialog = require('cobble/ui/Dialog');

    var holder, validator;
    var errorMsgs = {
        retireFlag: {
            required: '请选择退班规则'
        },
        retireLength: {
            required: '请输入课节',
            num: '请输入数字',
            integer: '课节只能为大于零的整数',
            dependClassSchedue: '退课班节需小于班课课节'
        },
        chabanFlag: {
            required: '请选择插班规则'
        },
        chabanQuota: {
            required: '请输入课节',
            num: '请输入数字',
            integer: '课节只能为大于零的整数',
            dependClassSchedue: '插班班节不能大于班课课节'
        },
        chabanPriceFlag: {
            required: '请设置插班价格'
        },
        chabanPrice: {
            required: '请输入价格',
            num: '价格必须为数字',
            radixpoint: '插班价格最多2位小数',
            dependClassPrice: '插班价需小于班课现价'
        },
        openStatus: {
            required: '请选择开班方式',
            dependsClassStartTime: '当前距离课程开始已不足3天, 不能设置保底开班人数'
        },
        minStudent: {
            required: '请输入最少学生数',
            num: '学生数量只能是数字',
            integer: '学生数量只能为大于零整数',
            max: '保底人数不能大于100',
            dependClassTotal: '保底人数不能大于班级总人数'
        }
    };

    var dependsData = {};

    var initValidator = function (options) {
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
                depends: function (flag) {
                    var selected = $.trim($(this.element).closest('.form-controls').find(':radio:checked').val());
                    if ($(this.element).data('validateName') == 'minStudent') {
                        selected = $.trim(holder.find('.open-group [name="open_status"]:checked').val());
                    }
                    if (selected == flag) {
                        return true;
                    } else {
                        return {
                            force: true
                        }
                    }
                },

                integer: function (val) {
                    return (/^\d+$/g.test(val) && val > 0);
                },
                radixpoint: function (len) {
                    var val = this.value;
                    var reg = new RegExp('^\\d+(?:\\.\\d{1,' + len + '})?$');
                    return reg.test(val);
                },
                dependClassTotal: function () {
                    if (dependsData.classTotal != null) {
                        return +this.value <= dependsData.classTotal;
                    } else {
                        return true;
                    }
                },
                dependClassSchedue: function () {
                    if (dependsData.classSchedue != null) {
                        return +this.value <= dependsData.classSchedue;
                    } else {
                        return true;
                    }
                },
                dependClassPrice: function () {
                    if (dependsData.price != null) {
                        return +this.value <= dependsData.price;
                    } else {
                        return true;
                    }
                },
                dependsClassStartTime: function () {
                    if (store.get('totalPay')) {
                        return true;
                    }
                    var flag = $.trim(holder.find(':radio[name="open_status"]:checked').val());
                    if (flag == 2 && dependsData.startTime != null) {
                        return dependsData.startTime * 1000 - (new Date().getTime()) > 24 * 3600 * 3 * 1000;
                    } else {
                        return true;
                    }
                }
            },
            elements: {
                retireFlag: ['required'],
                retireLength: ['depends:2', 'required', 'num', 'integer', 'dependClassSchedue'],
                chabanFlag: ['required'],
                chabanQuota: ['depends:2', 'required', 'num', 'integer', 'dependClassSchedue'],
                chabanPriceFlag: ['required'],
                chabanPrice: ['depends:2', 'required', 'num', 'radixpoint:2', 'dependClassPrice'],
                openStatus: ['required', 'dependsClassStartTime'],
                minStudent: ['depends:2', 'required', 'num', 'integer', 'max:100', 'dependClassTotal']
            },
            notifier: {
                '*': function (result, type, name) {
                    var container;
                    if (name == 'openStatus') {
                        container = holder.find('.open-group').find('.input-tip-container');
                    } else if (name == 'retireFlag') {
                        validator.validate('retireLength');
                        return;
                    } else if (name == 'chabanFlag') {
                        validator.validate('chabanQuota');
                        return;
                    } else if (name == 'chabanPriceFlag') {
                        validator.validate('chabanPrice');
                        return;
                    } else if (name == 'retireLength') {
                        holder.find('.retire-group .input-tip-container').removeClass('invalid').removeClass('valid');
                        container = holder.find('.retire-group [name="retire_flag"]:checked').parents('.radiobox').find('.input-tip-container');
                    } else if (name == 'chabanQuota') {
                        holder.find('.chaban-group .input-tip-container').removeClass('invalid').removeClass('valid');
                        container = holder.find('.chaban-group [name="chaban_flag"]:checked').parents('.radiobox').find('.input-tip-container');
                    } else {
                        container = $(this).closest('.form-controls').find('.input-tip-container');
                    }
                    if (!result) {
                        container.addClass('invalid').removeClass('valid');
                        var msg = errorMsgs[name][type];
                        if (msg) {
                            container.find('.icon-info-circle').text(msg);
                        }
                    } else {
                        container.addClass('valid').removeClass('invalid');
                    }

                }
            },
            vals: {
                retireFlag: function () {
                    return $.trim(holder.find(':radio[name="retire_flag"]:checked').val());
                },
                chabanFlag: function () {
                    return $.trim(holder.find(':radio[name="chaban_flag"]:checked').val());
                },
                chabanPriceFlag: function () {
                    return $.trim(holder.find(':radio[name="chaban_price_flag"]:checked').val());
                },
                openStatus: function () {
                    return $.trim(holder.find(':radio[name="open_status"]:checked').val());
                }
            }
        });

        validator.init(holder);

        validator.add('retireFlag');
        validator.add('chabanFlag');
        validator.add('chabanPriceFlag');
        validator.add('openStatus');

        return validator;
    };


    exports.init = function () {
        var openRuleGroup;
        holder = $(this);
        validator = initValidator();
        openRuleGroup = holder.find('.open-rule-group');

        holder.on('focus', '.short-text', function () {
            $(this).siblings('label').find('input:radio').prop('checked', true);
        });
        var setQuitStatus = function (name) {
            var status = '';
            if (name == 'open_status') {
                status = $.trim(holder.find(':radio[name="open_status"]:checked').val());
                if (status == '2') {
                    validator.validate('openStatus').done(function (result) {
                        if (result){
                            openRuleGroup.show();
                        }
                    });
                } else {
                    openRuleGroup.hide();
                }
            } else if (name == 'chaban_flag') {
                status = $.trim(holder.find(':radio[name="chaban_flag"]:checked').val());
                if (status == '1') {
                    holder.find('.chaban-price-group').hide();
                } else {
                    holder.find('.chaban-price-group').show();
                }
            }
        };

        holder.on('click', ':radio', function () {
            var name = $(this).attr('name');
            setQuitStatus(name);
            name = name.replace(/_(.)/g, function (str, a) {
                return a.toUpperCase();
            });
            validator.validate(name);
        })
        .on('change', '[name="open_status"]', function () {
            var notip = cookie.get('classCourse-openStatus-notip');
            if (notip) {
                return;
            }
            var verifyStatus = store.get('verifyStatus');
            //审核未通过且选择了保底开班的 出弹窗提示
            if (this.value == 2 && !verifyStatus) {
                var content = ''
                    + '<div class="dialog-content">'
                        + '注意：设置了保底开班后，当报名学生人数没有达到最低开班人数时，开班前3天将会自动关班，所有已报名学生将自动退款，同时保底开班课程不支持关闭平台保障。请确认是否设置'
                        + '<div class="info-checkbox">'
                            + '<label class="form-checkbox">'
                                + '<input type="checkbox" name="confirm_check" value="1"/>不再提醒我'
                            + '</label>'
                        + '</div>'
                    + '</div>'
                    + '<div class="dialog-action">'
                        + '<button class="btn btn-primary btn-confirm">'
                            + '确认保底开班'
                        + '</button>'
                        + '<button class="btn btn-default btn-cancel">'
                            + '再考虑下'
                        + '</button>'
                    + '</div>';
                var dialog = new Dialog({
                    title: '温馨提示',
                    skinClass: 'dialog-open-status',
                    content: content,
                    width: 450
                });
                var ele = dialog.element;
                var checkresulte = 0;
                ele
                .on('click', '.btn-confirm', function (e) {
                    var checkbox = ele.find(':checkbox[name="confirm_check"]');
                    if (checkbox.is(':checked')) {
                        cookie.set('classCourse-openStatus-notip', 'true');
                    }
                    dialog.hide();
                })
                .on('click', '.dialog-close', function (e) {
                    dialog.hide();
                })
                .on('click', '.btn-cancel', function (e) {
                    dialog.hide();
                });
            }
        });


        // holder.find('.open-group').on('click', ':radio', function () {
        //     var status = $.trim(holder.find(':radio[name="open_status"]:checked').val());
        //     if (status == '2') {
        //         validator.validate('openStatus').done(function (result) {
        //             if (result){
        //                 openRuleGroup.show();
        //             }
        //         });
        //     } else {
        //         openRuleGroup.hide();
        //     }
        // });

    };

    exports.validate = function (name) {

        return validator.validate(name);
    };

    exports.getData = function () {
        var retireFlag = $.trim(holder.find(':radio[name="retire_flag"]:checked').val());
        var retireLength = retireFlag == 2 ? $.trim(holder.find('.retire-group .short-text').val()) : '';
        var chabanFlag = $.trim(holder.find(':radio[name="chaban_flag"]:checked').val());
        var chabanQuota = chabanFlag == 2 ? $.trim(holder.find('.chaban-group .short-text').val()) : '';
        var chabanPriceFlag = $.trim(holder.find(':radio[name="chaban_price_flag"]:checked').val());
        var chabanPrice = chabanPriceFlag == 2 ? $.trim(holder.find('.chaban-price-group .short-text').val()) : '';
        var openStatus = $.trim(holder.find(':radio[name="open_status"]:checked').val());
        var minStudent = openStatus == 2 ? $.trim(holder.find('.open-rule-group .short-text').val()) : '';
        var bsSwitch = holder.find('input[name="bs_switch"]').prop('checked');
        if (retireFlag == 1) {
            retireLength = 3600;
        } else if (retireFlag == 0) {
            retireLength = '';
        }
        return {
            retire_flag: retireFlag,
            retire_length: retireLength,
            chaban_flag: chabanFlag,
            chaban_quota: chabanQuota,
            chaban_price_flag: chabanPriceFlag,
            chaban_price: chabanPrice,
            open_status: openStatus,
            min_student: minStudent,
            bs_switch: bsSwitch ? 1 : 0
        };
    };

    exports.setDependsData = function (data) {
        if (!data) {
            return false;
        }
        if (data.price != null) {
            dependsData.price = data.price;
        }

        if (data.max_student != null) {
            dependsData.classTotal = data.max_student;
        }

        if (data.startTime != null) {
            dependsData.startTime = data.startTime;
        }

        if (data.allClass != null) {
            dependsData.classSchedue = data.allClass;
        }
    };

    exports.resetDependsData = function () {
        dependsData.price = null;
        dependsData.classTotal = null;
        dependsData.startTime = null;
        dependsData.classSchedue = null;
    };
});