{{*
    @file 二次导航
    @author hurry
    @date  2017/1/17
*}}
{{$nav_tabs = []}}
{{$item = []}}
{{$item['name'] = '课程详情'}}
{{$item['id'] = 'class-introduce'}}
{{$item['class'] = 'analysis-habo-log'}}
{{$item['type'] = $gsType}}
{{$item['stype'] = 'detail'}}
{{$nav_tabs[] = $item}}

{{$item = []}}
{{if $course_info.has_free_item && $course_info.price > 0}}
    {{$item['name'] = '<span class="catalogue">课程目录<span class="audition-icon">试</span></span>'}}
{{else}}
    {{$item['name'] = '课程目录'}}
{{/if}}
{{$item['id'] = 'class-catalogue'}}
{{$item['class'] = 'analysis-habo-log'}}
{{$item['type'] = $gsType}}
{{$item['stype'] = 'contents'}}
{{$nav_tabs[] = $item}}

{{$item = []}}
{{$item['name'] = '课程评价'}}
{{$item['id'] = 'class-comment'}}
{{$item['class'] = 'analysis-habo-log'}}
{{$item['type'] = $gsType}}
{{$item['stype'] = 'commentab'}}
{{$nav_tabs[] = $item}}
<div id="tabs-button-container">
    {{include file="common/smarty/navTab/index.tpl" nav_tabs=$nav_tabs}}
</div>