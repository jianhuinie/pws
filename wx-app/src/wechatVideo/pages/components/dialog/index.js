/**
 * @file 弹窗组件
 * @author niejianhui
 */
Component({
    options: {
        multipleSlots: true
    },
    properties: {
        title: {
            type: String
        },
        content: {
            type: String
        },
        btnText: {
            type: String
        },
        btnOpenType: {
            type: String
        },
        showCloseIcon: {
            type: Boolean
        },
        showDialog: {
            type: Boolean
        }
    },
    data: {
        
    },
    methods: {
        btnClick: function () {
            var myEventDetail = {} // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('btnclick', myEventDetail, myEventOption);
        }
    }
})