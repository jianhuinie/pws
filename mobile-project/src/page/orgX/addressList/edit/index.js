define(function(require) {

    'use strict';

    var $ = require('zepto');
    var service = require('common/service');
    var ui = require('common/ui');
    // var store = require('common/store');


    var scriptData;

    function getPlace() {
        var memoryProVal;
        var memoryCityVal;
        var memoryAreaVal;
        if ($('#province').val()) {
             memoryProVal= $('#province').val();
        }
        service.post("/area/list", {
            p_id: ''
        }, function (res) {
            // console.log(res.data);
            var data = res.data || [];
            var ops = ['<option value="" selected>请选择省</option>'];
            if (data && data.length) {
                $.each(data, function (index, item) {
                    ops.push('<option value="' + item.id + '">' + item.name + '</option>');
                });
            }
            $("#province").html(ops.join(''));
            if (memoryProVal) {
                $('#province').val(memoryProVal);
            }
        });
        if (memoryProVal && $('#city').val() && $('#area').val()) {
            memoryCityVal = $('#city').val();
            memoryAreaVal = $('#area').val();
            service.post("/area/list", {
                p_id: memoryProVal
            }, function(res){
                var data = res.data || [];
                var ops = ['<option value="" selected>请选择市</option>'];
                if (data && data.length) {
                    $.each(data, function(index, item){
                        ops.push('<option value="' + item.id + '">' + item.name + '</option>');
                    });
                }
                $("#city").html(ops.join(''));
                if (memoryCityVal) {
                    $('#city').val(memoryCityVal);
                }
            });
            service.post("/area/list", {
                p_id: memoryCityVal
            }, function(res){
                var data = res.data || [];
                var ops = ['<option value="" selected>请选择区</option>'];
                if (data && data.length) {
                    $.each(data, function (index, item) {
                        ops.push('<option value="' + item.id + '">' + item.name + '</option>');
                    });
                }
                $("#area").html(ops.join(''));
                if (memoryAreaVal) {
                    $('#area').val(memoryAreaVal);
                }
            });
        }
    }

    return function (page_data) {

        scriptData = page_data;

        getPlace();

        var getList = function(p_id, done){
            require(["common/service"], function (service) {
                service.post("/area/list",{
                    p_id: p_id
                }, function (res) {
                    var data = res.data || [];
                    var ops = [];
                    if (data && data.length) {
                        $.each(data, function (index,item) {
                            ops.push('<option value="' + item.id + '">' + item.name + '</option>');
                        });
                        done && done(ops);
                    }
                });
            });
        };


        $('#province').on('change', function () {
            var cityTpl = "<option value='' selected>请选择市</option>";
            var areaTpl = "<option value='' selected>请选择区</option>"
            if (!this.value) {
                $("#city").html(cityTpl);
                $("#area").html(areaTpl);
                return false;
            }
            getList(this.value, function (list) {
                if(list){
                    list.unshift(cityTpl);
                    $("#city").html(list.join(""));
                }
            });
        });
        $('#city').on('change', function () {
            var tpl = "<option value='' selected>请选择区</option>";
            if (!this.value) {
                $("#area").html(tpl);
                return false;
            }
            getList(this.value, function (list) {
                if(list){
                    list.unshift(tpl);
                    $("#area").html(list.join(""));
                }
            });
        });
        // $('#area').on('change', function () {
        //     var tpl = "<option value='' selected>请选择区</option>";
        //     if(!this.value){
        //         $("#area").html(tpl);
        //         return false;
        //     }
        //     getList($('#city').value, function(list){
        //         if(list){
        //             list.unshift(tpl);
        //             $("#area").html(list.join(""));
        //         }
        //     });
        // });

        var confirmApply = function(){
            var rules = {
                name: function(val){
                    return /^[\u4e00-\u9fa5]{2,10}$/.test(val);
                },
                email: function(val){
                    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val);
                },
                phone: function(val){
                    return /^1\d{10}$/.test(val);
                },
                schoolName: function(val){
                    return /^[\u4e00-\u9fa5\w\d]{1,10}$/ig.test(val);
                },
                inviteCode: function(val){
                    return /^[\d]{0,10}$/ig.test(val);
                },
                talentName: function(val){
                    return /^[\u4e00-\u9fa5\d\w]{1,15}$/ig.test(val);
                },
                describe: function(val){
                    return val.length >= 200;
                },
                required:function(val){
                    return val.length;
                }
            };

            var validate = function(){
                var boolean = true;
                var errorMessage = [];

                $(".form-element").each(function(index,item){
                    var dataValidate = $(item).attr("data-validate");
                    var message = $(item).attr("data-validate-message");

                    if(dataValidate){
                        if(rules[dataValidate] && !rules[dataValidate]($(item).val())){
                            if(message){
                                errorMessage.push(message);
                            }
                            boolean = false;
                        }
                    }
                });

                if(errorMessage.length){
                    ui.alert({
                        content: errorMessage.join("<br\/>")
                    });
                    alert('errorMessage')
                }

                return boolean;
            };
        };

        $('#main')
        .on('click', '.save', function () {
            // alert('clicked');
            // confirmApply();
            // var _validate = confirmApply();
            if (!/^[\u4e00-\u9fa5]{2,8}$/.test($('.name .content').val())) {
                ui.remind('姓名：只能输入中文2-8个字哦');
                return;
            }
            if (!/^1\d{5,}$/.test($('.mobile .content').val())) {
                ui.remind('请填写正确的联系电话');
                return;
            }
            if ($('.email .content').val() && !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test($('.email .content').val())) {
                ui.remind('请填写正确的电子邮箱');
                return;
            }
            var _validate = $('#province').val()
                && $('#city').val()
                && $('#area').val()
                && $('#address-detail').val();
            if (_validate) {
                $.post('/org_course/upsertAddress', {
                    // purchase_id: $('.main-content').data('purchase-id'),
                    // purchase_id: store.get(purchase_id),
                    user_name: $('.name .content').val(),
                    mobile: $('.mobile .content').val(),
                    area_id: $('#area').val(),
                    address: $('.address-detail #address-detail').val(),
                    address_id: $('.main-content').data('address-id'),
                    email: $('.email .content').val()
                }, function (res) {
                    if (res.code == '0') {
                        location.href = '/org_course/addressList?purchase_id=' + $('.main-content').data('purchase-id');
                    }
                });
            }
            else {
                ui.remind('请填写正确的地址');
                return;
            }
        });
    };
        // confirmApply();
    // }
});