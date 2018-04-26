{{strip}}
    {{$parts = explode('.', $smarty.server.HTTP_HOST)}}

    {{$partIndex = 0}}
    {{foreach $parts as $item}}
        {{if $item == 'genshuixue'}}
            {{$partIndex = $item@index - 1}}
        {{/if}}
    {{/foreach}}
    {{$host_prefix = $parts[$partIndex]}}
    {{if strpos($smarty.server.HTTP_HOST,"genshuixue") !== false}}
        <script>
            document.domain = "{{$host_prefix}}.genshuixue.com";
        </script>
    {{/if}}
{{/strip}}