{{if $tpl_data.show_score}}
    {{if isset($tpl_data.can_comment_list) && $tpl_data.can_comment_list|count gt 0}}
        {{$cList = $tpl_data.can_comment_list}}
        <div class="mask-p" id="comment-main">
            <div class="mask" id="comment-mask"></div>
            <div class="content-wap">
                <div class="content-panel">
                    <div class="content">
                        <div class="comment-main">
                            <div class="comment-title">可评价的课程</div>
                            <div class="comment-list">
                                <ul>
                                    {{foreach $cList as $cItem}}
                                        <li class="comment-item">
                                            <a data-log="comment_click" href="{{$cItem.url}}">
                                                {{$cItem.course_name}}
                                            </a>
                                        </li>
                                    {{/foreach}}
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div class="bottom-corner"></div>
                </div>
            </div>
        </div>
    {{/if}}
    <div class="comments-overview">
        {{*综合评分*}}
        <ul class="comments-statistics">
            <li class="sum-score">
                {{if $tpl_data.additional.average neq 0}}
                    <span class="score">{{$tpl_data.additional.average}}</span>
                    分
                {{else}}
                    <span class="no-score">暂无评分</span>
                {{/if}}
            </li>
            <li class="star">
                {{include file="../component/starScore.tpl" score=$tpl_data.additional.average}}
            </li>
            <li class="total-number">{{$tpl_data.additional.total_score.total}}条学习评价</li>
        </ul>

        {{*评分分布*}}
        <ul class="comments-stars">
            {{$total_score = $tpl_data.additional.total_score}}

            {{section name = progress loop = 5}}
                {{$progress = ['1' => 'one','2' => 'two','3' => 'three','4' => 'four','5'=>'five']}}
                {{$index = $progress[5-$smarty.section.progress.index]|cat:'_rate'}}
                {{$percent = $total_score[$index]}}
                {{$width = 100 * $percent}}
                <li>
                    <span class="star-level">{{(5-$smarty.section.progress.index)}}星</span>
                    <span class="grey-line">
                        <span class="orange-line" data-percent="{{$percent}}"
                            style="width:{{$width|string_format:"%d"}}%"></span>
                    </span>
                    <span class="num">
                        {{$rate = $total_score[$progress[5-$smarty.section.progress.index]|cat:'_rate']}}
                        {{if $rate > 0}}
                        {{($rate|string_format:"%.2f")*100|cat:"%"}}
                        {{else}}
                            0
                        {{/if}}
                    </span>
                </li>
            {{/section}}
        </ul>
    </div>
{{/if}}
<div class="tab-list comments-filter">
    {{if $tpl_data.show_score}}
    <ul class="tab-title">
        <li class="tab-item all-class active" comment_type="0" data-type="0">
            <div>全部评价</div>
        </li>
        <li class="tab-item one2one" comment_type="1" data-type="1">
            <div>一对一</div>
        </li>
        <li class="tab-item class-course" comment_type="3" data-type="3">
            <div>班课</div>
        </li>
        <li class="tab-item video" comment_type="4" data-type="4">
            <div>视频课</div>
        </li>
    </ul>
    {{/if}}
    <section class="course-tab">
        {{include file="../component/commentTab.tpl" commentList = $tpl_data.comment_list}}
    </section>

</div>