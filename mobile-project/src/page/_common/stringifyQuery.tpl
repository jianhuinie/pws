{{*

@file 序列化请求参数

      参数：

      query: 一个参数数组

@author zhujialu

*}}
{{strip}}
{{$search = []}}

{{foreach $query as $key => $value}}

    {{if $value != ''}}
        {{$search[] = $key|cat: '='|cat: $value}}
    {{/if}}

{{/foreach}}

{{$search = implode('&', $search) scope=parent}}
{{/strip}}