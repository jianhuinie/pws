{{$commentData = $tpl_data.comment_paged.items[0]}}
{{$commentAdditional = $tpl_data.comment_summary}}

{{if $commentData}}
    <section class="comment-box">
        <div class="header-line comment-lines analysis-habo-log" 
        data-url="/comment/index?key=NORMAL_COURSE&number={{$queryOneOnOneCourse.link_numbers}}&order_by=SORT"
        data-habo-type="YouXuan_Appraise_Number" 
        data-habo-stype="YouXuan_Appraise_Number"
        >
            <span class="title">
                学生评价
            </span>

            <span class="more-comment">
                <span class="text">共{{$commentAdditional.count}}条</span>
                <i class="icon icon-chevron-thin-right"></i>
            </span>
        </div>

        <div class="cross-line"></div>

        <div class="data-infos">
            <div class="avatar">
                <img class="retina" data-src="{{$commentData.user.avatar_url}}">
            </div>

            <div class="header-line">
                <div class="student-name line-clamp">{{$commentData.user.display_name}}</div>
                {{*<div class="remark">{{$queryOneOnOneCourse.name}}</div>*}}
                <div class="point">
                    <span class="comment-stars" data-scores="{{$commentData.score}}"></span>
                </div>
            </div>

            <div class="last-line">
                <span class="trump analysis-habo-log" 
                    data-status="0" 
                    data-can-trump="1" 
                    data-id="{{$commentData.id}}"
                    data-count={{$commentData.thumb_count}}
                    data-habo-type="YouXuan_Appraise_Nupport" 
                    data-habo-stype="YouXuan_Appraise_Nupport">
                    <i class="icon icon-like"></i>
                    <span  class="number">{{$commentData.thumb_count}}</span>
                </span>

                <div class="date comment-date" data-time="{{$commentData.create_time}}">
                </div>
            </div>
        </div>

        <div class="content">
            {{$commentData.content}}
        </div>
        
    </section>
{{/if}}