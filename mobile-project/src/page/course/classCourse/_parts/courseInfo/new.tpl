{{*
    @file 班课课程信息
    参数：
    tpl_data: 模板数据
    @author wuxuelan
*}}

{{strip}}

{{$course_info = $tpl_data.course_info.intro}}
{{$course_color = ""}}
{{if isset($course_info.style) && !empty($course_info.style)}}
    {{$course_color = $course_info.style}}
{{else}}
    {{$course_color = "white"}}
{{/if}}
<div class="detail-item course-new courseInfo-{{$course_color}}">
    <div class="detail-title">课程信息</div>
    <div class="detail-content">
        {{if !empty($tpl_data.course_info.information)}}
            <div class="info">
                {{$tpl_data.course_info.information}}
            </div>
        {{/if}}
        <div class="min-student">
            成班原则：
            {{if $tpl_data.course_info.min_student == 1}}
                报名即开班
            {{else}}
                超过{{$tpl_data.course_info.min_student}}人报名即可开班
            {{/if}}
        </div>
        {{foreach $course_info.items as $item}}
            {{if $item.type == "title"}}
                <div class="title title-{{$course_color}}">{{$item.text}}</div>
            {{else if $item.type == "body"}}
                <div class="body" style="font-weight: {{$item.font_weight}}; font-size:{{$item.font_size}};
                    text-align: {{$item.text_align}}; color:{{$item.color}};">{{$item.text}}</div>
            {{else if $item.type == "image"}}
                <div class="image img-{{$course_color}}">
                    <img src="{{$item.url}}" alt="" style="width:100%; display: inherit;">
                </div>
            {{else if $item.type == "video"}}
                <div class="video-player" data-src="{{$item.url}}"
                     data-id="{{$item.video_id}}"
                     data-cover="{{$item.cover}}">
                    <div class="video-poster">
                        <div class="play-wrapper play-icon"></div>
                    </div>
                    <iframe style="display:none; border:0; background: #000;" src="" class="player-frame"></iframe>
                </div>
            {{else if $item.type == "audio"}}
                <div class="teacher-audio">
                    <img class="audio-border" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57b424e72bb91.png">
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/579ac8fb740f4.png" alt="" class="audio-wave">
                    <div audioplayer class="audio audio-player"  data-play="0"
                         data-url="{{$item.url}}" data-length="{{$item.length}}"
                         data-wave="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/579ac8fbb08ce.gif"
                         data-voice="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/579ac8fb740f4.png">
                    </div>
                    {{if $item.length && $item.length > 0}}
                        <span class="audio-length">
                            {{if $item.length >= 60}}
                                {{floor($item.length/60)}}'{{$item.length%60}}"
                            {{else}}
                            {{$item.length}}"
                            {{/if}}
                        </span>
                    {{/if}}
                </div>
            {{/if}}
        {{/foreach}}
    </div>
</div>

{{/strip}}