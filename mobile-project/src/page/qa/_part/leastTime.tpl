{{*

@file 类似微信的时间显示方式

      1. 当天：显示 x 小时前 或 x 分钟前 或 刚刚
      2. 非当天：显示 xxxx-xx-xx xx:xx

      参数：

      date: 日期

@author zhujialu

*}}
{{strip}}

    {{$today_time = $smarty.now}}
    {{$today_date = $today_time|date_format: '%Y-%m-%d'}}

    {{$biz_time = strtotime($date)}}
    {{$biz_date = $date|date_format: '%Y-%m-%d'}}

    {{if $biz_date == $today_date}}

        {{$offset = $today_time - $biz_time}}


        {{$hours = floor($offset / (60 * 60))}}

        {{if $hours >= 1}}
            {{$hours}}小时前
        {{else}}

            {{$minutes = floor($offset / 60)}}

            {{if $minutes >= 1}}
                {{$minutes}}分钟前
            {{else}}
                刚刚
            {{/if}}

        {{/if}}

    {{else}}
        {{$date|date_format: '%m-%d %H:%M'}}
    {{/if}}

{{/strip}}