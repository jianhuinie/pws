/**
 * 学生个人中心隐私设置页
 * autor jiahuayan
*/

define(function (require, exports) {

    
    var service = require('common/service');

    var container = $('#content');

    exports.init = function() {
        
        container
        .on('click', '.btn-link', function(e) {
            var conbox = $(this).parents('.item');
            conbox.find('.item-body').show();
            conbox.find('.form').show();
        })
        .on('click', '#privacy-submit', function(e) {
            var val = $(this).parents('#form-privacy').find('[name=show]:checked').val();
            //读接口保存选择
            var data = {
                trajectory: val
            }
            service
            .setTrajectory(data)
            .done(function(repsones) {
                if (repsones.code == 0) {
                    success('保存成功');
                }
            });
        })
    };
    

});