/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){

    'use strict';

    var $ = require("zepto");
    var service = require("common/service");
    var url = require("util/url");
    var ui = require("common/ui");

    return function(){
        $('.danxuan').on('click',function(){
            var block = $(this).parent();
            block.find('input[type=radio]').attr('checked',false);
            block.find('.radio-btn').removeClass('checkedRadio');
            $(this).children("div").addClass('checkedRadio');
            $(this).children("div").find('input[type=radio]').attr('checked',true);
        });
        $('.duoxuan').on('click',function(){
            var num = 0;
            $('input[name=question1]').each(function(e){
                if($(this).attr('checked') == 'true'){
                    num++;
                }
            });
            var block = $(this).parent();
            var lilength = $(this).children(".checkedRadio").length;
            if(lilength == 0 && num<3){
                $(this).children("div").addClass('checkedRadio');
                $(this).find('input[type=checkbox]').attr('checked',true);
            }else if(lilength == 1){
                $(this).children("div").removeClass('checkedRadio');
                $(this).find('input[type=checkbox]').attr('checked',false);
            }else{
                ui.remind('最多选三个选项');
            }
        });
        $('.info1').on('click',function(){
            var block = $('.info2');
            $(this).hide();
            block.show();

        });
        $(".submit").click(function(){
            var sum = '';
            $('input[name=question1]').each(function(e){
                var q1 = '';
                if($(this).attr('checked') == 'true'){
                    q1 = $(this).attr('value') + '_';
                    sum = sum + q1;
                }
            });
            sum=sum.substring(0,sum.length-1);
            var q2 = null ;
            $('input[name=question2]').each(function(e){
                if($(this).attr('checked') == 'true'){
                    q2 = $(this).attr('value');
                }
            });

            var q3 = null ;
            $('input[name=question3]').each(function(e){
                if($(this).attr('checked') == 'true'){
                    q3 = $(this).attr('value');
                }
            });

            var q4 = null ;
            $('input[name=question4]').each(function(e){
                if($(this).attr('checked') == 'true'){
                    q4 = $(this).attr('value');
                }
            });

            var q5 = null ;
            $('input[name=question5]').each(function(e){
                if($(this).attr('checked') == 'true'){
                    q5 = $(this).attr('value');
                }
            });

            var q6 = null ;
            $('input[name=question6]').each(function(e){
                if($(this).attr('checked') == 'true'){
                    q6 = $(this).attr('value');
                }
            });

            var flag = false;
            if( sum&&q2&&q3&&q4&&q5&&q6 ){
                flag = true;
            }

            if(!flag){
                setTimeout(function(){
                    ui.remind('您还有选项还没有答完，请答完再提交，谢谢');
                },300);
            }
            if(flag){
                service.post("/activity/survey_teacher_active_suggest",{
                    q1 : sum,
                    q2 : q2,
                    q3 : q3,
                    q4 : q4,
                    q5 : q5,
                    q6 : q6,
                    suggest: $("#information").val(),
                    mobile: url().params.mobile
                },function(res){
                    if(res.code == 0){
                        $('.question').hide();
                        $('.title').hide();
                        $('body').css('background-color','#FFA500');
                        $('.block_2').show();
                        //ui.remind('感谢您的反馈，我们将竭诚为您服务！');
                    }
                });
            }
        });
    }
});