{{*头部*}}
<div class="head">
    <img width="100%" height="100%" data-src="{{$coverInfo.photo}}" alt=""/>

    <div class="baseInfo-name">{{$coverInfo.name}}</div>
    <div class="price">
        <span class="num">￥{{$coverInfo.price}}起</span>
        {{if isset($tpl_data.is_staging) && $tpl_data.is_staging == 1}}
            <span class="can-staging">分期</span>
        {{/if}}
    </div>
    <div class="label">{{$coverInfo.courseType}}</div>
</div>
