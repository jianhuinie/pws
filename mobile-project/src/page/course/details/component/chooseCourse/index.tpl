{{if $isCourseSet}}
    <div id="j_choose_course" class="choose-course">
        <div class="title">
            选择课型
        </div>
        {{foreach from=$courses key=k item=v}}
            <a href="{{$v.detail_m_url}}">
                <div class="course" data-price="{{$v.price}}" {{if $k >= 3}}style="display: none;"{{/if}}>
                    <div class="name">
                        {{$v.name}}
                    </div>
                    {{if isset($v.code) && !empty($v.code)}}
                        <div class="info">
                            <div class="info-title">课程编码</div>：{{$v.code}}
                        </div>
                    {{/if}}
                    {{if isset($v.class_time_desc) && !empty($v.class_time_desc)}}
                        <div class="info">
                            <div class="info-title">上课时间</div>：{{$v.class_time_desc}}
                        </div>
                    {{/if}}
                    {{if isset($v.address) && !empty($v.address)}}
                        <div class="info">
                            <div class="info-title">上课地点</div>：{{$v.address}}
                        </div>
                    {{/if}}
                    {{if isset($v.class_hour) && !empty($v.class_hour)}}
                        <div class="info">
                            <div class="info-title">课时数</div>：{{$v.class_hour}}{{if $courseInfo.course_type != 11}}课时{{/if}}
                        </div>
                    {{/if}}
                    {{if isset($v.price) && !empty($v.price)}}
                        <div class="info">
                            <div class="info-title">价格</div>：￥{{$v.price}}
                        </div>
                    {{/if}}
                    <img class="arrow" src="/src/page/course/details/component/img/arrow.png" alt="" />
                </div>
            </a>
        {{/foreach}}

        {{if $courses|count > 3}}
            <div id="j_more" class="more">
                查看全部{{$courses|count}}个课型
            </div>
        {{/if}}
    </div>
{{else}}
    <div id="j_choose_course" class="choose-course">
        <div class="title">
            已选课型
        </div>

        {{if $courseInfo.course_type == 11}}
            {{foreach from=$courses key=k item=v}}
                {{if $k == 0}}
                    <div class="course chose" data-price="{{$courseInfo.price}}">
                        <div class="name">
                            {{$v.name}}
                        </div>
                        {{if isset($v.code) && !empty($v.code)}}
                            <div class="info">
                                课程编码：{{$v.code}}
                            </div>
                        {{/if}}
                        {{if isset($v.class_time_desc) && !empty($v.class_time_desc)}}
                            <div class="info">
                                上课时间：{{$v.class_time_desc}}
                            </div>
                        {{/if}}
                        {{if isset($v.address) && !empty($v.address)}}
                            <div class="info">
                                上课地点：{{$v.address}}
                            </div>
                        {{/if}}
                        {{if isset($v.class_hour) && !empty($v.class_hour)}}
                            <div class="info">
                                　课时数：{{$v.class_hour}}
                            </div>
                        {{/if}}
                        {{if isset($v.price) && !empty($v.price)}}
                            <div class="info">
                                　　价格：￥{{$v.price}}
                            </div>
                        {{/if}}
                        <img class="arrow" src="/src/page/course/details/component/img/arrow.png" alt="" />
                    </div>
                {{/if}}
            {{/foreach}}
        {{else}}
            <div class="course chose" data-price="{{$courseInfo.price}}">
                <div class="name">
                    {{$courseInfo.name}}
                </div>
                {{if isset($courseInfo.code) && !empty($courseInfo.code)}}
                    <div class="info">
                        课程编码：{{$courseInfo.code}}
                    </div>
                {{/if}}
                {{if isset($courseInfo.class_time_desc) && !empty($courseInfo.class_time_desc)}}
                    <div class="info">
                        上课时间：{{$courseInfo.class_time_desc}}
                    </div>
                {{/if}}
                {{if isset($courseInfo.address) && !empty($courseInfo.address)}}
                    <div class="info">
                        上课地点：{{$courseInfo.address}}
                    </div>
                {{/if}}
                {{if isset($courseInfo.class_hour) && !empty($courseInfo.class_hour)}}
                    <div class="info">
                        　课时数：{{$courseInfo.class_hour}}课时
                    </div>
                {{/if}}
                {{if isset($courseInfo.price) && !empty($courseInfo.price)}}
                    <div class="info">
                        　　价格：￥{{$courseInfo.price}}
                    </div>
                {{/if}}
                <img class="arrow" src="/src/page/course/details/component/img/arrow.png" alt="" />
            </div>
        {{/if}}

        {{if $courses|count > 1}}
            <div id="j_layer" class="more">
                查看全部{{$courses|count}}个课型
            </div>
        {{/if}}
    </div>

    <div id="j_choose_course_layer" class="choose-course-layer">
        <div id="j_close" class="close">
            <i class="icon icon-close cancel"></i>
        </div>
        <div class="layer-title">
            全部课型
        </div>
        <div class="layer-body">
            <div class="ctn">
                {{foreach from=$courses key=k item=v}}
                    <a data-href="{{$v.detail_m_url}}">
                        <div class="course" data-price="{{$v.price}}">
                            <div class="name">
                                {{$v.name}}
                            </div>
                            {{if isset($v.code) && !empty($v.code)}}
                                <div class="info">
                                    课程编码：{{$v.code}}
                                </div>
                            {{/if}}
                            {{if isset($v.class_time_desc) && !empty($v.class_time_desc)}}
                                <div class="info">
                                    上课时间：{{$v.class_time_desc}}
                                </div>
                            {{/if}}
                            {{if isset($v.address) && !empty($v.address)}}
                                <div class="info">
                                    上课地点：{{$v.address}}
                                </div>
                            {{/if}}
                            {{if isset($v.class_hour) && !empty($v.class_hour)}}
                                <div class="info">
                                    　课时数：{{$v.class_hour}}{{if $courseInfo.course_type != 11}}课时{{/if}}
                                </div>
                            {{/if}}
                            {{if isset($v.price) && !empty($v.price)}}
                                <div class="info">
                                    　　价格：￥{{$v.price}}
                                </div>
                            {{/if}}
                            <img class="arrow" src="/src/page/course/details/component/img/arrow.png" alt="" />
                        </div>
                    </a>
                {{/foreach}}
            </div>
        </div>
        <div id="j_ccl_ok" class="ok disable">确定</div>
    </div>
{{/if}}
