{{$dynamic_list = $tpl_data.news_list.list}}
{{foreach name=dynamic_list item=dynamic from=$dynamic_list}}
<li>
    {{include file="./org-dynamic.tpl"}}
</li>
{{/foreach}}
