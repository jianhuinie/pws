<div class="selected hide">
    <div class="selected-bar">
        <div class="title sort active" data-type="sort">
            <span class="text">发布时间排序</span>
            <i class="icon icon-caret-down"></i>
        </div>

        <div class="choose-cross-line">
            <div class="choose-line"></div>
        </div>

        <div class="title choose normal" data-type="choose">
            <span class="text">筛选</span>
            <i class="icon icon-caret-down"></i>
        </div>
    </div>

    {{*排序*}}
    {{include file="page/studentRoom/orderList/_part/sort.tpl"}}

    {{*筛选*}}
    {{include file="page/studentRoom/orderList/_part/choose.tpl"}}
</div>