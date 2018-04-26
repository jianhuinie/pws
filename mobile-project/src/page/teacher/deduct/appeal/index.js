/**
 * Created by wuxuelan on 16/02/26.
 */
define(function(require,exports){

    var $ = require("zepto");
    var ui = require("common/ui");
    var appController = require('common/app');
    var photoContainer = $('#add-photo');
    var container = $('.photo-container');

    var uploadSource = 0;
    var uploads = {};
    //监听输入框的剩余字数
    $('.form-text').on('input', function(){
        var value = $(this).val();
        var minLength = 20;
        var maxLength = 200;
        var flag = 0;
        var len;
        if (value.length < minLength) {
            len = minLength - value.length;
            $('.remain').html('还需输入' + len + '字').removeClass('up');
            flag = 0;
        } else if (value.length >= minLength&&value.length <= maxLength) {
            len = 200 - value.length;
            $('.remain').html(len).removeClass('up');
            flag = 1;
        }else if(value.length > maxLength){
            len = value.length - 200;
            $('.remain').html('超出'+len+'字').addClass('up');
            flag = 0;
        }
        activeBtn(flag);
    });
    //判断按钮颜色
    function activeBtn(flag){
        if(flag==1){
            $('.submit').addClass('on');
        }else{
            $('.submit').removeClass('on');
        }
    }

    var getGuid = function(){
        var guid = "";
        for (var i = 1; i <= 32; i++){
            var n = Math.floor(Math.random()*16.0).toString(16);
            guid +=   n;
            if((i==8)||(i==12)||(i==16)||(i==20))
                guid += "-";
        }
        return guid;
    };
    /**
     * 上传照片
     */
    function upLoadPhoto() {

        photoContainer.find('input[type=file]').change(function () {
            var file = this.files[0];
            var size = file.size;
            var type = file.type;
            if(!/image\/\w+/.test(file.type||"")){
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            reader.onload = function () {
                //通过reader.result来访问生成的DataURL
                var url = "data:"+type+";" + reader.result.substr(reader.result.indexOf("base64,"));
                var num = photoContainer.find('ul li').length;
                if (num == 5) {
                    //photoContainer.find('.add-photo').hide();
                    $('.add-title').find('input').remove();
                    photoContainer.find('.add-photos').addClass('no-photos');
                }
                var guid = getGuid();
                var imageBase64 = url;
                photoContainer.find('ul .add-photo').before('<li guid=\"'+guid+'\"><span class="uploadding">正在上传...</span><i class="icon icon-remove_circle delete"></i><img width="100%" height="100%" src="' + url + '" alt=""></li>');
                uploadImage(imageBase64,guid);
            };
            $(this).val("");
            reader.readAsDataURL(file);

        });

    }

    var uploadImage = function(base64,guid){
        //添加guid对象，请求后被删除，不添加数据
        resetImage(guid);
        $.post("/forum/uploadImage",{
            attachment: base64,
            guid: guid
        }).always(function(response){
            response = response || {};

            var data = response.data || {};
            var id = data.id;
            var gd = data.guid;

            if(guid){
                resetImage(gd,id);
            }
            if(response.code != "0"){
                ui.remind(response.msg || "请求异常");
            }
        });
    };

    var getGuidItem = function(guid){
        var item = container.find("[guid='"+guid+"']");
        return item;
    };
    var resetImage = function(guid,id){
        if(uploads[guid]){
            var item = getGuidItem(guid);
            if(undefined !== id) {
                uploads[guid]["status"] = "success";
                uploads[guid]["id"] = id;
                item.find(".uploadding").remove();
            } else {
                uploads[guid]["status"] = "error";
                item.find(".uploadding").addClass("uploadError");
                item.find(".uploadding").html("上传失败");
            }
            //item.find(".uploadding").addClass(this.uploads[guid]["status"]);
        } else {
            uploads[guid] = {
                status: "uploadding"
            }
        }
    };

    var isValidate = function(){
        var status = true;
        $.each(uploads,function(index,item){
            if(item.status != "success") {
                status = false;
            }
        });
        return status;
    };

    var getImages = function(){
        var ids = [];
        $.each(uploads,function(index,item){
            if(undefined !== item.id){
                ids.push(item.id);
            }
        });
        return ids;
    };

    function deletePhoto() {
        photoContainer.on('click', '.delete', function () {
            var guid = $(this).parent().attr("guid");
            $(this).parent('li').remove();
            photoContainer.find('.add-photos').removeClass('no-photos');
            delete uploads[guid];
            $('.add-title').find('div .add-photos').after('<input type="file" accept="image/*">');
            upLoadPhoto();
        })

    }
    return function (page_data) {
        var id = page_data.deduct_id;
        upLoadPhoto();
        deletePhoto();
        $('.submit').on('click',function(){
            if($(this).hasClass('on')){
                if(!isValidate()){
                    ui.remind("还有图片未上传成功");
                    return false;
                }else{
                    var id_list = getImages().join(",");
                    var problem = $('.form-text').val();
                    $.ajax({
                        url: '/teacher/deductAppeal',
                        method: 'post',
                        data: {
                            deduct_id: id,
                            reason: problem,
                            attach_photos: id_list
                        },
                        success: function(response) {
                            if (response.code == 0 ) {
                                ui.remind('提交成功');
                                if(appController.isTeacherApp()){
                                    appController.openNewWindow(location.origin+'/teacher/deductAppealDetail?deduct_id='+id);
                                }else{
                                    location.href = location.origin+'/teacher/deductAppealDetail?deduct_id='+id;
                                }

                            } else if (response.code == -1){
                                location.reload();
                            } else {
                                ui.remind(response.msg);
                            }
                        }
                    });
                }
            }
        });
    }


});