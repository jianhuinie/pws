define(function(require, exports) {

    'use strict';
    var TextClipboard = require('TextClipboard');

    exports.init = function (data){

        new Ractive({
            el: '#container',
            template: require('html!./invite.html'),
            data:{
                isOrgTeacher: data.is_org_teacher,
                inviteLink: data.invite_link,
                invitedNum: data.invited_num,
                limitPrivilegeDays: data.limit_privilege_days,
                privilegeDays: data.privilege_days,
                viewPrevilegeLink: data.viewPrevilege_link,
                evaluateLink: data.evaluate_link,
                verifyStatus: data.verify_status,
                invitedUsers: data.invited_users,
                tabCheckedIndex: data.is_org_teacher ? 1: 0

            },

            onrender: function() {
                new TextClipboard({
                    element: $('#empty-link'),
                    text: $('#detailLink').text(),
                    onClick: function() {
                        tip({
                            type: 'success',
                            content: '复制成功'
                        });
                        this.copy(this.text);
                    }
                })
                new TextClipboard({
                    element: $('#empty-content'),
                    text: $('#detailContent').text(),
                    onClick: function() {
                        tip({
                            type: 'success',
                            content: '复制成功'
                        });
                        this.copy(this.text);
                    }
                })

            }
        });


    }

});