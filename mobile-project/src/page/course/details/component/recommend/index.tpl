{{*相关课程*}}
{{if !empty($relative.courses)}}
    <div class="related-course">
        <div class="title">相关课程</div>
        <div class="course-list">
            <ul>
                {{foreach from=$relative.courses key=k item=v}}
                    {{if $k < 3}}
                        <li>
                            <a href="{{$v.detail_url}}">
                                <div class="left-col img-background">
                                    <img width="100%" height="100%" data-src="{{$v.photo_url}}" alt=""/>
                                    {{if isset($v.type) && $v.type == 3}}
                                        <img class="icon-play" width="100%" height="100%"
                                             src="https://img.genshuixue.com/0cms/d/file/content/2015/12/5673b592e735e.png"
                                             alt=""/>
                                    {{/if}}
                                </div>
                                <div class="right-col">
                                    <div class="top-line">
                                        <span class="type">{{if $courseInfo.course_type == 11}}1对1{{else}}班课{{/if}}</span>

                                        <span class="rc-title">{{$v.name|truncate:25:"...":true}}</span>
                                    </div>
                                    <div class="bottom-line">
                                        <p class="rc-price">￥{{$v.price}}</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    {{/if}}
                {{/foreach}}
            </ul>

            {{if !$ext_data.is_app}}
                <div class="app-download">下载跟谁学APP查看更多优质课程</div>
            {{/if}}

        </div>

    </div>
{{/if}}
