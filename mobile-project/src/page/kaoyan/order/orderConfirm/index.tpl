{{**
 * 考研app的订单确认页
 * actually，只在了考研app里面用到了
 * Created by hanzh on 16/1/20.
 *}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "确认订单"}}
    {{$page_module = "page/kaoyan/order/orderConfirm/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data["product"] = $tpl_data.product}}
    {{$script_data["studentName"] = $tpl_data.student_profile.name|escape}}
    {{if !empty($smarty.get.type)}}
        {{$script_data['type']=$smarty.get.type}}
    {{/if}}
    {{$script_data.price = $tpl_data.product.total_price}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/kaoyan/order/orderConfirm/css/index.styl"/>
{{/block}}

{{block name="content"}}
    {{$courseType[""]="联报课"}}
    {{$courseType["1"]="一对一"}}
    {{$courseType["2"]="直播课"}}
    {{$courseType["3"]="视频课"}}
    {{$courseType["4"]="线下班课"}}
    
    <div class="main-content">
        <div class="class-list">
            <div class="item">
                {{$product=$tpl_data.product}}
                <p class="type">
                    <span class="c-t">课程类型</span>
                    <span class="c-e">{{$courseType[$product.course_type]}}</span>
                </p>
                <div class="main">
                    <div class="img-background img">
                        {{if !empty($product.portrait)}}
                        {{$picurl = $product.portrait}}
                        {{else if !empty($product.course_photo)}}
                        {{$picurl=$product.course_photo}}
                        {{else if !empty($product.teacher_profile)}}
                        {{$picurl = $product.teacher_profile.avatar}}
                        {{/if}}
                        <img width="100%" height="100%" data-src="{{$picurl}}">
                    </div>
                    <div class="title double-line">
                        {{$product.course_name}}
                    </div>
                </div>
            </div>
        </div>
        <div class="total-price single-item">
            <span class="title">课程总价</span>
            <span class="price"><i>¥</i>{{$product.total_price}}</span>
        </div>
        {{*董瑞-删除短信提醒功能 @2016-04-18 by hanzh*}}
        {{if false}}
            <div  id="switch-onoff" class=" single-item">
                <span class="title">接收上课短信提醒</span>
                <span class="switch"><i></i></span>
            </div>
        {{/if}}
        <div class="bottom-fixed-bar">
            <p class="content">
                <span class="txt">还需支付：</span>
                <span class="price"><i>¥</i>{{$product.pay_money}}</span>
            </p>
            <div class="btn" id="submitButton">确认报名</div>
        </div>
    </div>
{{/block}}
