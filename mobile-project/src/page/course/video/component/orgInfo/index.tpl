{{if !empty($org_info)}}
    <div class="org-list{{if $org_info|count == 1}} one{{/if}} analysis-habo-log-scroll" data-habo-type="{{$gsType}}" data-habo-stype="storg">
        <ul class="org-ul">
            <li class="detail-item org-item{{if $org_info|count == 1}} one-org{{/if}} analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="org">
                <div class="detail-title">机构介绍</div>
                <div class="detail-content">
                    <div class="org-info clearfix">

                        <div class="avatar{{if $org_info|count == 1}} w220{{/if}}">

                            <a href="{{$org_info.homepage_url}}">
                                <div class="img">
                                    <img width="100%" height="100%"  src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png"
                                         data-src="{{$org_info.logo}}" alt=""/>
                                </div>
                            </a>

                        </div>
                        <div class="right-col">
                            <div class="org-name">
                                <a href="{{$org_info.homepage_url}}">
                                    <div class="name">
                                        <span class="name-wrap">{{$org_info.name}}</span>
                                        {{if !empty($org_info.membership_level) && $org_info.membership_level != 1}}
                <span class="org-vip">
                    {{if $org_info.membership_level == 2}}
                    <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png" alt=""/>
                    {{elseif $org_info.membership_level == 3}}
                    <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png" alt=""/>
                    {{elseif $org_info.membership_level == 4}}
                    <img class="senior" width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png" alt=""/>
                    {{/if}}
                </span>
                {{/if}}
                                    </div>
                                </a>

                            </div>
                            <div class="intro">{{$org_info.brief}}</div>
                        </div>
                    </div>
                    <div class="summary">
                        <ul>
                            <li>
                                <p class="num">{{$org_info.student_count}}</p>
                                <p>学生数</p>
                            </li>
                            <li>
                                <p class="num">{{$org_info.course_count}}</p>
                                <p>课程数</p>
                            </li>
                            <li>
                                <p class="num">{{$org_info.great_rate|string_format:'%.2f' * 100}}%</p>
                                <p>好评率</p>
                            </li>
                        </ul>
                    </div>
                    <div class="more">
                        <a href="{{$org_info.course_list_url}}">
                            <span class="btn analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="course">TA的课程</span>
                        </a>
                        <a href="{{$org_info.homepage_url}}">
                            <span class="btn analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="detailclick">TA的详情</span>
                        </a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
{{/if}}