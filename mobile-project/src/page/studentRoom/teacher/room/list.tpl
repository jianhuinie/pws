{{foreach list.items as $item}}
    <div class="box" data-href="/hall-teacher/get?number={{$item.number}}" data-click="11355">
        {{if $item.vip_exclusive_time > 0}}
            <div class="vip-icon">
                <img width="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2017/01/58816cf13d409.png">
            </div>
        {{/if}}
        <div class="user-info">
            {{if $item.user}}
                <div class="user-image">
                    <img src="{{$item.user.avatar_url_mobile}}@15w_15h_2x_70Q_0i_1e_1c_1wh_1pr.jpg">
                </div>
                <div class="user-container">
                    <span class="user-name line-clamp">
                        {{$item.user.display_name2}}
                    </span>
                    <span class="user-address line-clamp">
                        {{$item.address}}
                    </span>
                </div>
            {{/if}}
            {{if $item.status == 3}}
            <span class="course-title">
                已关闭
            </span>
            {{else if $item.verify_status == 0}}
            <span class="course-title danger">
                审核中
            </span>
            {{else if $item.verify_status == 2}}
            <span class="course-title danger">
                审核不通过
            </span>
            {{else if $item.status == 1}}
            <span class="course-title">
                进行中
            </span>
            {{else if $item.status == 2}}
            <span class="course-title">
                已报满
            </span>
            {{/if}}
            <!-- {{if $item.display_status.name}}
                {{if $item.display_status.name != '我要报名'}}
                <span class="course-title" style="color: {{$item.display_status.color}}">
                    {{$item.display_status.name}}
                </span>
                {{else}} -->
                <!-- 隐藏掉倒计时 -->
                <!-- <span class="course-title vip-exclusive" data-timer="{{$item.vip_exclusive_time}}" data-status="0"></span> -->
                <!-- {{/if}}
            {{/if}} -->
        </div>

        <div class="first-nav">
            <span class="course-icon">
                <div class="subject-name">
                    <span class="line-clamp">{{$item.subject_name}}</span>
                </div>
            </span>

        </div>

        <div class="text">
            {{$item.info}}
        </div>

        <div class="second-nav">
            <span class="pay-text">{{$item.exp_price}}</span>
            <span class="pay-text">
                {{if $item.support_online == 0}}
                    线下
                {{else if $item.support_online == 2}}
                    线上
                {{else}}
                    线上线下
                {{/if}}
            </span>
            {{if $item.sex && ($item.sex == 0 || $item.sex == 1)}}
                <span class="pay-text">
                    {{if $item.sex == 0}}女老师{{else if $item.sex == 1}}男老师{{/if}}
                </span>
            {{/if}}
            {{if $item.user_role == 0}}
                <span class="pay-text own">老师代发</span>
            {{/if}}
        </div>

        <div class="third-nav">
            <span class="time">{{$item.create_time}}</span>
            <span class="read">{{$item.page_view}}次浏览</span>
            {{if $item.status!=3 && is_own}}
            <span class="user-cancel close-icon">
                不想找了
            </span>
            {{/if}}
        </div>

        <div class="last-nav">
            <div class="pay-teacher">
                报名老师({{if $item.joined_teachers.length > 5}}5{{else}}{{$item.joined_teachers.length}}{{/if}}/5)
            </div>
            <div class="teacher-container">
                {{each $item.joined_teachers as $teacherItem}}
                    <span><img src="{{$teacherItem.avatar_url}}@90w_90h_2x_70Q_0i_1e_1c_1wh_1pr.jpg"></span>
                {{/each}}
            </div>
        </div>

    </div>
{{/foreach}}