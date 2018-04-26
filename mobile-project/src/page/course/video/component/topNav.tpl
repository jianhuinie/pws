<!-- 页面内容 -->
{{if isset($tpl_data.is_u_meng) && $tpl_data.is_u_meng == true}}
{{else}}
    {{include file="common/topAction/courseTop.tpl" type="classDetailApp"}}
{{/if}}