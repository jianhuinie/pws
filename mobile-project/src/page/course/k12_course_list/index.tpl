{{extends file="page/_base/base.tpl"}}
{{block name="page"}}

    {{$isShare = false}}
    {{if isset($smarty.get.s) && $smarty.get.s=='share'}}
        {{$isShare=true}}
    {{/if}}

    {{$area="bj"}}
    {{if isset($ext_data.curr_city) && !empty($ext_data.curr_city.domain)}}
        {{$area = $ext_data.curr_city.domain}}
    {{/if}}

    {{if empty($smarty.get.grade)}}
        {{$grade=''}}
    {{else}}
        {{$grade=$smarty.get.grade}}
    {{/if}}
    {{if $grade == "gaozhong"}}
        {{$search="高中"}}
    {{else}}
        {{$search="初中"}}
    {{/if}}

    {{$page_title = "本地好课"}}

    {{$page_module = "page/course/k12_course_list/index"}}
    {{$enable_backTopButton = true}}

    {{$search_button="/{{$area}}/sc-{{$search}}-2.html{{if $isShare}}?s=share{{/if}}"}}
{{/block}}

{{block name="data"}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/k12_course_list/css/index.styl"/>
{{/block}}

{{block name="content"}}
{{strip}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="本地好课"}}
    {{if empty($smarty.get.grade)}}
        {{$grade=''}}
    {{else}}
        {{$grade=$smarty.get.grade}}
    {{/if}}
    {{if empty($smarty.get.page)}}
        {{$page=1}}
    {{else}}
        {{$grade=$smarty.get.page}}
    {{/if}}

    <div class="local-course">
        <div class="course-wrapper">
            {{foreach $tpl_data.list as $item}}
            <div class="block card course-card">
                <a class="acard" href="{{$item.url}}">
                    <div class="course-pic">
                        <a class="taga" href="{{$item.url}}">
                            <img data-src="{{$item.img}}">
                            <div class="mold"></div>
                            <div class="report-status">
                                {{$item.img_desc}}
                            </div>
                        </a>
                    </div>
                    <div class="course-detail">
                        <div class="top">
                            <div class="title">{{$item.course_name}}</div>
                            <div class="course-org">{{$item.teacher_name}}</div>
                            <div class="course-descrition">
                                {{if $item.price == 0}}
                                    <span class="free price">
                                        免费
                                    </span>
                                {{else}}
                                    <span class="price">
                                        ¥ {{$item.price}}
                                    </span>
                                {{/if}}
                               <span class="address"> {{$item.address}}</span>
                            </div>
                        </div>
                        <div class="times">{{$item.time_desc}}, {{$item.schedule_count}}课节</div>
                    </div>
                </a>

            </div>
            {{/foreach}}
        </div>
        {{if $tpl_data.page.has_more}}
            <div class="more-button" data-page="{{$tpl_data.page.curr_page}}">
                <div class="text">查看更多本地课程&gt;</div>
                <div class="typing_loader"></div>
            </div>
        {{/if}}

    </div>

{{/strip}}
{{/block}}