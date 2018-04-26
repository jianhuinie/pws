<div class="one-2-one-bottom">
    {{$templateModel = "default"}}
    {{$telphones = $tpl_data.query_one_on_one_course.support_hotline}}
    {{$callType = "YouXuan_Consult"}}
    {{$favorType = "YouXuan_Collect"}}
   {{include file="common/courseBottom/consult/index.tpl" templateModel={{$templateModel}} telphones={{$telphones}} stype={{$callType}}}}

   {{include file="common/courseBottom/favor/index.tpl" templateModel={{$templateModel}} gsType={{$favorType}}}}

   {{include file="common/courseBottom/share/index.tpl"}}
   
   {{include file="page/one2oneTeacherDetail/one2oneBottom/_part/reblog.tpl"}}
</div>