{{$tel_phone = false}}

{{if not empty($orgInfo)}}
{{if not empty($orgInfo.extension)}}
{{$tel_phone = true}}
{{/if}}
{{/if}}

{{*页面底部*}}
{{if !empty($tpl_data.spread_info) && $tpl_data.spread_info.is_self}}
<div class="bottom-tip">
    <div class="tip">朋友通过链接购买并上课后您返现￥{{$tpl_data.spread_info.commission_price}}</div>
    <div class="immediate-share">立即分享</div>
</div>
{{else}}
{{$model = "orange"}}
<div class="bottom bottom-{{$page_model}} display-none" data-click="class-bottom">
    {{if $course_info.button_info.type != "finish" && $course_info.button_info.type != "has_pay"}}
    <div class="bottom-item bottom-favor bottom-favor-{{$page_model}}">
        <div class="favor">
            {{if $page_model != "class-super"}}
            {{if $tpl_data.favorite_info.favorite_status}}
            <img src="{{$favor_img}}">
            {{else}}
            <img src="https://img.genshuixue.com/0cms/d/file/content/2015/12/5675239d554c8.png">
            {{/if}}
            {{/if}}
            <span class="{{if $tpl_data.favorite_info.favorite_status}}{{$model}}{{/if}}">
                {{if $tpl_data.favorite_info.favorite_status}}已收藏{{else}}收藏{{/if}}
            </span>
        </div>
    </div>

    <div class="bottom-item item-{{$page_model}}">
        <div
            class="bottom-share {{if $page_model == "class-vip"}}
                bottom-share-class-vip
            {{else}}
                bottom-share-normal
            {{/if}}"
            data-click="share"
            data-sku="class|{{$course_info.number}}"
            >
            {{if $page_model == "class-vip"}}
            <i class="icon icon-share"></i>
            {{/if}}
            <span>分享</span>
        </div>
    </div>
    <div class="bottom-item item-{{$page_model}}">
        <div id="bottom-consultation"
        data-sku="class|{{$course_info.number}}"
             class="consult{{if $page_model == "class-vip"}} class-vip-bottom-consultation{{else}} normal-consultation{{/if}}" {{if isset($course_info.easemob)}}data-easemob="{{$course_info.easemob}}"{{/if}}

        data-course_num="{{$course_info.number}}"
        data-org_num="{{$course_info.course_summary.org_info.number}}"
        {{if $tel_phone}}
        data-tel="{{$orgInfo.extension}}" data-click="tel"
        {{else}}
        data-click="consult"
        {{/if}}

        {{if !empty($tpl_data.spread_info)}}
        data-spread_id="{{$tpl_data.spread_info.spread_id}}"
        {{/if}}
        >
        {{if $page_model == "class-vip"}}
        <div class="consult-icon">
            {{if $tel_phone && !$ext_data.is_app}}
            <img style="vertical-align: middle;
    margin-top: 1px;" width="100%" height="100%" src="https://img.genshuixue.com/0cms/d/file/content/2015/12/56791ca9ed3b9.png" alt=""/>
            {{else}}
            <img style="vertical-align: middle;
    margin-top: 1px;" width="100%" height="100%" src="https://img.genshuixue.com/0cms/d/file/content/2015/12/56776f54b91e3.png" alt=""/>
            {{/if}}
        </div>
        {{/if}}

        <span>{{if $tel_phone && !$ext_data.is_app}}电话{{else}}咨询{{/if}}</span>
    </div>
</div>

{{if not empty($org_info)}}
{{if false && $tpl_data.support_student_advisory}}
<div class="bottom-item item-{{$page_model}} bottom-item-advisory" data-click="advisory" data-sku="class|{{$course_info.number}}">
    <button class="btn-appoint btn-appoint-advisory btn-appoint-{{$model}} {{if $course_info.course_type == 2}} words {{/if}}">
        {{if $courseInfo.lesson_way == 2}} 预约咨询 {{else}} 预约试听 {{/if}}
    </button>
</div>
{{/if}}
{{else}}
<!-- <div class="bottom-item item-{{$page_model}} bottom-item-liudan" data-click="cs " data-sku="class|{{$course_info.number}}">
    <button class="btn-appoint btn-appoint-liudan btn-appoint-liudan-{{$model}}" data-href="/recommend/fill_info?source=genshuixue&page_type={{$ext_data.page}}">
        预约
    </button>
</div> -->
{{/if}}
{{/if}}

<div class="bottom-item item-{{$page_model}} bottom-item-signup" data-click="order " data-sku="class|{{$course_info.number}}">
    <button id="btn-{{$course_info.button_info.type}}"  class="sign-up {{$course_info.button_info.type}} {{$course_info.button_info.type}}-{{$model}}
                {{if $course_info.button_info.type == "finish" && $ext_data.is_app}} app-finish {{/if}}"
    data-course-number="{{$course_info.number}}"
    data-spread_id="{{if !empty($tpl_data.spread_info)}} {{$tpl_data.spread_info.spread_id}} {{/if}}"
    data-url="{{$course_info.button_info.url}}" data-ismobile="{{$course_info.is_mobile}}">
    {{if $course_info.button_info.type == "finish"}} {{if $ext_data.is_app}} 结束啦 {{else}} 课程已结束，查看更多课程 {{/if}}{{else if $course_info.button_info.type == "has_pay"}} 已报名，查看课程安排 {{else}}{{$course_info.button_info.name}} {{/if}}
    </button>
</div>
</div>
{{/if}}

<div id="j_purchase" class="purchase">
    <img class="close" src="/src/page/course/details/component/img/ic_cancel.png" alt="" />
    <div class="name">{{$courseInfo.name}}</div>
    <div class="way">
        <div class="title">
            上课方式
        </div>
        <div>
            <div class="choose">
                {{if $courseInfo.lesson_way == 2}}在线授课{{else}}线下授课{{/if}}
            </div>
        </div>
    </div>
    <div class="quantity">
        <div class="title">购买数量：</div>
        <span id="j_plus" class="operation">+</span>
        <span id="j_num" class="num">1</span>
        <span id="j_minus" class="operation">-</span>
    </div>
    <div class="sum">
        共计：<span id="j_sum" data-price="{{$courseInfo.price}}">¥{{$courseInfo.price}}</span>
    </div>
    <div id="j_submit" class="submit">立即报名</div>
</div>
