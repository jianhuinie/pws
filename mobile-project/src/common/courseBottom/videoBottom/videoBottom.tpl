{{*
    @file 视频课底部按钮
    @author hurry
    @data 2017/1/14
*}}
<div id="fixed-bottom" class="bottom">
    {{$templateModel = ""}}
    {{if $tpl_data.comment_info.additional.has_comment}}
        {{$comment_display = "none"}}
        {{$margin_right = "small"}}
    {{else}}
        {{$margin_right = "big"}}
        {{$comment_display = "block"}}
    {{/if}}
    
    {{* 收藏 *}}
    {{include file="common/courseBottom/favor/index.tpl" templateModel=$templateModel}}

    {{* 分享 *}}
    {{include file="common/courseBottom/share/index.tpl" templateModel=$templateModel}}

    {{* 电话 *}}
    {{include file="common/courseBottom/call/index.tpl"
        templateModel=$templateModel
        org_info=$org_info
    }}

    {{* 下载 *}}
    {{include file="common/courseBottom/download/index.tpl" templateModel=$templateModel}}   

    <!--<div class="enter-comment" style="display: {{$comment_display}}">
        <span>评价</span>
    </div>-->

    <!-- {{if empty($tpl_data.course.organization) && !$ext_data.is_app}}
        <a href="tel:4000910910" id="kf-tel"><div class="tel"><img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2015/12/56791ca9ed3b9.png" alt=""></div><span>咨询客服</span> </a>
    {{/if}} -->
    {{* 咨询 *}}
    {{*只有个体老师有*}}
    {{if empty($org_info)}}
    {{*include file="common/courseBottom/consult/index.tpl"
        templateModel=$templateModel
        org_info=$org_info
        course_info=$org_info
    *}}
    {{/if}}

    {{if !$course_info.has_add_course && $course_info.price == 0}}
        {{if !$ext_data.is_tapp}}
        <div id="add-my-video" style="display: block;">加入课程</div>
        {{/if}}
    {{/if}}
    {{if $course_info.price > 0}}
        {{if $course_info.has_buy_course}}
            {{$startText = "开始学习"}}
            {{if $course_info.current_item.index > 1}}
                {{$startText = "继续学习"}}
            {{/if}}
            <div id="start-play" style="display:block;">
                <span>{{$startText}}</span>
            </div>
        {{else}}
            <div id="pay-wrap">
                <div id="pay" data-url="/pay/productDetail?type=3&course_number={{$course_info.number}}" data-course-number="{{$course_info.number}}">购买课程</div>
            </div>
        {{/if}}
    {{else}}
        {{$startText = "开始学习"}}
        {{if $course_info.current_item.index > 1}}
            {{$startText = "继续学习"}}
        {{/if}}
        <div id="start-play" {{if !$course_info.has_add_course}} style="display:none;" {{else}}style=" display:block;"{{/if}}>
            {{$startText}}
        </div>
    {{/if}}
</div>