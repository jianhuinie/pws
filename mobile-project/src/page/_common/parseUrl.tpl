{{*

@file 解析 url，便于后续拼参数

@author zhujialu

*}}
{{strip}}

{{$url = $smarty.server.REQUEST_URI}}

{{$parts = explode('?', $url)}}

{{$host_url = $parts[0] scope=parent}}
{{$search = []}}

{{if isset($parts[1])}}

    {{$parts = explode('&', $parts[1])}}

    {{foreach $parts as $item}}

        {{$key_value = explode('=', $item)}}

        {{if count($key_value) == 2}}
            {{$search[$key_value[0]] = $key_value[1]}}
        {{/if}}

    {{/foreach}}

{{/if}}

{{$query = $search scope=parent}}

{{/strip}}
