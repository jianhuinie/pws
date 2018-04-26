{{*
    @file 下载
    @author hurry
    @date 2017/02/09
*}}
{{if !$ext_data.is_app}}
    <div
        class="download btn-download analysis-habo-log {{$templateModel}}"
        data-habo-type="{{$gsType}}"
        data-habo-stype="download"
    >
        <span class="icon icon-download3"></span>
        <div>下载</div>
    </div>
{{/if}}