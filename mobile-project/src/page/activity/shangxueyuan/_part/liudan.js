define(function(require) {
    'use strict';

    var $ = require("zepto");
    var lazyLoadImage = require("common/lazyLoadImage");
    var url = require("util/url");
    var ui = require("common/ui");

    var params = url().params;

    var confirmApply = function($, params) {
        var rules = {
            name: function(val){
                return /^[\u400-\u9fa5]{2,10}$/.test(val);
            },
            phone: function(val){
                return /^1\d{10}$/.test(val);
            },
            required: function(val){
                return val.length;
            }
        };
        var validate = function(){
            var boolean = true;
            var errorMessage = [];

            $('.form-element').each(function(index,item){
                var dataValidate = $(item).attr("data-validate");
                var message = $(item).attr("data-validate-message");

                if(dataValidate) {
                    if(rules[dataValidate] && !rules[dataValidate]($(item).val())){
                        $(item).closest(".m-item").addClass("error");
                        if(message){
                            errorMessage.push(message);
                        }
                        boolean = false;
                    }else{
                        $(item).closest(".m-item").removeClass("error");
                    }
                }
            });

            if(errorMessage.length){
                ui.remind(
                 errorMessage.join("<br\/>")
                 );
            }
            return boolean;
        };
        var getParams = function(){
            var params = {};
            $(".form-element").each(function(index, item){
                params[item.name] = item.value;
            });
            return params;
        };

        var clearTable = function(){
            $('.m-form').find('.m-item input').each(function(){
                $(this).val('');
            });
            $('textarea').val('');
        }

        var doSend = function(){
            require(["common/service"], function(service){
                service.post('/business_school/addConsult', getParams(),function(res){
                    if(res.code == '0'){
                        ui.remind('提交成功');
                        setTimeout(function(){
                            $('.tanchuang').addClass('hide');
                            $('.tanchuang-mask').addClass('hide');
                            $('.ask-form').removeClass('on');
                            $('.'+ params +'-page').addClass('on');
                        },300);
                    }else{
                    setTimeout(function(){
                            ui.remind('网络繁忙，请重试');
                        },300);
                    }
                });
            });
        };
        $('.m-item').on('click',function(){
            $(this).removeClass("error");
        });
        $(".confirm-pay").on('click',function(){
            var _validate = validate();
            if(_validate){
                doSend();
                setTimeout(function(){
                    clearTable();
                },1000)
            }
        });

    };

    var showtanchuang = function(params){
        $('.ask-form').on('click',function(){
            $('.bottom-list').each(function(index,item){
                $(item).removeClass('on');
                $('.ask-form').addClass('on');
            });
            $('.tanchuang-mask').removeClass('hide');
            $('.tanchuang').removeClass('hide');
        });

        $('.tanchuang-mask').on('click', function(){
            var hasHide = $('.tanchuang-mask').hasClass('hide');
            if(!hasHide){
                $('.tanchuang-mask').addClass('hide');
                $('.tanchuang').addClass('hide');
                $('.ask-form').removeClass('on');
                $('.'+ params +'-page').addClass('on');
            }
        });
        $('.cancel-icon').on('click',function(){
            $('.tanchuang-mask').addClass('hide');
            $('.tanchuang').addClass('hide');
            $('.ask-form').removeClass('on');
            $('.'+ params +'-page').addClass('on');
        });

    }

    return function(params){
        confirmApply($, params);
        showtanchuang(params);
    }


});