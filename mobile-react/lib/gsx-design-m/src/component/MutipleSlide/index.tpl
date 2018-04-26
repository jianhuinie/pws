<div class="choose-mutiple-section-slider unactive">
    <div class="choose-section-slider-bar">
        <div class="choose-section-slider-bar-text">
            请选择区域
        </div>
        <span class="choose-section-slider-bar-close">
            <i class="icon icon-times"></i>
        </span>
    </div>
    <div class="choose-section-filter">
        <div class="choose-section-filter-content">
            <div class="choose-section-filter-content-child">
                <div class="choose-section-filter-content-child-left">
                    <ul class="choose-section-filter-content-child-content">
                        {{foreach mutipleArray.left as $item}}
                            <li class="choose-section-filter-content-child-item {{if mutipleArray.leftId == $item.id}}choosed{{else}}unchoosed{{/if}}" 
                                data-array-type="left"
                                data-id="{{$item.id}}"
                                data-name="{{$item.name}}">
                                {{$item.name}}
                            </li>
                        {{/foreach}}
                    </ul>
                </div>

                <div class="choose-section-filter-content-child-middle">
                    <ul class="choose-section-filter-content-child-content">
                        {{foreach mutipleArray.middle as $item}}
                            <li class="choose-section-filter-content-child-item {{if mutipleArray.middleId == $item.id}}choosed{{else}}unchoosed{{/if}}" 
                                data-array-type="middle" 
                                data-id="{{$item.id}}"
                                data-name="{{$item.name}}">
                                {{$item.name}}
                            </li>
                        {{/foreach}}
                    </ul>
                </div>

                <div class="choose-section-filter-content-child-right">
                    <ul class="choose-section-filter-content-child-content">
                        {{foreach mutipleArray.right as $item}}
                            <li class="choose-section-filter-content-child-item {{if mutipleArray.rightId == $item.id}}choosed{{else}}unchoosed{{/if}}" 
                                data-array-type="right"
                                data-id="{{$item.id}}"
                                data-name="{{$item.name}}">
                                {{$item.name}}
                            </li>
                        {{/foreach}}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="choose-section-slider-mask">
</div>