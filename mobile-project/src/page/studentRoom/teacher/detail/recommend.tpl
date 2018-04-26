{{if list.length > 0}}
<div class="demand-more">
    <div class="title">
        更多生源
    </div>
    {{foreach list as item}}
    <div class="demand-introduction" data-url="/hall-teacher/get?number={{item.number}}">
        <!-- <div class="header">
            <div class="header-rows">

                <div class="header-row">
                    <div class="course-icon">
                        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57c63fe03d21b.png">
                        {{item.subject_name}}
                    </div>

                    {{if item.display_status.name}}
                    {{if item.display_status.name != '我要报名'}}
                    <div class="course-title" style="color: {{item.display_status.color}}">
                        {{item.display_status.name}}
                    </div>
                    {{else}}
                    <div class="course-title vip-exclusive"
                    data-timer="{{item.vip_exclusive_time}}" data-status="0"
                    >
                    </div>
                    {{/if}}
                    {{/if}}

                </div>

                <div class="header-row">

                    <div class="address">
                        {{if item.address}}
                        <div class="address-image"></div>
                        {{item.address}}
                        {{/if}}
                    </div>

                    <div class="payment">
                        课时费{{item.exp_price}}
                        {{if item.support_online == 0}}
                            线下
                        {{else}}
                            线上线下
                        {{/if}}
                    </div>
                </div>

            </div>

        </div> -->

        <div class="user-info">
            <div class="user-avator">
                <img src="{{item.user.avatar_url_mobile}}@20w_20h_2x_70Q_0i_1e_1c_1wh_1pr.jpg">
            </div>

            <div class="user-info-detail">
                <div class="first-nav">
                    <div class="course-icon clearfix">
                        <div class="user-name">
                            {{item.user.display_name2}}
                        </div>
                        {{if item.display_status.name == '我要报名'}}
                            <div class="course-title  vip-exclusive" data-timer="{{item.vip_exclusive_time}}" data-status="0">
                            </div>
                        {{/if}}
                        <span class="course-title {{if item.status!=3}}hide{{/if}}">
                            已关闭
                        </span>
                    </div>
                </div>
                <div class="second-nav clearfix">
                    <span class="address">
                        {{item.address}}
                    </span>
                </div>
            </div>
        </div>

        <div class="subject-nav">
            <span class="course-icon">
                <div class="subject-name">
                    <span>{{item.subject_name}}</span>
                </div>
            </span>
        </div>

        <div class="main">
            {{item.info}}
        </div>

        <div class="second-nav">
            <span class="pay-text">{{item.exp_price}}</span>
            <span class="pay-text">{{if item.support_online == 0}}线下{{else if item.support_online == 2}}线上{{else}}线上线下{{/if}}</span>
            {{if item.sex == 0 || item.sex == 1}}
                <span class="pay-text">{{if item.sex == 0}}女老师{{else if item.sex == 1}}男老师{{/if}}</span>
            {{/if}}
            {{if item.user_role == 0}}
                <span class="pay-text own">老师代发</span>
            {{/if}}
        </div>

        <div class="footer muted">
            <span class="publish-time" data-index="1" data-time="{{item.create_time}}">
            </span>

            <span>
                {{item.page_view}}浏览
            </span>
        </div>

        <div class="footer teacher">
            <div class="teacher-list">
                <div class="entered-teacher-count">
                    报名老师({{item.joined_teachers_count}}/5)
                </div>
                <div class="teacher-container">
                    {{foreach item.joined_teachers as teacherItem}}
                        <span><img src="{{teacherItem.avatar_url}}@90w_90h_2x_70Q_0i_1e_1c_1wh_1pr.jpg"></span>
                    {{/foreach}}
                </div>
            </div>
        </div>

    </div>
    {{/foreach}}
</div>
{{/if}}