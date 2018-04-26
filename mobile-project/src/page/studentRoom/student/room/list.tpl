{{foreach list.items as $item}}
    <div class="box box-url" data-href="/hall-student/get?number={{$item.number}}">
        {{if $item.user_role != 2}}
        <div class="vip-icon">
            <img width="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2017/01/58816cf13d409.png">
        </div>
        {{/if}}
        <div class="user-info">
            <div class="img-container">
                <img src="{{$item.user.avatar_url_mobile}}@90w_90h_2x_70Q_0i_1e_1c_1wh_1pr.jpg" class="avatar">
            </div>
            <div class="user-container">
                <span class="user-name line-clamp">
                    {{$item.user.display_name2}}
                </span>
                <span class="user-address line-clamp">
                    {{$item.address}}
                </span>
            </div>
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
        </div>
        <div class="first-nav">
            <div class="course-icon">
                <span class="line-clamp">{{$item.subject_name}}</span>
            </div>
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
            {{if $item.sex == 0 || $item.sex == 1}}
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
        </div>

        {{if $item.status < 3 && !($item.verify_status == 0 || $item.verify_status == 2) }}
        <div class="last-nav{{if $item.verify_status == 1}} last-nav-avatar{{/if}}">

            <div class="verify-passed">
                <div class="pay-teacher">
                    报名老师({{$item.joined_teachers.length}}/5)
                </div>
                <div class="teacher-container">
                    {{foreach $item.joined_teachers as $teacherItem}}
                        <span><img src="{{$teacherItem.avatar_url}}@90w_90h_2x_70Q_0i_1e_1c_1wh_1pr.jpg"></span>
                    {{/foreach}}
                </div>
            </div>
        </div>
        {{/if}}

    </div>
{{/foreach}}
