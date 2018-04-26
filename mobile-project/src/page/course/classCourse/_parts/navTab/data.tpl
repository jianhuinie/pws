{{*
    @file 班课详情页二次导航数据
    @author hurry
    @date 2016/12/16
*}}
{{strip}}
    {{$nav_tabs = []}}

    {{$item = []}}
    {{$item['id'] = 1}}
    {{$item['name'] = '课程详情'}}
    {{$nav_tabs[] = $item}}

    {{$item = []}}
    {{$item['id'] = 2}}
    {{$item['name'] = '课程安排'}}
    {{$nav_tabs[] = $item}}

    {{$item = []}}
    {{$item['id'] = 3}}
    {{$item['name'] = '相关课程'}}
    {{$nav_tabs[] = $item}}

    {{*
    {{$item = []}}
    {{$item['id'] = 4}}
    {{$item['name'] = '课程评价'}}
    {{$nav_tabs[] = $item}}
    *}}
{{/strip}}