<div class="sign-teacher">
    {{$recommendTeacherL = 0}}
    {{if $tpl_data.sign_teacher.recommend_teacher}}
        {{$recommendTeacherL = 1}}
    {{/if}}

    {{$noRecommendTeacherL = 0}}
    {{if $tpl_data.sign_teacher.no_recommend_teacher}}
        {{$noRecommendTeacherL = $tpl_data.sign_teacher.no_recommend_teacher|count}}
    {{/if}}
    
    {{if $recommendTeacherL + $noRecommendTeacherL > 0}}
        <div class="title">已有{{$recommendTeacherL + $noRecommendTeacherL}}位老师报名</div>
    {{/if}}
    {{if $tpl_data.sign_teacher.recommend_teacher}}
        {{$item = $tpl_data.sign_teacher.recommend_teacher}}
        {{$type = 'cammend'}}
        {{include file="page/studentRoom/orderDetail/_part/teacherItem.tpl" type={{$type}}}}
    {{/if}}

    {{if $tpl_data.sign_teacher.no_recommend_teacher}}
    {{$type = 'noCammend'}}
        {{foreach $tpl_data.sign_teacher.no_recommend_teacher as $item}}
            {{include file="page/studentRoom/orderDetail/_part/teacherItem.tpl" type={{$type}}}}
        {{/foreach}}
    {{/if}}
</div>