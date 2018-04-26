{{if !empty($courseDetails.to) || !empty($courseDetails.audition) || !empty($courseDetails.intro)}}
    <div class="course-info">
        <div class="class-title">课程信息</div>
        {{if !empty($courseDetails.to)}}
            <div class="info">
                适学人群：{{$courseDetails.to}}
            </div>
        {{/if}}
        {{if !empty($courseDetails.audition)}}
            <div class="info">
                试听说明：{{$courseDetails.audition}}
            </div>
        {{/if}}
        {{if !empty($courseDetails.intro)}}
            <div class="img-text-content">
                <div class="wrap">
                    <div class="img-text clip">
                        <div class="img-intro">
                            {{*暂时不支持视频*}}
                            {{if false}}
                                {{$video = $courseInfo.video}}
                                {{if isset($video)}}
                                    <iframe class="player-frame" src="{{$video.view|replace:'http:':'http:'}}"></iframe>
                                {{/if}}
                            {{/if}}
                            {{$courseDetails.intro}}
                        </div>
                    </div>
                    <div class="all-info">查看全部信息</div>
                </div>
            </div>
        {{/if}}

    </div>
{{/if}}
