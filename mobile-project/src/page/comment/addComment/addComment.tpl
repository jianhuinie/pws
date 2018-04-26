{{*
@file 发表评价
@author chenmo
@date 16/1/12
*}}
{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
    {{$page_title = "发表评价"}}

    {{$page_module = "page/comment/addComment/addComment"}}

    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
    {{if isset($smarty.get.serial_number) && $smarty.get.serial_number}}
        {{$script_data['serial_number']  = $smarty.get.serial_number}}
    {{else}}
        {{$script_data.serial_number = ''}}
    {{/if}}
    {{if isset($smarty.get.purchase_id)}}
        {{$script_data.purchase_id = $smarty.get.purchase_id}}
    {{else}}
        {{$script_data.purchase_id = ''}}
    {{/if}}
    {{if isset($smarty.get.u) && $smarty.get.u}}
        {{$script_data.redirectUrl = $smarty.get.u}}
    {{else}}
        {{$script_data.redirectUrl = ''}}
    {{/if}}
    {{if !empty($tpl_data.is_invited) && $tpl_data.is_invited}}
        {{$script_data.teacher_num = $tpl_data.teacher_num}}
    {{else}}
        {{$script_data.teacher_num = ''}}
    {{/if}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/comment/addComment/addComment.styl"/>
{{/block}}

{{block name="content"}}
    {{$td=$tpl_data}}
    {{$comment=['极不满意','不满意','一般','满意','非常满意']}}
    {{if !empty($td.is_invited) && $td.is_invited}}
        {{$is_invited = true}}
    {{else}}
        {{$is_invited = false}}
    {{/if}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="发表评价"}}
    <div id="main">
        {{if !$is_invited}}
            <section class="head-part">
                {{if !empty($td.purchase_info)}}
                    <section class="base-info">
                        <h3 class="course-name single-line">{{$tpl_data.purchase_info.course_name}}</h3>
                        <p class="course-teacher single-line">老师：{{$tpl_data.purchase_info.teacher_title}}</p>
                    </section>
                {{/if}}
                {{if isset($td.lesson_list) && count($td.lesson_list) > 0 && $tpl_data.purchase_info.course_type!=3}}
                    <section class="choose-course">
                        <div class="selected-course item border-bottom">
                            <div class="selected-name single-line active"></div>
                            <i class="icon icon-back"></i>
                        </div>
                        <div class="orgin-courses">
                            <ul>
                                {{foreach $td.lesson_list as $ls}}
                                    <li data-serial_number="{{$ls.serial_number}}"
                                        data-teacher_number="{{$ls.teacher_number}}"
                                        data-text="{{$ls.display_title}}"
                                        {{if !empty($ls.display_name)}}data-teacher_name="{{$ls.display_name}}"{{/if}}
                                        class="item border-bottom {{if $ls.can_comment == true}}active{{/if}}">
                                        <span class="l-name single-line">{{$ls.display_title}}</span>
                                        <span class="r-status">{{$ls.comment_status_name}}</span>
                                    </li>
                                {{/foreach}}
                            </ul>
                        </div>
                        {{*<div class="teacher-list">*}}
                            {{*{{if count($td.teacher_list) > 0 }}*}}
                            {{*<ul>*}}
                                {{*{{foreach $td.teacher_list as $tl}}*}}
                                {{*<li class="teacher-item" data-number="{{$tl.number}}">*}}
                                    {{*<p class="single-line">{{$tl.display_name}}</p>*}}
                                {{*</li>*}}
                                {{*{{/foreach}}*}}
                            {{*</ul>*}}
                            {{*{{/if}}*}}
                        {{*</div>*}}
                    </section>
                {{/if}}
            </section>
        {{/if}}
        <section id="edit-part">
            <div class="all-comment">
                <span class="title">总体评价</span>
            <span class="stars">
                {{section name=star loop=5}}
                    <i class="icon icon-star-full"
                       data-comment="{{$comment[$smarty.section.star.index]}}"
                       data-index="{{$smarty.section.star.index + 1}}"
                    ></i>
                {{/section}}
                <span class="comment-text"></span>
            </span>
            </div>
            <div class="text-container">
                <textarea class="form-text" placeholder="老师的水平怎么样?教学效果好不好?说说你的感受" maxLength="200"></textarea>
                <span class="remain">可输入200字</span>
            </div>
        </section>
        {{*这期不做传图功能,先注掉*}}
        {{*<section id="add-photo">*}}
        {{*<div class="add-title">*}}
        {{*<i class="icon icon-camera"></i>*}}
        {{*<span>晒照片,秀出学习成果</span>*}}
        {{*<input type="file" accept="image/*">*}}
        {{*</div>*}}
        {{*<div class="photo-container">*}}
        {{*<ul>*}}
        {{*<li class="add-photo">*}}
        {{*<div class="wrap">*}}
        {{*<i class="icon icon-add"></i>*}}
        {{*<input type="file" accept="image/*">*}}
        {{*</div>*}}
        {{*</li>*}}
        {{*</ul>*}}
        {{*</div>*}}
        {{*</section>*}}
        <section id="bottom">
            <i class="icon icon-check-alt no-name"></i>
            <span class="label">匿名评价</span>
            <span {{if $is_invited}}id="invite-submit"{{else}}id="submit"{{/if}} class="submit-comment">发表评价</span>
        </section>
    </div>
{{/block}}