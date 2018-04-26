{{* 课程 *}}
<div class="course-page" data-flag="0">
    <div class="find-input">
        <div class="find-content">
            <div class="search-content">
                <i class="icon icon-search"></i><a href="{{$tpl_data.page_url.course_search}}"><input type="text" class="search-input" placeholder="搜索班课名称或班课编号"/></a>
            </div>
        </div>
    </div>

    {{* 优惠券 *}}
    {{include file="../detail/coupon.tpl"}}

    {{if !empty($tpl_data.video_course_list) && ($tpl_data.video_course_list.object_list|count gt 0)}}
    {{$video_list = $tpl_data.video_course_list}}
    <div class="org-videocourse org-courses">
        <h3>视频课</h3>
        <ul class="videocourse-list videocourse-list-ajax">
            {{foreach $video_list.object_list as $course}}
                {{include file="../components/org-video-course.tpl"}}
            {{/foreach}}
        </ul>
        {{if $video_list.pager.has_more}}
        <div data-moreurl="{{$video_list.more_url}}" class="more-course-ajax more-button"  data-pager="{{$courseType.pager.offset}},{{$video_list.pager.row_count}}">
            <div class="character">查看更多课程<i class="icon icon-angle-right"></i></div>
            <div class="more-loading">
                <img src="{{$static_origin}}/src/page/huikejian/img/loading.gif">
            </div>
        </div>
        {{/if}}
    </div>
    {{/if}}

    {{* 课程分类 *}}
    {{if !empty($tpl_data.classify_class_course)}}
    {{foreach $tpl_data.classify_class_course as $courseType}}
    <div class="org-recommend org-courses" id="{{$courseType.group_id}}">

        <h3>{{$courseType.classify_name}}</h3>
        <ul class="recommend-list course-list-ajax">
            {{$course_list = $courseType.object_list}}
            {{foreach item=course from=$course_list}}
            <li>
                {{include file="../components/org-course.tpl"}}
            </li>
            {{/foreach}}
        </ul>

        {{if $courseType.pager.has_more}}
        <div data-moreurl="{{$courseType.more_url}}" class="more-course-ajax more-button" data-id="{{$courseType.group_id}}" data-pager="{{$courseType.pager.offset}},{{$courseType.pager.row_count}}">
            <div class="character">查看更多课程<i class="icon icon-angle-right"></i></div>
            <div class="more-loading">
                <img src="{{$static_origin}}/src/page/huikejian/img/loading.gif">
            </div>
        </div>
        {{/if}}
    </div>
    {{/foreach}}
    {{/if}}



    {{if !empty($tpl_data.one2one_course_list) && ($tpl_data.one2one_course_list.object_list|count gt 0)}}
    {{$one2one_list = $tpl_data.one2one_course_list}}
    <div class="org-one2one org-courses">
        <h3>1对1课程</h3>
        <ul class="one2one-list one2one-list-ajax">
            {{foreach $one2one_list.object_list as $course}}
                {{include file="../components/org-one2one-course.tpl"}}
            {{/foreach}}
        </ul>
        {{if $one2one_list.pager.has_more}}
        <div data-moreurl="{{$one2one_list.more_url}}" class="more-course-ajax more-button"  data-pager="{{$courseType.pager.offset}},{{$one2one_list.pager.row_count}}">
            <div class="character">查看更多课程<i class="icon icon-angle-right"></i></div>
            <div class="more-loading">
                <img src="{{$static_origin}}/src/page/huikejian/img/loading.gif">
            </div>
        </div>
        {{/if}}
    </div>
    {{/if}}



</div>
