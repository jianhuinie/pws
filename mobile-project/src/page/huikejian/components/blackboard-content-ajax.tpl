{{$article_list = $tpl_data.list}}

{{foreacher $article_list as $article}}
    <li>
    {{include file="./blackboard-content.html"}}
    </li>
{{/foreach}}