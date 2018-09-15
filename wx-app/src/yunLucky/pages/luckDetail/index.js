/**
 * 云祝福详情页面
 */
import config from './config';
Page({
    data: {
    },
    onLoad: function (options) {
        const me = this;
        const picKey = options.picKey;
        const count = options.count;
        // const count = 2000255;
        const picArrays = config.picArray;
        const image = picArrays[picKey];
        
        me.setData({
            dynamicPic: image.img,
            text: image.key,
            count: count,
            shareImg: image.shareImg
        });
         //获取手机型号
         wx.getSystemInfo({
            success(res){
                console.log(res.windowHeight)
                me.setData({
                    windowHeight:res.windowHeight
                })
            }
        })
    },

    btnBackHome: function () {
        wx.navigateBack();
    },

    onShareAppMessage:  function (options) {
        const data = this.data;
        return {
            title: data.text,
            path: '/pages/index/index',
            imageUrl: data.shareImg,
            success: function () {

            },
            fail: function () {

            },
            complete: function () {

            }
        };
    }
});