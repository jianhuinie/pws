<div class="course-plan">
    <div class="content">
        {{if $currentPage == 0}}
        <div class="summary">
            {{$coursePlan.arrangement}}
        </div>
        {{/if}}
        <div class="list">
            {{foreach $coursePlan.content as $plan index}}
            <div class="item {{if $plan.is_finish}}finish{{/if}}">
                <div class="index">
                    <p>{{$pageSize * $currentPage + index + 1}}</p>
                </div>
                <div class="body {{if $plan.has_playback}}has-playback{{/if}}">
                    <div class="content {{if !$plan.content}}one{{/if}}">
                        <p class="plan-title">
                            {{$plan.title}}
                        </p>
                        <p class="plan-detail">
                            {{$plan.content}}
                        </p>
                    </div>
                    {{if $plan.has_playback}}
                        <div class="play-back">
                            <a href="{{$plan.playback_url}}">
                                看回放
                            </a>
                        </div>
                    {{/if}}
                </div>
            </div>
            {{/foreach}}
        </div>
    </div>
</div>