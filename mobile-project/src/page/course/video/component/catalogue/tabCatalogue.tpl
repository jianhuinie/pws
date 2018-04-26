{{if !empty($tpl_data.video_items) || !empty($tpl_data.video_items_chapter)}}
<div class="tabs class-catalogue" data-tab="class-catalogue">
    <div class="class-sum">
        共{{$course_info.course_items_count}}节课
    </div>
    {{if !empty($tpl_data.video_items)}}
        {{include file="page/course/video/component/catalogue/catalogueItems.tpl" items=$tpl_data.video_items}}
    {{else}}
        {{foreach $tpl_data.video_items_chapter as $chapter}}
            <ul class="chapters">
                <li class="chapters-title">
                    <div class="show-title">
                        <span>
                            第{{$chapter.index}}章
                        </span>
                        <span>
                            {{$chapter.title}}
                        </span>
                    </div>
                    <span class="chapter-toggle icon-angle-down"></span>
                </li>
                <li class="body">
                    {{include file="page/course/video/component/catalogue/catalogueItems.tpl" items=$chapter.item_list}}
                </li>
            </ul>
        {{/foreach}}
    {{/if}}
{{else}}
<div class="no-class-catalogue">
    暂无目录信息
</div>
{{/if}}
</div>